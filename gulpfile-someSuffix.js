const gulp = require('gulp');
const mocha = require('gulp-mocha');
const gutil = require('gulp-util');
const rename = require("gulp-rename");
const gulpif = require('gulp-if');
const tap = require('gulp-tap');
const gulpIgnore = require('gulp-ignore')
const util = require('util');

gulp.task('watch-mocha', function() {
    // run in oneshot
    gulp.start('mocha');
    // start watching
    gulp.watch(['app/**', 'spec/**'], ['mocha']);
});

gulp.task('mocha', function() {
    return gulp.src(['spec/*.js'], {
            read: false
        })
        .pipe(mocha({
            reporter: 'list'
        }))
        .on('error', gutil.log);
});

function condition(file) {
    const scriptFiles = [
        'package.json',
        'arrays.js',
    ];
    // console.log('file : %j', file);
    // console.log(`file.path: ${file.path}`);
    if (file === scriptFiles.some(s => {
            console.log(`s: ${s}`);
            console.log(`file: ${file.path}`);
            console.log(`endsWith: ${file.path.endsWith(s)}`);
            return file.path.endsWith(s);
        })) {
        return true;
    }
    return false;

}
gulp.task('rename', function() {
    const suffix = '-someSuffix';

    return gulp.src('*.js')
        // .pipe(/* if the current file is in `scriptFiles`, then add `suffix` to it */)
        .pipe(gulpIgnore.exclude(condition))
        .pipe(rename({
            suffix: "-someSuffix",
        }))
        .pipe(gulp.dest('./') /* leave it in the same location */ )
});
gulp.task('default', ['watch-mocha']);
