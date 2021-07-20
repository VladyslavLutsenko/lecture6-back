const Router = require('../util/router');

const userList = [
  { id: 0, name: 'Dima', age: 25 },
  { id: 1, name: 'Vasya', age: 17 },
  { id: 2, name: 'Petya', age: 213 },
  { id: 3, name: 'Sasha', age: 32 },
  { id: 4, name: 'Kolya', age: 54 },
  { id: 5, name: 'Igor', age: 56 },
  { id: 6, name: 'Ura', age: 23 },
  { id: 7, name: 'Vasya', age: 45 }
];

function subscribeUserRouter(server) {
  const router = new Router(server, '/user');


  router.get('', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.statusCode = 200;
    res.end(JSON.stringify(userList));
  });
  router.post()
  /// router.del TODO: asd

}
module.exports = {
  subscribeUserRouter
}
