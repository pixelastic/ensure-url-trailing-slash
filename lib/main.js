const ensureUrlTrailingSlash = require('./ensureUrlTrailingSlash.js');
const source = require('./source.js');

ensureUrlTrailingSlash.source = `(function(){${source}})()`;

module.exports = ensureUrlTrailingSlash;
