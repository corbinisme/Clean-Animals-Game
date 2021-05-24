const { series, parallel, watch } = require('gulp');
var gulp = require('gulp');
var sass = require('gulp-sass');
sass.compiler = require('node-sass');


function clean(cb) {
  // body omitted
  cb();
  
}

function css(cb) {
  // body omitted
  watch('src/scss/*.scss', { ignoreInitial: false }, function(cb) {
    // body omitted
    gulp.src('./src/scss/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./app/css'));
    cb();
  });
}


function javascript(cb) {
    // body omitted
    watch('src/js/*.js', { ignoreInitial: false }, function(cb) {
      // body omitted
      gulp.src('./src/js/*.js')
      .pipe(gulp.dest('./app/js'));
      cb();
    });
  }



exports.build = series(clean, parallel(css, javascript));