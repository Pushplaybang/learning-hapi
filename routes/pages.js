/* Import our Handlers */
const Handlers = require('./handlers/pages');

/* Define an empty routes obj*/
const routes = {};

/* Serve Static Assets */
routes.assets = {
  method: 'GET',
  path: '/public/{file*}',
  handler: Handlers.assets,
};

/* Serve Basic HTML */
routes.pages = {
  method: 'GET',
  path: '/{page*}',
  handler: Handlers.pages,
};

/* Serve Home Page */
routes.home = {
  method: 'GET',
  path: '/',
  handler: Handlers.home,
};

/* Export an array of routes that can be used in server.js */
module.exports = [
  routes.assets,
  routes.pages,
  routes.home,
];
