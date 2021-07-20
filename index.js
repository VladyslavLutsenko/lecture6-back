const http = require('http');
const { subscribeUserRouter } = require('./router/user');
const { subscribeStatusRoutes  } = require('./router/status');

const server = http.createServer((req, res) => {
  console.log(req.url, 'happened ===> ', req.method);
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST,GET,DELETE,OPTIONS,PUT");

  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

  setTimeout(() => {
    if (!res.taken) {
      res.statusCode = 404;
      res.end();
    }
  }, 500);
});

function buildRoutes(s) {
  subscribeUserRouter(s);
  subscribeStatusRoutes(s);
}

buildRoutes(server);
server.listen(3001);
