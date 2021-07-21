

class Router {
  constructor(server, basePath) {
    if (!basePath.startsWith('/')) {
      basePath = '/' + basePath;
    }
    this.basePath = basePath;
    this.server = server;
  }


  static HTTP_METHODS = {
    GET: 'GET',
    POST: 'POST',
    PATCH: 'PATCH',
    PUT: 'PUT',
    DELETE: 'DELETE',
    OPTIONS: 'OPTIONS'
  };

  /**
   *
   * @param {string} url
   * @return {boolean}
   */
  #baseCheck(url) {
    return url.startsWith(this.basePath)
  }

  #checkSubRoute(subRoute, url) {
    return url.startsWith(subRoute, this.basePath.length + 1);
  }

  get(subRoute, getHandler) {
    if (subRoute.startsWith('/')) {
      subRoute = subRoute.slice(1);
    }
    this.server.on('request', (req, res) => {
      if(!this.#baseCheck(req.url)) {
        return;
      }
      if (this.#checkSubRoute(subRoute, req.url) && req.method === Router.HTTP_METHODS.GET) {
        res.taken = true;

        getHandler(req, res);
      }
    })
  }

  post(subRoute, postHandler) {
    if (subRoute.startsWith('/')) {
      subRoute = subRoute.slice(1);
    }
    this.server.on('request', (req, res) => {
      if(!this.#baseCheck(req.url)) {
        return;
      }
      if (this.#checkSubRoute(subRoute, req.url) && req.method === Router.HTTP_METHODS.POST) {
        res.taken = true;

        let body = "";
        req.on('data', (chunk) => {
          body += chunk;
        });

        req.on('end', () => {
          req.body = body;

          postHandler(req, res);
        });

      }
    })
  }

  options(subRoute, optionsHandler) {
    if (subRoute.startsWith('/')) {
      subRoute = subRoute.slice(1);
    }
    this.server.on('request', (req, res) => {
      if(!this.#baseCheck(req.url)) {
        return;
      }
      if (this.#checkSubRoute(subRoute, req.url) && req.method === Router.HTTP_METHODS.OPTIONS) {
        res.taken = true;

        optionsHandler(req, res);

      }
    })
  }

  delete(subRoute, deleteHandler) {
    if (subRoute.startsWith('/')) {
      subRoute = subRoute.slice(1);
    }
    this.server.on('request', (req, res) => {
      if(!this.#baseCheck(req.url)) {
        return;
      }
      if (this.#checkSubRoute(subRoute, req.url) && req.method === Router.HTTP_METHODS.DELETE) {
        res.taken = true;

        deleteHandler(req, res);
      }
    })
  }
}

module.exports = Router;
