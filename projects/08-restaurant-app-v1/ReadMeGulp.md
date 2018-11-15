# Gulp set-up

Trying to get gulp to load the html file with Browser Sync:

    npm install browser-sync gulp del --save-dev

To remind yourself of what's going on in `gulpfile.js`, start at the end:

    //DEFAULT
    gulp.task('default',
        gulp.series('clean', 'dev', gulp.parallel('watch','browser-sync')));

The default task runs first the task named `clean`, then `dev` followed by `watch` and `browser-sync` in parallel. 

The 'dev:*' function says where things should be copied to the distribution folder. Namely, from source (src) to destination (dest):

    gulp.task('dev:views', function() {
        return gulp
            .src('./app/*.html')
            //Process views
            .pipe(gulp.dest('./dist'));
    });


Then the 'watch:\*' function watches for changes in the specified folder (first argument) and then runs the copy function (i.e., dev:\*), as second argument.


    var gulp        = require('gulp');
    var browserSync = require('browser-sync').create();
    
