const ora = require('ora');
const {
  repository
} = require('../utils/config');
const exec = require('../utils/exec');
const { error: logError } = require('../utils/logger');

module.exports = function (name, isRoot = false) {
  const spinner = ora('downloading template...');
  spinner.start();
  const command = `
  ${
    isRoot
      ? `cd ${name} &&`
      : ''
  }git clone -q ${repository} template && cd template && rm -rf .git`
  // 将template存储在临时目录中
  // -q的原因详见我的GitHub📒
  return exec(`
    cd ${name} && git clone -q ${repository} template && cd template && rm -rf .git
  `)
    .then(() => {
      spinner.succeed('template download complete!');
    })
    .catch(err => {
      logError(err);
      spinner.fail(err);
    });
};
