const express = require('express')
const { v4: uuidv4 } = require("uuid");
const Jimp = require("jimp");
const fs = require('fs');

const app = express()

app.use("/bootstrap", express.static("node_modules/bootstrap/dist"));
app.use("/popper", express.static("node_modules/@popperjs/core/dist/umd"));
app.use(express.static('public'))

app.listen(3006, () => {
  console.log("App en puerto 3006")
})

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html")
})

app.get("/foto", async (req, res) => {
  const { url_imagen } = req.query
  const id = uuidv4().slice(0, 6)

  const photosDir = __dirname + "/public/photos/";
  if (!fs.existsSync(photosDir)) {
    fs.mkdirSync(photosDir, { recursive: true });
  }

  const img = await Jimp.read(url_imagen)

  await img.grayscale()
          .resize(350, Jimp.AUTO)
          .writeAsync(photosDir + id + ".jpg")

  res.sendFile(photosDir + id + ".jpg")
})
