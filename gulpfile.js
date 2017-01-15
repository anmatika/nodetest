var gulp = require('gulp');
var mocha = require('gulp-mocha');
var gutil = require('gulp-util');

gulp.task('watch-mocha', function() {
  // run in oneshot
  gulp.start('mocha');
  // start watching
  gulp.watch(['app/**', 'spec/**'], ['mocha']);
});

gulp.task('mocha', function() {
  return gulp.src(['spec/*.js'], { read: false })
    .pipe(mocha({ reporter: 'list' }))
    .on('error', gutil.log);
});

gulp.task('default', ['watch-mocha']);
