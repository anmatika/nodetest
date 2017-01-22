const gulp = require('gulp');
const mocha = require('gulp-mocha');
const gutil = require('gulp-util');
const rename = require('gulp-rename');
const ignore = require('gulp-ignore');
const clean = require('gulp-clean');

gulp.task('watch-mocha', () => {
    // run in oneshot
    gulp.start('mocha');
    // start watching
    gulp.watch(['app/**', 'spec/**'], ['mocha']);
});

gulp.task('mocha', () => {
    return gulp.src(['spec/*.js'], {
        read: false
        })
        .pipe(mocha({
            reporter: 'list'
        }))
        .on('error', gutil.log);
});

gulp.task('rename', () => {
    const scriptFiles = [
        'dns.js',
        'encrypt_decrypt.js',
    ];
    return gulp.src('./app/*.js')
        .pipe(ignore.include(file =>
            scriptFiles.some(scriptFile =>
                file.path.split('/')
                .pop() === scriptFile)))
        .pipe(clean())
        .pipe(rename({
            suffix: '-someSuffix'
        }))
        .pipe(gulp.dest(file => file.base)); /* leave it in the same location */
});

gulp.task('default', ['watch-mocha']);
