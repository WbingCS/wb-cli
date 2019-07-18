const ora = require('ora'); // 显示加载状态
const path = require('path');
const {sync: rm} = require("rimraf");
const Metalsmith = require("metalsmith");
const Handlebars = require("handlebars");


module.exports = function(params) {
  const spinner = ora('building ...');
  const DIST_PATH = path.resolve(params.name, 'template');
  const metalsmith = Metalsmith(process.cwd())
    .metadata(params)
    .clean(false)
    .source(DIST_PATH)
    .destination(params.name);

  return new Promise((resolve, reject) => {
    metalsmith.use((files, metalsmith, done) => {
      const meta = metalsmith.metadata();
      Object.keys(files).forEach(key => {
        const file = files[key].contents.toString('utf8');
        try {
          files[key].contents = new Buffer.from(
            Handlebars.compile(file)(meta)
          );
        } catch(e) {
          // 图片在解析的时候会报错，忽略即可
        }
      });
      done();
    })
    .build(err => {
      // 完成之后，干掉模板
      rm(DIST_PATH);
      if (err) {
        spinner.fail('build failed 😢')
        reject(err)
      } else {
        spinner.succeed('build success 😁')
        resolve();
      }
    });
  });
};
