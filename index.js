var through = require('through2'),
    path    = require('path'),
    fs      = require('fs'),
    gutil   = require('gulp-util');

//var indexBundle = require('./lib/index.bundle.js');

function mergeFile(moduleCmdCode){
  var indexBundle = fs.readFileSync(__dirname + '/lib/index.bundle.js', 'utf-8');
  var moduleData = fs.readFileSync(process.cwd() + '/data/weex-mock.json', 'utf-8');

  var gdc = '{"title": "Rax && WeAPP","pageId": 75527005,"userId": 2202220535,"uuidRqt": "f256eb6b-38ab-412e-acb2-b1670e2b7d03","extParam": "{}","loginUserId": "0","shopId": 112772958,"pathInfo": "shop/activity","path": "shop/activity","pageName": "Page_WeApp","atp_isdpp": "4v112772958","at_isb": "0","at_alis": "1_2202220535"}';

  if(moduleData.indexOf('gdc') <= -1){
    moduleData = '{"gdc":' + gdc + ', "mds":' + moduleData + '}';
  }
  var dataFileContent = 'define("@page/data", function(require, exports, module){';
  dataFileContent += 'module.exports = ' + moduleData;
  dataFileContent += '});';

  return moduleCmdCode + dataFileContent + indexBundle;
}

/**
 * 入口函数
 * @param  {[type]} options  [description]
 * @param  {[type]} settings [description]
 * @return {[type]}          [description]
 */
module.exports = function(options, settings) {
  options = options || {};
  settings = settings || {};

  return through.obj(function (file, enc, cb) {
    if (file.isNull()) {
      this.push(file);
      return cb();
    }

    if (file.isStream()) {
      this.emit(
        'error',
        new gutil.PluginError('gulp-rax-debuger', 'Streaming not supported')
      );
    }

    options = file.data || options;
    options.filename = file.path;

    try {
      file.contents = new Buffer(
        mergeFile(file.contents.toString(), options)
      );
    } catch (err) {
      this.emit('error', new gutil.PluginError('gulp-rax-debuger', err.toString()));
    }

    this.push(file);
    cb();
  });
};
