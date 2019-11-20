# `ensure-url-trailing-slash`

Ensure that the current URL ends with a trailing slash. This will fix
`site.com/foo` to `site.com/foo/`.

This is useful for websites deployed on Netlify where `site.com/foo` and
`site.com/foo/` will resolve to the same page content. `site.com/foo` is
considered a filename `foo` at the root, while `site.com/foo/` is considered
a file named `index.html` in the `foo/` directory. This has an impact with the
way relative paths to assets are handled.

There is currently (as of November 2019) no force a redirect from `site.com/foo`
to `site.com/foo/` from Netlify, so this module comes as a workaround.

## Note

Note that because of the issue highlighted above, this script is better inserted
inline in your `<head>` as you cannot reliably load it from an external file,
because of the exact problem it's aimed to solve.

```javascript
ensureUrlTrailingSlash();
```
