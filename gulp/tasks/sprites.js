var gulp = require("gulp"),
svgSprite = require("gulp-svg-sprite"),
rename = require("gulp-rename"),
del = require("del"),
svg2png = require("gulp-svg2png");

var config = {
    shape:{
        spacing:{
            padding: 1
        }
    },
    mode: {
        css: {
            variables: {
                replaceSvgWithPng: function(){
                    return function(sprite, render){
                        // render gives access to css thats in template then we can split the random gen sprite file and append png to it
                        return render(sprite).split('.svg').join('.png');
                    }
                }
            },
            sprite: "sprite.svg",
            render: {
                css: {
                    template: "./gulp/templates/sprite.css"
                }
            }
        }
    }
}

gulp.task("beginClean", function(){
    return del(["./app/temp/sprite", "./app/assets/images/sprites"]);
});

gulp.task("createSprite", ["beginClean"], function(){
    return gulp.src("./app/assets/images/icons/**/*.svg")
        .pipe(svgSprite(config))
        .pipe(gulp.dest("./app/temp/sprite/"));
});

gulp.task("createPngCopy", ["createSprite"], function(){
    return gulp.src("./app/temp/sprite/css/*.svg")
      .pipe(svg2png())
      .pipe(gulp.dest("./app/temp/sprite/css/"));
});

// copies svg file into sprites folder
gulp.task("copySpriteGraphic", ["createPngCopy"], function(){
    return gulp.src("./app/temp/sprite/css/**/*.{svg,png}") // copies svg & png
        .pipe(gulp.dest("./app/assets/images/sprites"));
})

// copies css file into the modules folder
gulp.task("copySpriteCSS", ["createSprite"], function(){
    return gulp.src("./app/temp/sprite/css/*.css")
        .pipe(rename("_sprite.css"))
        .pipe(gulp.dest("./app/assets/styles/modules"));
});

// removes temp sprite folder when finished copy files over
gulp.task("endClean", ["copySpriteGraphic", "copySpriteCSS"], function(){
    return del(["./app/temp/sprite"]);
});

// launches tasks to merge icons into 1 file then copies files made
gulp.task("icons", ["beginClean", "createSprite", "createPngCopy", "copySpriteGraphic", "copySpriteCSS", "endClean"]);