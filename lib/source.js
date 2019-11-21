export default 'const{protocol:o,host:n,pathname:t,search:a,hash:c}=window.location;t.endsWith("/")||window.location.replace(`${o}//${n}${t}/${a}${c}`)';
