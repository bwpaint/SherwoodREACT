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
      out_file: '/var/log/sherwoods/out.log',
      error_file: '/var/log/sherwoods/error.log',
      time: true,
    },
  ],
}
