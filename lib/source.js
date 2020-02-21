module.exports =
  'const{protocol:n,host:o,pathname:a,search:i,hash:c}=window.location;a.endsWith("/")||a.includes(".")||window.location.replace(`${n}//${o}${a}/${i}${c}`)';
