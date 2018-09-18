var gulp = require("gulp"),
    watch = require("gulp-watch"),
    browserSync = require("browser-sync").create();

gulp.task("watch", function(){

    // opens browser on starting gulp watch task
    browserSync.init({
        notify: false,
        server: {
            baseDir: "app"
        }
    });

    // reloads browser w/e something changes in html/css files
    watch("./app/index.html", function(){
        browserSync.reload();
    });
    watch("./app/assets/styles/**/*.css", function(){
        gulp.start("cssInject");
    });

    watch("./app/assets/scripts/**/*.js", function(){
        gulp.start("scriptsRefresh");
    });
});

// css doesn't need to refresh browser on changes so this sends
// new code to browser
gulp.task("cssInject",["styles"], function(){
    return gulp.src("./app/temp/styles/styles.css")
        .pipe(browserSync.stream());
});

// refreshes browser on js file changes after scripts.js runs
gulp.task("scriptsRefresh", ["scripts"], function(){
    browserSync.reload();
});