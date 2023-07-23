const { src, dest, watch, parallel, series } = require('gulp');
const scss = require('gulp-sass')(require('sass'));
const concat = require('gulp-concat');
const browserSync = require('browser-sync').create();
const uglify = require('gulp-uglify-es').default;
const autoprefixer = require('gulp-autoprefixer');
const imagemin = require('gulp-imagemin');
const del = require('del');
const babel = require('gulp-babel');
const webpack = require('webpack-stream');
const webp = require('gulp-webp');

function browsersync() {
  browserSync.init({
    server: {
      baseDir: 'app/',
    },
  });
}

function images() {
  return src('app/images/**/*')
    .pipe(
      imagemin([
        imagemin.gifsicle({ interlaced: true }),
        imagemin.mozjpeg({ quality: 80, progressive: true }),
        imagemin.optipng({ optimizationLevel: 5 }),
        imagemin.svgo({
          plugins: [{ removeViewBox: true }, { cleanupIDs: false }],
        }),
      ]),
    )
    .pipe(dest('dist/images'))
    .pipe(src('app/images/**/*'))
    .pipe(webp())
    .pipe(dest('dist/images'));
}

function scripts() {
  const mode = process.argv[4]
    ? process.argv[4].replace(/--mode=/)
    : 'development';
  return src(['app/js/main.js'])
    .pipe(
      webpack({
        mode,
      }),
    )
    .pipe(concat('main.min.js'))
    .pipe(
      babel({
        presets: ['@babel/preset-env'],
      }),
    )
    .pipe(uglify())
    .pipe(dest('app/js'))
    .pipe(browserSync.stream());
}

function styles() {
  return src('app/scss/style.scss')
    .pipe(scss({ outputStyle: 'compressed' }))
    .pipe(concat('style.min.css'))
    .pipe(
      autoprefixer({
        overrideBrowserslist: ['last 30 version'],
        grid: true,
      }),
    )
    .pipe(dest('app/css'))
    .pipe(browserSync.stream());
}

function build() {
  return src(
    [
      'app/css/style.min.css',
      'app/fonts/**/*',
      'app/js/main.min.js',
      'app/*.html',
    ],
    { base: 'app' },
  ).pipe(dest('dist'));
}

function watching() {
  watch(['app/scss/**/*.scss'], styles);
  watch(['app/js/**/*.js', '!app/js/main.min.js'], scripts);
  watch(['app/*.html']).on('change', browserSync.reload);
}

function delDist() {
  return del('dist');
}

exports.styles = styles;
exports.watching = watching;
exports.browsersync = browsersync;
exports.scripts = scripts;
exports.images = images;
exports.delDist = delDist;

exports.build = series(delDist, styles, scripts, images, build);

exports.start = parallel(styles, scripts, browsersync, watching);
