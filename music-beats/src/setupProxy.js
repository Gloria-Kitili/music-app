const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://railsapp-music-app.onrender.com',
      changeOrigin: true,
    })
  );
};