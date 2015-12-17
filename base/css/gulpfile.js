// Include Gulp & plugins
var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();

// Sass and autoprefix CSS 
gulp.task('styles', function() {
    return plugins.rubySass('sass/')
        .pipe(plugins.autoprefixer({
            browsers: ['last 2 versions'],
            cascade: true
        }))
        .pipe(gulp.dest(''))
        .pipe(plugins.notify('Styles have been successfully updated'))
        .pipe(plugins.livereload());
});

// Watch task
gulp.task('watch', function() {
	plugins.livereload.listen();
	gulp.watch('sass/*.scss', ['styles']);
});

// Default task
gulp.task('default', [ 'styles','watch']);