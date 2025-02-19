module.exports = {
    apps: [{
      name: "bancosolar",
      script: "./index.js",
      watch: false,
      instances: 1,
      exec_mode: "fork",
      max_memory_restart: '500M',
      cron_restart: "59 23 * * * *",
      env_production: {
        NODE_ENV: "production",
      },
    }]
  };
