const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const csso = require('gulp-csso');
const cleanCSS = require('gulp-clean-css');
const concatCss = require('gulp-concat-css');
const browserSync = require('browser-sync').create();

const style = () => {
  return gulp
    .src('./scss/**/*.scss')
    .pipe(sass())
    .pipe(autoprefixer())
    .pipe(csso({ restructure: false }))
    .pipe(concatCss('style.bundle.css'))
    .pipe(cleanCSS({ compatibility: 'ie8' }))
    .pipe(gulp.dest('./css'))
    .pipe(browserSync.stream());
};

const watch = () => {
  browserSync.init({
    server: {
      baseDir: './',
    },
  });
  gulp.watch('./scss/**/*.scss', style);
  gulp.watch('./*.html').on('change', browserSync.reload);
};

exports.style = style;
exports.watch = watch;
