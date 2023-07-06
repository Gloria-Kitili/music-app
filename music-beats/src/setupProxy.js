const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://railsapp-soundscape.onrender.com',
      changeOrigin: true,
    })
  );
};