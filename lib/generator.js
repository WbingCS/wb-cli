const ora = require('ora');
const metalsmith = require('metalsmith');
const {compile} = require('handlebars');
const {sync: rm} = require('rimraf');

module.exports = (params) => {
  const spinner = ora('building');
  const meta = metalsmith(process.cwd())
    .metadata(params)
    .clean(false)
    .source(params.name)
    .destination(params.name);

  return new Promise((resolve, reject) => {
    meta.use((files, metalsmith, done) => {
      const metaData = metalsmith.metadata();
      Object.keys(files).forEach(key => {
        const file = files[key].contents.toString('utf8');
        try {
          files[key].contents = new Buffer.from(compile(file)(metaData));
        } catch (e) {
          // 图片报错
        }
      });
      done();
    }).build(err => {
      rm(params.name);
      if (err) {
        spinner.fail('构建失败😔');
        reject(err);
        return;
      }
      spinner.succeed('构建成功');
      resolve();
    });
  });
};
