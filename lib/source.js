module.exports =
  'const{protocol:n,host:o,pathname:t,search:a,hash:h}=window.location;t.endsWith("/")||t.endsWith(".html")||window.location.replace(`${n}//${o}${t}/${a}${h}`)';
