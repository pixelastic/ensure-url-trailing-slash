import firost from 'firost';
import path from 'path';
import terser from 'terser';

(async () => {
  const spinner = firost.spinner();
  // Compile the method to ES2015
  const tmpDir = path.resolve('./tmp/pre-build');
  spinner.tick('Compile source to ES2015');
  await firost.shell(`yarn run aberlaas build --out-dir=${tmpDir}`);

  // Get the source of the method
  const method = firost.require(`${tmpDir}/ensureUrlTrailingSlash.js`);
  const source = method.toString();

  // Minify it
  spinner.tick('Minify it');
  const minified = terser.minify(source).code;

  // Keep only the method body
  const regexp = /(?<start>[^{]*){(?<content>.*)}$/s;
  const { content } = minified.match(regexp).groups;

  // Save it as source.js
  spinner.tick('Save it as string');
  const fileContent = `export default '${content}'`;
  const filepath = './lib/source.js';
  await firost.write(fileContent, filepath);

  // Prettify it
  spinner.tick('Prettify it');
  await firost.shell('yarn run aberlaas lint --fix ./lib/source.js');

  spinner.success('Pre-build finished');
})();
