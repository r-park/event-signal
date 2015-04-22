var del    = require('del'),
    eslint = require('gulp-eslint'),
    gulp   = require('gulp'),
    header = require('gulp-header'),
    karma  = require('karma').server,
    pkg    = require('./package.json'),
    rename = require('gulp-rename'),
    uglify = require('gulp-uglify'),
    umd    = require('gulp-umd');


gulp.task('clean', function(done){
  del('./dist/*', function(){
    done();
  });
});


gulp.task('build', ['clean', 'lint', 'test'], function(){
  var headerTemplate = '/* <%= name %> v<%= version %> - <%= date %> */\n';
  var headerContent = {name: pkg.name, version: pkg.version, date: new Date()};
  var umdHelper = function(){ return 'EventSignal'; };

  return gulp.src('./src/event-signal.js')
    .pipe(umd({exports: umdHelper, namespace: umdHelper}))
    .pipe(header(headerTemplate, headerContent))
    .pipe(gulp.dest('./dist'))
    .pipe(uglify({mangle: true}))
    .pipe(rename('event-signal.min.js'))
    .pipe(header(headerTemplate, headerContent))
    .pipe(gulp.dest('./dist'));
});


gulp.task('lint', function(){
  return gulp.src('./src/*.js')
    .pipe(eslint({useEslintrc: true}))
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});


gulp.task('test', function(done){
  karma.start({configFile: __dirname + '/karma.conf.js'}, done);
});
