const logSymbols = require('log-symbols');
const chalk = require('chalk');

exports.success = function(msg) {
  console.log(logSymbols.success, chalk.green(msg));
};

exports.warn = function(msg) {
  console.log(logSymbols.warning, chalk.yellow(msg));
};

exports.error = function(msg) {
  console.log(logSymbols.error, chalk.red(msg));
};
