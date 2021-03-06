const gulp = require("gulp");
const autoprefixer = require("gulp-autoprefixer");
const sass = require("gulp-sass");
const cleanCSS = require("gulp-clean-css");
const sourcemaps = require("gulp-sourcemaps");
const babel = require("gulp-babel");
const concat = require("gulp-concat");
const uglify = require("gulp-uglify");
const imagemin = require('gulp-imagemin');

gulp.task("sass", function () {
    return gulp
        .src("./src/style/style.scss")
        .pipe(sass().on("error", sass.logError))
        .pipe(autoprefixer({
            browsers: ["last 2 versions"],
            cascade: false
        }))
        .pipe(gulp.dest("dist/css/internal"));
});

gulp.task("minify-css", ["sass"], function () {
    return gulp
        .src("./dist/css/internal/style.css")
        .pipe(cleanCSS())
        .pipe(gulp.dest("dist/css/internal"));
});

gulp.task("js", function () {
    return gulp
        .src("./src/js/**/*.js")
        .pipe(sourcemaps.init())
        .pipe(babel({
            presets: ["env"]
        }))
        .pipe(concat('scripts.js'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest("./dist/js/internal"));
});

gulp.task("vendor_js", function () {
    return gulp
        .src("./dist/js/*.min.js")
        .pipe(concat("vendor.js"))
        .pipe(uglify())
        .pipe(gulp.dest("./dist/js"));
});

gulp.task("vendor_css", function () {
    return gulp
        .src("./dist/css/*.css")
        .pipe(concat("vendor.css"))
        .pipe(cleanCSS())
        .pipe(gulp.dest("./dist/css"));
});

gulp.task("minify-js", ["js"], function () {
    return gulp
        .src("./dist/js/internal/scripts.js")
        .pipe(uglify())
        .pipe(gulp.dest("./dist/js/internal"));
});

gulp.task("img", function () {
    return gulp
        .src("./src/img/**/*")
        .pipe(imagemin())
        .pipe(gulp.dest("./dist/img"));
});

gulp.task("build", ["vendor_css", "minify-css", "vendor_js", "minify-js", "img"]);

gulp.task("watch", function () {
    gulp.watch("./src/style/**/*.scss", ["sass"]);
    gulp.watch("./src/js/**/*.js", ["js"]);
});

gulp.task("default", ["build"]);