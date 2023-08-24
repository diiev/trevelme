"use strict";

const gulp = require("gulp");
const browsersync = require("browser-sync");
const {src, dest} = require("gulp")
const autoprefixer = require("gulp-autoprefixer")
const cssbeautify = require("gulp-cssbeautify");
const removeComments = require('gulp-strip-css-comments');
const rename = require("gulp-rename"); 
const sass = require("gulp-sass")(require('sass'));
const cssnano = require("gulp-cssnano");
const plumber = require("gulp-plumber");
const panini = require("panini");
const del = require("del");
const notify = require("gulp-notify")
const imagewebp = require("gulp-webp")
const browserSync = require("browser-sync").create();
const webpack = require("webpack-stream");

const srcPath = "src/"
const distPath = "dist/"
const path = {
    build: {
        html: distPath,
        css: distPath + "assets/css/",
        js: distPath + "assets/js/",
        images: distPath + "assets/img/",
        fonts: distPath + "assets/fonts/",
        video: distPath + "assets/video/"
    },
    src: {
        html: srcPath + "*.html",
        css: srcPath + "assets/scss/*.scss",
        js: srcPath + "assets/js/*.js",
        images: srcPath + "assets/img/**/*.{jpg,png,svg,gif,ico,webp,webmanifest,xml,json}",
        fonts:  srcPath + "assets/fonts/**/*.{eot,woff,woff2,ttf,svg}",
        video:  srcPath + "assets/video/*.{mp4,avi}"
    },
    watch: {
        html:   srcPath + "**/*.html",
       js:     srcPath + "assets/js/**/*.js",
        css:    srcPath + "assets/scss/**/*.scss",
        images: srcPath + "assets/img/**/*.{jpg,png,svg,gif,ico,webp,webmanifest,xml,json}",
        fonts:  srcPath + "assets/fonts/**/*.{eot,woff,woff2,ttf,svg}",
        video:  srcPath + "assets/video/*.{mp4,avi}"
    },
    clean: "./" + distPath
}

gulp.task("html", () => {
    panini.refresh()
    return src(path.src.html, {base: srcPath})
        .pipe(plumber())
        .pipe(panini({
            root: srcPath,
            layouts: srcPath + "template/layouts/",
            partials: srcPath + "template/partials/"
        }))
        .pipe(dest(path.build.html))
        .on("end", browsersync.reload);
});

gulp.task("js", () => {
    return gulp.src("./src/assets/js/main.js")
                .pipe(webpack({
                    mode: 'development',
                    output: {
                        filename: 'script.js'
                    },
                    watch: false,
                    devtool: "source-map",
                    module: {
                        rules: [
                          {
                            test: /\.m?js$/,
                            exclude: /(node_modules|bower_components)/,
                            use: {
                              loader: 'babel-loader',
                              options: {
                                presets: [['@babel/preset-env', {
                                    debug: true,
                                    corejs: 3,
                                    useBuiltIns: "usage"
                                }]]
                              }
                            }
                          }
                        ]
                      }
                }))
                .pipe(gulp.dest(path.build.js))
                .on("end", browsersync.reload);
});

gulp.task("css", () => {
    return src(path.src.css, {base: srcPath + "assets/scss/"})
        .pipe(plumber({
            errorHandler : function(err) {
                notify.onError({
                    title:    "SCSS Error",
                    message:  "Error: <%= error.message %>"
                })(err);
                this.emit('end');
            }
        }))
        .pipe(sass())
        .pipe(autoprefixer())
        .pipe(cssbeautify())
        .pipe(dest(path.build.css))
        .pipe(cssnano({
            zindex: false,
            discardComments: {
                removeAll: true
            }
        }))
        .pipe(removeComments())
        .pipe(rename({
            suffix: ".min",
            extname: ".css"
        }))
        .pipe(dest(path.build.css))
        .on("end", browsersync.reload);
});

gulp.task('img',()=> {
    return src(path.src.images, {base: srcPath + "assets/img/"})
     .pipe(dest(path.build.images))
     .on("end", browsersync.reload);
});
gulp.task('fonts', ()=>{
    return src(path.src.fonts, {base: srcPath + "assets/fonts/"})
    .pipe(dest(path.build.fonts))
    .on("end", browsersync.reload);
});
gulp.task('video', ()=> {
    return src(path.src.video, {base: srcPath + "assets/video/"})
    .pipe(dest(path.build.video))
    .on("end", browsersync.reload);
});
gulp.task("watch", () => {
    browsersync.init({
		server: {
     baseDir: "./dist/",
    serveStaticOptions: {
      extensions: ["html"]
    } 
  },
		port: 4000,
		notify: true
    });
    
    gulp.watch([path.watch.html], gulp.parallel("html"));
    gulp.watch([path.watch.css], gulp.parallel("css"));
    gulp.watch([path.watch.js], gulp.parallel("js"));
    gulp.watch([path.watch.images], gulp.parallel("img"));
    gulp.watch([path.watch.fonts], gulp.parallel("fonts"));
    gulp.watch([path.watch.video], gulp.parallel("video"));
});


gulp.task("build", gulp.parallel("html", "css", "js", "img", "fonts", "video"));

// gulp.task("build-prod-js", () => {
//     return gulp.src("./src/assets/js/main.js")
//                 .pipe(webpack({
//                     mode: 'production',
//                     output: {
//                         filename: 'script.js'
//                     },
//                     module: {
//                         rules: [
//                           {
//                             test: /\.m?js$/,
//                             exclude: /(node_modules|bower_components)/,
//                             use: {
//                               loader: 'babel-loader',
//                               options: {
//                                 presets: [['@babel/preset-env', {
//                                     corejs: 3,
//                                     useBuiltIns: "usage"
//                                 }]]
//                               }
//                             }
//                           }
//                         ]
//                       }
//                 }))
//                 .pipe(gulp.dest(dist));
// });
gulp.task("clean", ()=> {
    return del(path.clean);
});
gulp.task("default", gulp.parallel("watch", "build"));