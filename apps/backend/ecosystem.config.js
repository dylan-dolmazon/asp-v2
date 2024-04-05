module.exports = {
  apps: [
    {
      name: 'asp-api',
      script: './build/server.js',
      instances: 'max',
      exec_mode: 'cluster',
      autorestart: true,
    },
  ],
}
