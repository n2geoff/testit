const gulp   = require("gulp");
const minify = require("gulp-minify");
const strip  = require("gulp-strip-comments");
const rollup = require("gulp-rollup-2").rollup;

gulp.task("default", function build() {
    return gulp.src("./src/testit.js")
        .pipe(rollup({
            input: "./src/testit.js",
            output: [
                {
                    file: "testit.js",
                    name: "es",
                    format: "es"
                },
                {
                    file: "testit.umd.js",
                    name: "umd",
                    format: "umd"
                },
            ]
        }))
        .pipe(strip({safe: true}))
        .pipe(minify({ext: {min: ".min.js"}}))
        .pipe(gulp.dest("dist"))
});
