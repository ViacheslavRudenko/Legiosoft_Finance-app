const gulp = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const autoprefixer = require("gulp-autoprefixer");
const htmlmin = require("gulp-htmlmin");
const cleanCSS = require("gulp-clean-css");
const cleaner = require("gulp-clean");
const concat = require("gulp-concat");
const minify = require("gulp-js-minify");
const uglify = require("gulp-uglify");
const pipeline = require("readable-stream").pipeline;
const imagemin = require("gulp-imagemin");
const browserSync = require("browser-sync").create();

//--------------------PATH--------------------//
const path = {
  dist: {
    html: "dist",
    css: "dist/css",
    js: "dist/js",
    img: "dist/img",
    self: "dist",
  },
  src: {
    html: "*.html",
    scss: "src/scss/**/*.*",
    js: "src/js/*.js",
    img: "src/img/**/**/*.*",
  },
  fontAw: {
    css: "./node_modules/@fortawesome/fontawesome-free/css/all.css",
    js: "./node_modules/@fortawesome/fontawesome-free/js/all.js",
  },
  boots: {
    css: "./node_modules/bootstrap/dist/css/bootstrap.css",
  },
  jquery: {
    js: "./node_modules/jquery/dist/jquery.js",
  },
};

//--------------------FUNCTIONS--------------------//
//----------BUILD----------//
const cleanDist = () =>
  gulp
    .src(path.dist.self, { allowEmpty: true })
    .pipe(cleaner())
    .pipe(cleanCSS({ compatibility: "ie8" }))
    .pipe(browserSync.stream());

const htmlBuild = () =>
  gulp
    .src(path.src.html)
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest(path.dist.html))
    .pipe(browserSync.stream());

const scssBuild = () =>
  gulp.src('src/scss/styles.scss')
    .pipe(concat('styles.min.css'))
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer(['> 0.01%', 'last 100 versions']))
    .pipe(cleanCSS())
    .pipe(gulp.dest(path.dist.css))
    .pipe(browserSync.stream())

const jsBuild = () =>
  gulp
    .src(path.src.js)
    .pipe(concat("script.min.js"))
    .pipe(minify())
    .pipe(uglify())
    .pipe(gulp.dest(path.dist.js))
    .pipe(browserSync.stream());

const imgBuild = () =>
  gulp
    .src(path.src.img)
    .pipe(imagemin())
    .pipe(gulp.dest(path.dist.img))
    .pipe(browserSync.stream());

const styleVendor = () =>
  gulp
    .src([path.fontAw.css, path.boots.css])
    .pipe(concat("vendor.min.css"))
    .pipe(cleanCSS())
    .pipe(gulp.dest(path.dist.css))
    .pipe(browserSync.stream());

const scriptVendor = () =>
  gulp
    .src([path.fontAw.js, path.jquery.js])
    .pipe(concat("vendor.min.js"))
    .pipe(minify())
    .pipe(uglify())
    .pipe(gulp.dest(path.dist.js))
    .pipe(browserSync.stream());

//----------DEV----------//
const watcher = () => {
  browserSync.init({ server: { baseDir: "./dist" } });
  gulp.watch(path.src.html, htmlBuild).on("change", browserSync.reload);
  gulp.watch(path.src.scss, scssBuild).on("change", browserSync.reload);
  gulp.watch(path.src.js, jsBuild).on("change", browserSync.reload);
  gulp.watch(path.src.img, imgBuild).on("change", browserSync.reload);
};

//--------------------TASKS---------------------//
gulp.task(
  "build",
  gulp.series(
    cleanDist,
    htmlBuild,
    scssBuild,
    imgBuild,
    jsBuild,
    scriptVendor,
    styleVendor
  )
);

gulp.task("dev", gulp.series(watcher));

gulp.task("default", gulp.series("build", "dev"));
