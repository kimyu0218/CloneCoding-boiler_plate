// 서로 다른 두 개의 포트를 가지고 있는 서버는 request를 주고 받을 수 없다. (Corps 정책)
// client 포트: 3000 | server 포트: 5000

// proxy가 아이피 임의로 변경 -> 방화벽 & 웹 필터 & 캐쉬/공유 데이터 제공 가능
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://localhost:5000',
      changeOrigin: true,
    })
  );
};