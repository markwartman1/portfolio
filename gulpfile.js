const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass');

// Compile Sass & Inject Into Browser
gulp.task('sass', function(){
  return gulp.src(['node_modules/bootstrap/scss/bootstrap.scss', './scss/*.scss'])
  .pipe(sass())
  .pipe(gulp.dest("./css"))
  .pipe(browserSync.stream());
});

// Move JS Files to src/js
gulp.task('js', function(){
  return gulp.src(['node_modules/jquery/dist/jquery.min.js', 'node_modules/popper.js/dist/umd/popper.min.js', 'node_modules/bootstrap/dist/js/bootstrap.min.js'])
  .pipe(gulp.dest("./js"))
  .pipe(browserSync.stream());
});

// Watch Sass & Server
gulp.task('serve', gulp.series(['sass'], function(){
  browserSync.init({
    server: "./"
  });

  gulp.watch(['node_modules/bootstrap/scss/bootstrap.scss', './scss/*.scss'], gulp.series(['sass']));
  gulp.watch("./*.html").on('change', browserSync.reload);
}));

// Move Fonts Folder to src/fonts
gulp.task('fonts', function(){
  return gulp.src('node_modules/font-awesome/fonts/*')
  .pipe(gulp.dest("./fonts"));
});

// Move Font Awesome CSS to src/css
gulp.task('fa', function(){
  return gulp.src('node_modules/font-awesome/css/font-awesome.min.css')
  .pipe(gulp.dest("./css"));
});

gulp.task('default', gulp.series(['js', 'fa', 'fonts', 'serve']));
