const ora = require('ora');
const exec = require('../utils/exec');

module.exports = ({name}) => {
  const spinner = ora('init git hooks and install dependencies...');
  return exec(`cd ${name} && git init && git add . && git commit -m "feat: init"`)
    .then(() => {
      spinner.succeed('over~ 😺');
    })
    .catch(() => {
      spinner.fail('fail! 😿');
    });
};
