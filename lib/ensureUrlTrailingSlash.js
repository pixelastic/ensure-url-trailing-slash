/**
 * Check the current page URL and if trying to access a directory without
 * a trailing slash, redirect to the correct URL.
 * This is a way to avoid issues with Netlify where site.com/foo and
 * site.com/foo/ both load the same content, but the parent directory will be
 * considered different and thus loading assets with relative paths will fail
 * when the slash is missing.
 */
module.exports = function ensureTrailingSlash() {
  const { protocol, host, pathname, search, hash } = window.location;

  if (pathname.endsWith('/') || pathname.endsWith('.html')) {
    return;
  }

  window.location.replace(`${protocol}//${host}${pathname}/${search}${hash}`);
};
