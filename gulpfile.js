'use srict'

const gulp     = require('gulp'),
      sass     = require('gulp-sass'),
      jade     = require('gulp-jade'),
      babel    = require('gulp-babel'),
      concat   = require('gulp-concat'),
      imagemin = require('gulp-imagemin'),
      prefixer = require('gulp-autoprefixer');


//Babel for working with ES6
gulp.task('babel', () => {
  return gulp.src('website/js/function.js')
    .pipe(babel({ presets: ['es2015'] }))
    .pipe(gulp.dest('website/app'));
})

// Compiling Sass to css
gulp.task('styles', () => {
  return gulp.src('website/sass/*.sass')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('website/app'));
});

// Jade to HTML
gulp.task('jade', () => {
  return gulp.src('website/jade/*.jade')
    .pipe(jade({pretty: true}))
    .pipe(gulp.dest('website/app'));
});

// Gulp-imagemin
gulp.task('image', () => {
  return gulp.src('website/img/*')
    .pipe(imagemin())
    .pipe(gulp.dest('website/img-compressed'));
})

// Applying css vendor prefixes
// for browsers compatibility
gulp.task('prefixer', () => {
  return gulp.src('website/app/app.css')
  .pipe(prefixer({browsers: ['last 15 versions']}))
  .pipe(concat('all.css'))
  .pipe(gulp.dest('website/app'));
});

// Watch Task
// Watches SASS, JS
gulp.task('watch', () => {
gulp.watch('website/sass/*.sass', ['styles']);
gulp.watch('website/jade/*.jade', ['jade'])
gulp.watch('website/app/*.css', ['prefixer']);
gulp.watch('website/js/function.js', ['babel']);
gulp.watch('website/img/*', ['image']);
});

gulp.task('default', ['jade', 'styles', 'prefixer', 'image', 'babel']);
