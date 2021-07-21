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
  
  router.post('', (req, res) => {
    res.statusCode = 200;
    const newUser = {
      id: userList.length,
      ...JSON.parse(req.body)
    };
    userList.push(newUser);
    res.end();
  });

  router.options('', (req, res) => {
    const id=req.url.match(/\/\d+$/)[0].slice(1);
    res.setHeader("Allow", "GET,POST,DELETE,OPTIONS");
    res.statusCode = 200;
    res.end();
  });

  router.delete('', (req, res) => {
    res.statusCode = 200;
    const id=req.url.match(/\/\d+$/)[0].slice(1);
    userList.forEach((user, index) => {
      if (user.id==id) {
        userList.splice(index, 1);
      }
    });
    res.end();
  });

}
module.exports = {
  subscribeUserRouter
}
