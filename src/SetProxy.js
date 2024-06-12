const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
    app.use(
        createProxyMiddleware("/actuator/metrics/http.server.requests?tag=uri:/", {
            target: "http://localhost:8080",
            changeOrigin: true,
        })
    );
};