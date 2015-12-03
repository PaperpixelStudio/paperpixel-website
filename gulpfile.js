var gulp = require('gulp'),
  plugins = require('gulp-load-plugins')();

var basepath = './web/assets/';

var js_files = [
  basepath + 'vendor/jquery/dist/jquery.js',

  // bootstrap - uncomment needed files
  //basepath + 'vendor/bootstrap/js/transition.js',
  //basepath + 'vendor/bootstrap/js/alert.js',
  //basepath + 'vendor/bootstrap/js/button.js',
  //basepath + 'vendor/bootstrap/js/carousel.js',
  //basepath + 'vendor/bootstrap/js/collapse.js',
  //basepath + 'vendor/bootstrap/js/dropdown.js',
  //basepath + 'vendor/bootstrap/js/modal.js',
  //basepath + 'vendor/bootstrap/js/tooltip.js',
  //basepath + 'vendor/bootstrap/js/popover.js',
  //basepath + 'vendor/bootstrap/js/scrollspy.js',
  //basepath + 'vendor/bootstrap/js/tab.js',
  //basepath + 'vendor/bootstrap/js/affix.js',

  basepath + 'src/js/main.js'
];

gulp.task('js', function () {
  return gulp.src(js_files)
    .pipe(plugins.modernizr())
    .pipe(plugins.concat('scripts.js'))
    .pipe(gulp.dest(basepath + 'dist'))
    .pipe(plugins.rename('scripts.min.js'))
    .pipe(plugins.uglify())
    .pipe(gulp.dest(basepath + 'dist'));
});


gulp.task('css', function () {
  return gulp.src(basepath + 'src/less/main.less')
    .pipe(plugins.less())
    .pipe(plugins.rename('styles.css'))
    .pipe(gulp.dest(basepath + 'dist'))
    .pipe(plugins.rename('styles.min.css'))
    .pipe(plugins.minifyCss())
    .pipe(gulp.dest(basepath + 'dist'))
    .pipe(plugins.livereload());
});

gulp.task('watch', function () {
  plugins.livereload.listen();

  gulp.watch('web/assets/src/**/*.less', ['css']);
  gulp.watch('web/assets/src/**/*.js', ['js']);

  gulp.watch('web/**/*.html').on('change', plugins.livereload.changed);
  gulp.watch('web/assets/dist/**').on('change', plugins.livereload.changed);
});


gulp.task('default', ['js', 'css', 'watch']);
gulp.task('build', ['js', 'css']);