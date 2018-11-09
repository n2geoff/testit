const gulp = require("gulp");
const minify = require("gulp-minify");
const strip = require("gulp-strip-comments");

gulp.task("default", function build() {
    return gulp.src("./src/testit.js")
        .pipe(strip({safe: true}))
        .pipe(minify({ext: {min: ".min.js"}}))
        .pipe(gulp.dest("dist"))
});