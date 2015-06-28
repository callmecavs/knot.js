var gulp     = require('gulp');
var plugins  = require('gulp-load-plugins')();
var notifier = require('node-notifier');

// error handler
// system notification, console log, emit end (so watch continues)
var onError = function(error) {
  notifier.notify({
    'title': 'Error',
    'message': 'Compilation failure.'
  });

  console.log(error);
  this.emit('end');
}

// rename and uglify scripts
gulp.task('scripts', function() {
  return gulp.src('src/*.js')
    .pipe(plugins.plumber({ errorHandler: onError }))
    .pipe(gulp.dest('dist'))
    .pipe(plugins.uglify({ preserveComments: 'some' }))
    .pipe(plugins.rename(function(path) { path.basename = 'emitter.min' }))
    .pipe(gulp.dest('dist'))
    .pipe(plugins.connect.reload());
});

// start local server on port 3000
gulp.task('server', function() {
  return plugins.connect.server({
    root: 'dist',
    port: 3000,
    livereload: true
  });
});

// watch js files
gulp.task('watch', function() {
  gulp.watch('src/**/*', ['scripts']);
});

// build and default task
gulp.task('build', ['scripts']);
gulp.task('default', ['server', 'build', 'watch']);
