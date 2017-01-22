const gulp = require('gulp');
const mocha = require('gulp-mocha');
const gutil = require('gulp-util');
const rename = require("gulp-rename");
const gulpif = require('gulp-if');
const tap = require('gulp-tap');
const ignore = require('gulp-ignore')
const util = require('util');
const clean = require('gulp-clean');

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
gulp.task('rename', () => {
    const scriptFiles = [
        'dns.js',
        'foo.js',
    ];
    return gulp.src('./app/*.js')
        .pipe(ignore.include(file =>
            scriptFiles.some(scriptFile =>
                file.path.endsWith('/' + scriptFile))))
        .pipe(clean())
        .pipe(rename({
            suffix: "-someSuffix",
        }))
        .pipe(gulp.dest(file => file.base)); /* leave it in the same location */
});

gulp.task('default', ['watch-mocha']);
