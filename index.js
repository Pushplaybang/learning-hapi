'use strict';

/* Get Hapi and other dependancies */
const Hapi = require('hapi');
const Path = require('path');

/* Utils */
const Inert = require('inert'); // easy static file hanling,
const Good = require('good'); // logging package
const Blipp = require('blipp'); // prints routes on startup

/* Init a server Set the connection details */
const server = new Hapi.Server();
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
server.register([Inert, Blipp, {
  register: Good,
  options: goodOptions,
}], (err) => {
  /* Setup Routes */

  // Home
  server.route({
    method: 'GET',
    path: '/api/v1/',
    handler: (request, reply) => {
      reply('Hello Hapi');
    },
  });

  /*
    Route With Params:
     - Note that there are more advanced methods for managing params, and that hapi
     automatically selects the most specific route before the least, handles wildcard params,
     you can specify the number of segments, as well as make params optional etc.
  */

  // eg wildcard route
  server.route({
    method: 'GET',
    path: '/api/v1/{name}',
    handler: (request, reply) => {
      reply(`hello ${request.params.name}`);
    },
  });

  /* Taking control of the response object */
  server.route({
    method: 'GET',
    path: '/api/v1/controled-response',
    handler: (request, reply) => {
      reply('hello World')
        .code(418)
        .type('text/plain')
        .header('hello', 'world')
        .state('hello', 'world');
    },
  });

  /* Serve Static Assets */
  server.route({
    method: 'GET',
    path: '/public/{file*}',
    // this requires the inert plugin reigsted above
    handler: {
      directory: {
        path: Path.join(__dirname, 'public'),
      },
    },
  });

  /* Serve HTML */
  server.route({
    method: 'GET',
    path: '/',
    // this requires the inert plugin reigsted above
    handler: {
      file: {
        path: Path.join(__dirname, 'views/app.html'),
      },
    },
  });

  /* Handle POST */
  server.route({
    method: ['POST', 'PUT'],
    path: '/api/v1/eatitall',
    handler: (request, reply) => {
      console.log(request.payload);
      return reply.redirect('/');
    },
  });


  /* Start the server */
  server.start(() => console.log(server.info));
});

