const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(createProxyMiddleware('/proxypath', { target: 'http://localhost:3004/' }));
};