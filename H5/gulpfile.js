var gulp = require('gulp')
var ejs = require('gulp-ejs')
var uglify = require('gulp-uglify')
var minifyCss = require('gulp-minify-css')
var uglify = require('gulp-uglify')
var htmlmin = require('gulp-htmlmin')
var babel = require('gulp-babel')
var clean = require('gulp-clean')
var server = require('gulp-server-livereload')
var rename = require('gulp-rename')
var envOpt = require('./env.js')

var ENV = process.env.NODE_ENV || 'development'
console.log(process.env.NODE_ENV);

var env = envOpt[ENV].env
var api = envOpt[ENV].api
var path = envOpt[ENV].path
var lauchWebserver = true

gulp.task('uglify', function() {
  return gulp
    .src('./pages/js/**/*.js')
    .pipe(
      babel({
        presets: ['@babel/env']
      })
    )
    .pipe(uglify())
    .pipe(gulp.dest('./qj/js'))
})

// 替换图片地址
gulp.task('css', function() {
  return gulp
    .src('./pages/css/**/*.css')
    .pipe(minifyCss())
    .pipe(gulp.dest('./qj/css'))
})

// 移动lib文件夹到qj目录
gulp.task('lib', function() {
  return gulp.src('./pages/lib/**/*')
  .pipe(uglify())
  .pipe(gulp.dest('./qj/lib'))
})

// 移动img文件夹到qj目录
gulp.task('img', function() {
  return gulp.src('./pages/images/**/*').pipe(gulp.dest('./qj/images'))
})

//
gulp.task('htmlmin', function (cb) {
  var options = {
      removeComments: true,//清除HTML注释
      collapseWhitespace: true,//压缩HTML
      collapseBooleanAttributes: false,//省略布尔属性的值 <input checked="true"/> ==> <input />
      removeEmptyAttributes: false,//删除所有空格作属性值 <input id="" /> ==> <input />
      removeScriptTypeAttributes: true,//删除<script>的type="text/javascript"
      removeStyleLinkTypeAttributes: true,//删除<style>和<link>的type="text/css"
      minifyJS: true,//压缩页面JS
      minifyCSS: true//压缩页面CSS
  };
  gulp.src(['./pages/**/*.html'])
      .pipe(htmlmin(options))
      .pipe(gulp.dest('qj'));
  cb();
});

gulp.task('ejs', cb => {
  gulp
    .src('./pages/**/*.ejs')
    .pipe(ejs({ env: env, api: api, path: path }))
    .pipe(rename({ extname: '.html' }))
    .pipe(gulp.dest('qj'))
  cb()
})

gulp.task('clean', cb => {
  gulp.src('./qj', { force: true, allowEmpty: true }).pipe(clean())
  cb()
})

gulp.task('webserver', function(cb) {
  if (lauchWebserver) {
    gulp.src('./').pipe(
      server({
        livereload: {
          enable: true,
          port: 35728
        },
        directoryListing: true,
        open: true,
        host: '0.0.0.0'
      })
    )
    gulp.watch('./pages/**/*.html', gulp.series('htmlmin'))
    gulp.watch('./pages/css/**/*.css', gulp.series('css'))
    gulp.watch('./pages/js/**/*.js', gulp.series('uglify'))
    gulp.watch('./pages/images/**/*', gulp.series('img'))
    gulp.watch('./pages/lib/**/*', gulp.series('lib'))
    lauchWebserver = false
    cb()
  } else {
    cb()
  }
})

gulp.task(
  'dev',
  gulp.series('lib', 'img', 'uglify', 'css', 'htmlmin', 'webserver', function(cb) {
    return cb()
  })
)

gulp.task(
  'build-dev',
  gulp.series('lib', 'img', 'uglify', 'css', 'htmlmin', function(cb) {
    return cb()
  })
)

gulp.task(
  'build-pro',
  gulp.series('lib', 'img', 'uglify', 'css', 'htmlmin', function(cb) {
    return cb()
  })
)
