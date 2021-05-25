var gulp = require("gulp");
var fileinclude = require("gulp-file-include");
var htmlmin = require("gulp-htmlmin");
var babel = require("gulp-babel");
var uglify = require("gulp-uglify");
var sass = require("gulp-sass");
sass.compiler = require('sass');

var connect = require("gulp-connect");
var del = require("del");
var cssmin = require("gulp-cssmin")


gulp.task("connect", function(done) {
    // 把服务器的根目录放在 dist文件夹之中; 
    // - 因为 src 之中的代码很多是不可查看的; 
    connect.server({
        // 根目录配置 
        root: "./dist",
        // 设置端口  不要把端口号设置成两位数的端口号; 
        port: 3000,
        // 自动刷新功能 
        livereload: true
    });

    done();
});

// 添加html处理指令 : 

gulp.task("html", function(done) {
    gulp.src(["./src/*.html"])
        .pipe(fileinclude({
            prefix: "@@",
            basepath: "@file"
        }))
        .pipe(gulp.dest("./dist"))
        // 自动刷新功能的调用; 
        .pipe(connect.reload());

    done();
});


gulp.task("html-min", function(done) {
    gulp.src(["./src/*.html"])
        // html拆分合并插件
        .pipe(fileinclude({
            prefix: "@@",
            basepath: "@file"
        }))
        // html压缩插件 
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(gulp.dest("./dist"));

    done();
});


// js处理指令 

gulp.task("javascript", function(done) {
    gulp.src(["./src/javascripts/*.js"])
        // 调用babel的时候必须传递一个参数; 
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(gulp.dest("./dist/javascripts"))
        .pipe(connect.reload());


    done();
});

// gulpjs代码压缩插件;  gulp-uglify 
// - 不建议使用; 
// - 如果后期代码无法转存，记得删除这个插件就好了; 

gulp.task("javascript-min", function(done) {
    gulp.src(["./src/javascripts/*.js"])
        // 调用babel的时候必须传递一个参数; 
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(uglify())
        .pipe(gulp.dest("./dist/javascripts"))

    done();
});

// sass转换成 css ;

gulp.task("scss", function(done) {

    gulp.src(["./src/scss/*.scss"])
        .pipe(sass().on("error", sass.logError))
        .pipe(gulp.dest("./dist/css"))
        .pipe(connect.reload());

    done();
});


gulp.task("scss-min", function(done) {

    gulp.src(["./src/scss/*.scss"])
        .pipe(sass().on("error", sass.logError))
        .pipe(cssmin())
        .pipe(gulp.dest("./dist/css"))
        .pipe(connect.reload());

    done();
});


gulp.task("libs", function(done) {
    gulp.src(["./src/iconfont/**/*"])
        .pipe(gulp.dest("./dist/iconfont/"));
    gulp.src(["./src/img/**/*"]).pipe(gulp.dest("./dist/img/"));

    gulp.src(["./src/data/**/*"]).pipe(gulp.dest("./dist/data/"));

    done();
});

// - 小任务 : 给所有文件添加对应指令的监听; 

gulp.task("watch", function(done) {

    gulp.watch(["./src/*.html", "./src/components/*.html"], gulp.series("html"));
    gulp.watch(["./src/javascripts/*.js"], gulp.series("javascript"));
    gulp.watch(["./src/scss/*.scss"], gulp.series("scss"));
    gulp.watch(["./src/iconfont/**/*", "./src/img/**/*", "./src/javascripts/libs/*.js"], gulp.series("libs"));

    done();
});


gulp.task("del", function(done) {
    del("./dist/*");
    done();
});

// 因为我们在cmd之中只能开启 watch 或者 connect 两者之中的一个任务 , 一次我们要写一个队列让两个任务同时执行; 

var dev_task_list = gulp.series("del", "html", "scss", "javascript", "libs", gulp.parallel("watch", "connect"));
gulp.task("default", dev_task_list);

var build_task_list = gulp.series("del", "html-min", "javascript-min", "scss-min", "libs");
gulp.task("build", build_task_list)