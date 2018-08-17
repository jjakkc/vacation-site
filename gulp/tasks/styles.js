var gulp = require("gulp"),
    postcss = require("gulp-postcss"),
    autoprefixer = require("autoprefixer"),
    cssvars = require("postcss-simple-vars"),
    nested = require("postcss-nested"),
    cssImport = require("postcss-import"),
    mixins = require("postcss-mixins");

// formats the css file to proper synatax when saving
gulp.task("styles", function(){
    // console.log("Running css task");
    return gulp.src("./app/assets/styles/styles.css")
        .pipe(postcss([cssImport, mixins, nested, cssvars, autoprefixer]))
        .on('error', function(errorInfo){
            console.log(errorInfo.toString());
            this.emit('end');
        })
        .pipe(gulp.dest("./app/temp/styles"));
});