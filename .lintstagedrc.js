const config = require('aberlaas/configs/lintstaged.js');
module.exports = {
  ...config,
  './lib/**/*.js': [
    'yarn run test --failFast --findRelatedTests',
    'yarn run build',
    'git add README.md lib/source.js',
  ],
};
