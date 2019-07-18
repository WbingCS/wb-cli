const exec = require('../utils/exec');

module.exports = () => exec('git init && git add . && git commit -m "feat: init"');
