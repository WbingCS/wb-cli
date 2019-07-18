const ora = require('ora');
const {
  repository
} = require('../utils/config');
const exec = require('../utils/exec');

module.exports = function (name) {
  const spinner = ora('downloading template...');
  spinner.start();
  // 将template存储在临时目录中
  // -q的原因详见我的GitHub📒
  return exec(`mkdir ${name} && cd ${name} && git clone -q ${repository} template`)
    .then(() => {
      spinner.succeed('template download complete!');
    })
    .catch(err => {
      spinner.fail(err);
    });
};
