var gulp = require("gulp"),
imagemin = require("gulp-imagemin"),
del = require("del"),
usemin = require("gulp-usemin"),
rev = require("gulp-rev"),
cssnano = require("gulp-cssnano"),
uglify = require("gulp-uglify"),
browserSync = require("browser-sync").create();

gulp.task("previewDist", function(){
    // opens browser on starting gulp watch task
    browserSync.init({
        notify: false,
        server: {
            baseDir: "docs"
        }
    });
});

// task to delete dist folder
gulp.task("deleteDistFolder", ["icons"], function(){
    return delete("./docs");
});

gulp.task("copyGeneralFiles", ["deleteDistFolder"], function(){
    var pathsToCopy = [
        "./app/**/*",
        "!./app/index.html",
        "!./app/assets/images/**",
        "!./app/assets/styles/**",
        "!./app/assets/scripts/**",
        "!./app/temp",
        "!./app/temp/**"
    ]
    return gulp.src(pathsToCopy)
      .pipe(gulp.dest("./docs"));
});

// copy img files to dist
gulp.task("optimizeImages", ["deleteDistFolder"], function(){
    return gulp.src(['./app/assets/images/**/*', '!./app/assets/images/icons', '!./app/assets/images/icons/**/*'])
      .pipe(imagemin({
          progressive: true, // opt jpg images
          interlaced: true, // opt gif images
          multipass: true // opt svg files
      }))
      .pipe(gulp.dest("./docs/assets/images"));
});

gulp.task("useminTrigger", ["deleteDistFolder"], function(){
    gulp.start("usemin");
});

// copy & revision html, css, js files to dist folder
gulp.task("usemin", ["styles", "scripts"], function(){
    return gulp.src("./app/index.html")
      .pipe(usemin({
          css:[function(){return rev()}, function(){return cssnano()}],
          js:[function(){return rev()}, function(){return uglify()}]
      }))
      .pipe(gulp.dest("./docs"));
});

gulp.task("build", ["deleteDistFolder", "copyGeneralFiles", "optimizeImages", "useminTrigger"]);