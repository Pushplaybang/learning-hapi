/* Get Hapi and other dependancies */
const Hapi = require('hapi');

/* Utils */
const Inert = require('inert');   // easy static file hanling,
const Good = require('good');     // logging package (included with hapi)
const Blipp = require('blipp');   // prints routes on startup
const Vision = require('vision'); // Hapi templates and views

/* Import Our Routes */
const PageRoutes = require('./routes/pages');
const ApiRoutes = require('./routes/api');


/* Init a server & set the connection details */
const server = new Hapi.Server({
  connections: {
    router: {
      isCaseSensitive: false,
      stripTrailingSlash: true,
    },
  },
});
server.connection({
  host: 'localhost',
  port: 8000,
});


/* Setup options for 'Good' Logging */
const goodOptions = {
  reporters: [{
    reporter: require('good-console'),
    events: { log: '*', response: '*' },
  }],
};

/* Register server plugins and define routes */
server.register([
  Inert,
  Blipp,
  Vision,
  {
    register: Good,
    options: goodOptions,
  }], (err) => {
  // exit early on err
  if (err) { throw err; }

  /* Setup API Routes */
  server.route(ApiRoutes);

  /* Register our assets and page routes */
  server.route(PageRoutes);

  /* Start the server */
  server.start(() => {});
});

