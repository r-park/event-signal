var bump       = require('gulp-bump'),
    coveralls  = require('gulp-coveralls'),
    del        = require('del'),
    eslint     = require('gulp-eslint'),
    gulp       = require('gulp'),
    header     = require('gulp-header'),
    karma      = require('karma').server,
    rename     = require('gulp-rename'),
    sourcemaps = require('gulp-sourcemaps'),
    uglify     = require('gulp-uglify'),
    umd        = require('gulp-umd');

var manifests = ['./bower.json', './package.json'];


gulp.task('bump', function(){
  return gulp.src(manifests)
    .pipe(bump({type: 'patch'}))
    .pipe(gulp.dest('./'));
});


gulp.task('bump:minor', function(){
  return gulp.src(manifests)
    .pipe(bump({type: 'minor'}))
    .pipe(gulp.dest('./'));
});


gulp.task('clean', function(done){
  del('./dist/*', done());
});


gulp.task('coveralls', function() {
  return gulp.src('./coverage/**/lcov.info')
    .pipe(coveralls());
});


gulp.task('header', function(){
  var pkg = require('./package.json');
  var headerTemplate = '/* <%= name %> v<%= version %> - <%= date %> - <%= url %> */\n';
  var headerContent = {date: (new Date()).toISOString(), name: pkg.name, version: pkg.version, url: pkg.homepage};

  return gulp.src('./dist/*.js')
    .pipe(header(headerTemplate, headerContent))
    .pipe(gulp.dest('./dist'));
});


gulp.task('lint', function(){
  return gulp.src('./src/event-signal.js')
    .pipe(eslint({useEslintrc: true}))
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});


gulp.task('process', function(){
  var umdHelper = function(){ return 'EventSignal'; };

  return gulp.src('./src/event-signal.js')
    .pipe(umd({exports: umdHelper, namespace: umdHelper}))
    .pipe(gulp.dest('./dist'));
});


gulp.task('test', function(done){
  karma.start({configFile: __dirname + '/karma.conf.js'}, done);
});


gulp.task('uglify', function(){
  return gulp.src('./dist/*.js')
    .pipe(rename(function(path){
      path.basename += ".min";
    }))
    .pipe(sourcemaps.init())
    .pipe(uglify())
    .pipe(sourcemaps.write('./', {includeContent: true}))
    .pipe(gulp.dest('./dist'));
});


gulp.task('build', gulp.series('lint', 'test', 'clean', 'process', 'uglify', 'header'));

gulp.task('dist:patch', gulp.series('bump', 'build'));

gulp.task('dist:minor', gulp.series('bump:minor', 'build'));
