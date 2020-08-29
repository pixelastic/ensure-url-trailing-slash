const write = require('firost/write');
const read = require('firost/read');
const run = require('firost/run');
const terser = require('terser');

(async () => {
  // Get the source of the method
  const method = require('../lib/ensureUrlTrailingSlash.js');
  const source = method.toString();

  // Minify it
  const minified = (await terser.minify(source)).code;

  // Keep only the method body
  const regexp = /(?<start>[^{]*){(?<content>.*)}$/s;
  const { content } = minified.match(regexp).groups;

  // Save it as source.js
  const fileContent = `module.exports = '${content}'`;
  const filepath = './lib/source.js';
  await write(fileContent, filepath);

  // Prettify it
  await run('yarn run aberlaas lint --fix ./lib/source.js', { stdout: false });

  // Update the documentation
  const readmePath = './README.md';
  const readmeContent = await read(readmePath);
  const boundStart = '<!-- minified: start -->';
  const boundEnd = '<!-- minified: end -->';
  const pattern = new RegExp(`${boundStart}(.*)${boundEnd}`, 's');
  const example = `${boundStart}\n\`\`\`html\n<script>(function(){${content}})()</script>\n\`\`\`\n${boundEnd}`;
  const readmeUpdatedContent = readmeContent.replace(pattern, example);
  await write(readmeUpdatedContent, readmePath);
})();
