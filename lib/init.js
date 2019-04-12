

function getProjectName(name) {
  const promise = name
    ? Promise.resolve({projectName: name})
    : inquirer.prompt([{
      name: 'projectName',
      message: 'project name'
    }]);
  
  return new Promise((resolve, reject) => {
    promise.then(({projectName}) => {
      if (!projectName) {
        logger.warning('project name must be not be empty');
      }
    });
  });
}

function init(name) {
  getProjectName(name)
    .then()
}

module.exports = init;