const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    createProxyMiddleware("/api/v1", {
      target: "https://dev.curb.site",
      changeOrigin: true,
    })
  );

  app.use(
    createProxyMiddleware("/sms/v2/services", {
      target: "https://sens.apigw.ntruss.com/",

      changeOrigin: true,
    })
  );
};