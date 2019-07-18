const fs = require('fs');
const path = require('path');
const inquirer = require('inquirer');

const download = require('./download');
const exec = require('../utils/exec');
const logger = require('../utils/logger');
const generator = require('./generator');


function initDir(dirname) {
  const WORK_DIR = process.cwd();
  const mkdir = dirname => (
    exec(`mkdir ${dirname} && cd ${dirname}`)
      .then(() => dirname)
  );

  const initEmpty = (dir = '') => (
    exec(`rm -rf ./${dir ? `${dir}/*` : '*'}`)
      .then(() => dir || WORK_DIR.split('/').pop()
    )
  );

  const isExist = (name) => {
    if (!fs.existsSync(name)) {
      return mkdir(name);
    }
    return inquirer.prompt([{
      name: 'cover',
      message: `当前目录已存在，是否覆盖(y/n)?`,
      default: 'y',
    }]).then(res => (
      ['y', 'yes'].includes(res.cover)
        ? initEmpty(name)
        : setProjectName()
    ));
  };

  const setProjectName = () => {
    return inquirer.prompt([{
      name: 'name',
      message: '项目名称',
    }]).then(({
      name
    }) => {
      if (!name) {
        logger.warn('项目名称不能为空!');
        return setProjectName();
      }
      return isExist(name);
    });
  };

  if (dirname) {
    return isExist(dirname);
  }

  return exec(`ls ${WORK_DIR}`)
    .then(output => {
      if (!output) return initEmpty();

      return inquirer.prompt([{
          name: 'cover',
          message: '当前目录非空，是否覆盖(y/n)?',
          default: 'y',
        }]).then(res => (
          ['y', 'yes'].includes(res.cover)
            ? initEmpty()
            : setProjectName()
        ));
    });
}

function run(params) {
  return inquirer.prompt([{
    name: 'version',
    message: '项目版本',
    default: '1.0.0',
  }, {
    name: 'author',
    message: '作者',
    default: '',
  }, {
    name: 'description',
    message: '项目描述',
    default: '',
  }]).then(res => ({
    ...params,
    ...res
  }));
}


module.exports = function (projectName) {
  let info;
  initDir(projectName)
    .then(name => run({ name }))
    .then(params => (
      info = params,
      download(params.name)
    ))
    .then(() => generator(info, path.join(info.name, 'temp')))
    .then(() => {
      console.log('over');
    })
    .catch(e => console.log(e))
};
