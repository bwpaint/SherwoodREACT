// PM2 ecosystem file — manages the Next.js + Payload process in production.
// Start:  pm2 start ecosystem.config.cjs
// Reload: pm2 reload sherwoods
// Logs:   pm2 logs sherwoods --lines 100

module.exports = {
  apps: [
    {
      name: 'sherwoods',
      cwd: __dirname,
      script: 'node_modules/next/dist/bin/next',
      args: 'start -p 3001',
      instances: 1,
      exec_mode: 'fork',
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'production',
        NODE_OPTIONS: '--no-deprecation',
      },
      // PM2 default log location: ~/.pm2/logs/
      // Custom /var/log paths require root permissions xCloud doesn't grant the site user.
      time: true,
    },
  ],
}
