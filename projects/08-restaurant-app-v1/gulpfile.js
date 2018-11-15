const gulp = require('gulp');
const del = require('del');
const browserSync = require('browser-sync').create();

// Source base (did not use express), just bare-bones Gulp 4:
// https://github.com/CodeChron/browsersync-gulp-4-express


// function clean(done){
//     del(['dist']);
//     done(); // Async callback for completion
// }

// gulp.task('hello', () => {
//     console.log('Hello Zell');
// });
//
//

// CLEAN
gulp.task('clean', function() {
    return del(['dist']);
});


// VIEWS
gulp.task('dev:views', function() {
    return gulp
        .src('./app/*.html')
        //Process views
        .pipe(gulp.dest('./dist'));
});

gulp.task('watch:views', function (done) {
    gulp.watch('./app/*.html', gulp.series('dev:views'));
    done();
});


// STYLES
gulp.task('dev:styles', function() {
    return gulp
        .src('./app/css/*')
        //Process views
        .pipe(gulp.dest('./dist/css'));
});

gulp.task('watch:styles', function(done){
    gulp.watch('./app/css/*', gulp.series('dev:styles'));
    done();
});

// SCRIPTS
gulp.task('dev:scripts', function () {
   return gulp.src('./app/js/*')
       .pipe(gulp.dest('./dist/js'));
});

gulp.task('watch:scripts', (done) => {
    gulp.watch('./app/js/*', gulp.series('dev:scripts'));
    done();
});

// DATA
gulp.task('dev:data', () => {
   return gulp.src('./app/data/*')
       .pipe(gulp.dest('./dist/data'));
});

gulp.task('watch:data', (done) => {
   gulp.watch('./app/data/*', gulp.series('dev:data'));
   done();
});

// IMAGES
gulp.task('dev:img', () => {
   return gulp.src('./app/img/*')
       .pipe(gulp.dest('./dist/img'));
});

// Don't need to watch images, these do not change so often.
// gulp.task('watch:img', (done) => {
//    gulp.watch('./app/img/*', gulp.series('dev:img'));
//    done();
// });


// function browserSyncInit(done) {
//     browserSync.init({
//         proxy: "localhost:3000",
//         port: 5000,
//         // baseDir: "app",
//         files: [
//             "app/**/*.*"
//         ],
//         browser: 'google chrome',
//         notify: true
//     });
//     done();
// }

function browserSyncInit(done) {
    browserSync.init({
        server: {baseDir: "app"}
    });
    done();
}

gulp.task('browser-sync', browserSyncInit);

//DEV
// WIll
gulp.task('dev', gulp.parallel('dev:styles', 'dev:views', 'dev:scripts', 'dev:data', 'dev:img'));

//WATCH
gulp.task('watch', gulp.parallel('watch:styles', 'watch:views', 'watch:scripts', 'watch:data'));

//DEFAULT
// gulp.task('default', gulp.series('clean', 'dev', 'server', gulp.parallel('watch','browser-sync')));
gulp.task('default',
    gulp.series('clean', 'dev', gulp.parallel('watch','browser-sync')));