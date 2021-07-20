const Router = require('../util/router');

function subscribeStatusRoutes(server) {
  const router = new Router(server, '/status');
  router.get('/healthcheck', (req, res) => {
    res.statusCode = 200;
    res.end('ok');
  });
}
module.exports = {
  subscribeStatusRoutes
};
