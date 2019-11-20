export default 'const{protocol:o,host:n,pathname:t,search:a,hash:c}=window.location;if("/"===t[t.length-1])return;const e=`${o}//${n}${t}/${a}${c}`;window.location.replace(e)';
