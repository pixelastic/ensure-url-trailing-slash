const lintStagedConfig = require('aberlaas/lib/configs/lintstaged.js');
module.exports = {
  ...lintStagedConfig,
  'lib/**/*.js': ['yarn run build', 'git add README.md lib/source.js'],
};
