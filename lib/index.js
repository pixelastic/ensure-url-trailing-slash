import ensureUrlTrailingSlash from './ensureUrlTrailingSlash.js';
import source from './source.js';

ensureUrlTrailingSlash.source = `(function(){${source}})()`;

export default ensureUrlTrailingSlash;
