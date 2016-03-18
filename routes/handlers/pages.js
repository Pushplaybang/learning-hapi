/* Require Dependancies */
const Path = require('path');
const Joi = require('joi');

/* Define an empty object to attach our handlers too */
const handlers = {};

/*
  NB: The inert module is in play here (registered on the server),
  I'm proably abusing it slightly to just serve plain html in the
  second two handlers.

  hapi does support a pretty great view handler that allows to
  pass data to the view and use great tempalting like handlebars
  or Jade, but that felt like overkill, and wanted to see if I
  could spit back plain html pages easily.  This is likely not
  without it flaws, and the "right way" would be to use the
  `visino` module.
*/

/* Serve Static assets from the public directory */
handlers.assets = {
  directory: {
    path: Path.join(__dirname, '../../public'),
  },
};

/* Serve simple html pages from the view directory */
handlers.pages = {
  directory: {
    path: Path.join(__dirname, '../../views/plain'),
    defaultExtension: 'html',
  },
};

/* Serve a specific simple html page for the home route  */
handlers.home = {
  file: {
    path: Path.join(__dirname, '../../views/plain/app.html'),
  },
};

/* Export Our handlers */
module.exports = handlers;
