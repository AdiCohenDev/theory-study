module.exports = {
  apps: [
    {
      name: 'web-api',
      script: './dist/apps/web-api/main.js',
      env: {
        NODE_ENV: 'development',
      },
      env_production: {
        NODE_ENV: 'production',
        WEBAPP_URL: 'https://theory-study.vercel.app',
      },
    },
  ],
};
