import firost from 'firost';
import path from 'path';
import terser from 'terser';

(async () => {
  // Compile the method to ES2015
  const tmpDir = path.resolve('./tmp/pre-build');
  await firost.shell(`yarn run aberlaas build --out-dir=${tmpDir}`);

  // Get the source of the method
  const method = firost.require(`${tmpDir}/ensureUrlTrailingSlash.js`);
  const source = method.toString();

  // Minify it
  const minified = terser.minify(source).code;

  // Keep only the method body
  const regexp = /(?<start>[^{]*){(?<content>.*)}$/s;
  const { content } = minified.match(regexp).groups;

  // Save it as source.js
  const fileContent = `export default '${content}'`;
  const filepath = './lib/source.js';
  await firost.write(fileContent, filepath);
})();
