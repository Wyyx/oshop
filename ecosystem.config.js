module.exports = {
  apps: [
    {
      name: 'oshop',
      script: './server/server.js',
      watch: true,
      env: {
        PORT: 8080,
        NODE_ENV: 'development'
      },
      env_production: {
        PORT: 8003,
        NODE_ENV: 'production'
      }
    }
  ],
  deploy: {
    production: {
      user: 'root',
      host: ['149.28.11.92'],
      ref: 'origin/master',
      repo: 'https://github.com/wyyx/oshop.git',
      path: '/www/oshop/production',
      'pre-deploy': 'git fetch origin master && git reset --hard origin/master',
      'post-deploy': 'yarn start && pm2 startOrRestart ecosystem.config.js --env production'
    }
  }
}
