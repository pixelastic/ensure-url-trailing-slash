# `ensure-url-trailing-slash`

Check if the current URL ends with a trailing slash and redirects to it if not.
This will fix `site.com/foo` into `site.com/foo/`.

## Why?

This is useful for websites deployed on Netlify because `site.com/foo` and
`site.com/foo/` will resolve to the same page content. But `site.com/foo` is
considered a file named `foo` at the root, while `site.com/foo/` is considered
a file named `index.html` in the `foo/` directory. This has an impact on the
way relative paths to assets are handled.

There is currently (as of November 2019) [no way to force a redirect][1] from
`site.com/foo` to `site.com/foo/` from Netlify, so this module comes as
a workaround.

## Usage

The main export of the module is a method that will check the URL and redirect
(using `window.location.replace`) if needed.

Note that because of the issue this module is aimed to solve, you shouldn't
call the method from an external ressource, as this ressource might not get
loaded. Instead, you should inline it in your `<head>`.

Conveniently, the main export also contains a `.source` property that contains
a stringified version of the method (wrapped in a self-invocated function).

So a typical usage would be to somehow import the module in your build process,
then write the `.source` property in a `<script>` in your `<head>`.

```pug
head
  script!=ensureUrlTrailingSlash.source
```

Or, simply copy paste the following minified code into your `<head>`.

<!-- minified: start -->
```html
<script>(function(){const{protocol:n,host:o,pathname:t,search:a,hash:h}=window.location;t.endsWith("/")||t.endsWith(".html")||window.location.replace(`${n}//${o}${t}/${a}${h}`)})()</script>
```
<!-- minified: end -->

[1]: https://community.netlify.com/t/bug-in-non-trailing-slash-rewrite/452/29