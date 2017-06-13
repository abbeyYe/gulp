//gulpfile.js 示例文件

//导入你所需要用的工具包 require('node_modules里对应模块')
var gulp = require('gulp');
var sass = require('gulp-sass'); // sass编译
var browserSync = require('browser-sync').create(); //自动刷新页面
var reload = browserSync.reload;
var htmlmin = require('gulp-htmlmin'); //html压缩
var uglify = require('gulp-uglify'); //js压缩
var cssmin = require('gulp-minify-css'); //css压缩
var imagemin = require('gulp-imagemin'); //img压缩
var pngquant = require('imagemin-pngquant'); //img深度压缩
var cache = require('gulp-cache'); //只压缩修改的图片
var autoprefixer = require('gulp-autoprefixer'); //自动处理浏览器前缀
var fileinclude = require('gulp-file-include'); //页面复用
var spritesmith = require('gulp.spritesmith'); //雪碧图
var replace = require('gulp-replace'); //批量替换字符串，并且支持使用正则替换

// 静态服务器 + 监听文件
gulp.task('watch', ['sass', 'include'], function() {
    browserSync.init({
        server: "./src",
        /*server: {
            baseDir: "./src",
            index: 'html/index.html'
        }*/
        // proxy: "http://123.57.29.208:8042"
    });
    gulp.watch("src/scss/*.scss", ['sass']);
    gulp.watch("src/view/*.html", ['include']);
    gulp.watch("src/*.html", ['include']);
    gulp.watch("src/js/*.js").on('change', reload);
    gulp.watch("src/img/*.{png,jpg,gif,ico}").on('change', reload);
});

// scss编译后的css将注入到浏览器里实现更新
gulp.task('sass', function() {
    return gulp.src("src/scss/*.scss")
        //自动处理浏览器前缀
        .pipe(autoprefixer({
            browsers: ['last 2 versions', 'Android >= 4.0', 'Firefox >= 20', 'last 1 Chrome versions'], //需要兼容的浏览器
            cascade: true, //是否美化属性值 默认：true 像这样：
            //-webkit-transform: rotate(45deg);
            //        transform: rotate(45deg);
            remove: true //是否去掉不必要的前缀 默认：true 
        }))
        .pipe(sass())
        .pipe(gulp.dest("src/css"))
        .pipe(reload({ stream: true }));
});

// 压缩html文件
gulp.task('html', function() {
    var options = {
        removeComments: true, //清除HTML注释
        collapseWhitespace: true, //压缩HTML
        collapseBooleanAttributes: false, //省略布尔属性的值 <input checked="true"/> ==> <input />
        removeEmptyAttributes: true, //删除所有空格作属性值 <input id="" /> ==> <input />
        removeScriptTypeAttributes: true, //删除<script>的type="text/javascript"
        removeStyleLinkTypeAttributes: true, //删除<style>和<link>的type="text/css"
        minifyJS: true, //压缩页面JS
        minifyCSS: true //压缩页面CSS
    };
    gulp.src('src/html/*.html')
        .pipe(htmlmin(options))
        .pipe(gulp.dest('dist/html'));
});

// 压缩js文件
gulp.task('jsmin', function() {
    // gulp.src('src/js/index.js') 压缩单个文件
    // gulp.src(['src/js/index.js','src/js/detail.js']) 多个文件以数组形式传入
    // gulp.src(['src/js/*.js', '!src/js/**/{test1,test2}.js'])  压缩js文件夹下的所有js文件  除了test1.js和test2.js（**匹配src/js的0个或多个子文件夹）
    gulp.src('src/js/*.js') //压缩js文件夹下的所有js文件
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'));
});

// 压缩css文件
gulp.task('css', function() {
    gulp.src('src/css/*.css')
        // .pipe(cssmin()) 基本使用
        .pipe(cssmin({
            advanced: false, //类型：Boolean 默认：true [是否开启高级优化（合并选择器等）]
            compatibility: 'ie7', //保留ie7及以下兼容写法 类型：String 默认：''or'*' [启用兼容模式； 'ie7'：IE7兼容模式，'ie8'：IE8兼容模式，'*'：IE9+兼容模式]
            keepBreaks: false, //类型：Boolean 默认：false [是否保留换行]
            keepSpecialComments: '*'
                //保留所有特殊前缀 当你用autoprefixer生成的浏览器前缀，如果不加这个参数，有可能将会删除你的部分前缀
        }))
        .pipe(gulp.dest('dist/css'));
});

// 雪碧图
gulp.task('sprite', function() {
    gulp.src('src/img/*.png')
        .pipe(spritesmith({
            imgName: 'sprite.png',
            cssName: 'css/sprite.css',
            padding: 5,
            algorithm: 'binary-tree'
        }))
        .pipe(gulp.dest('src/img'))
})

// 压缩雪碧图的css文件
gulp.task('spriteCss', function() {
    gulp.src('src/img/css/*.css')
        // .pipe(cssmin()) 基本使用
        .pipe(cssmin({
            advanced: false, //类型：Boolean 默认：true [是否开启高级优化（合并选择器等）]
            compatibility: 'ie7', //保留ie7及以下兼容写法 类型：String 默认：''or'*' [启用兼容模式； 'ie7'：IE7兼容模式，'ie8'：IE8兼容模式，'*'：IE9+兼容模式]
            keepBreaks: false, //类型：Boolean 默认：false [是否保留换行]
            keepSpecialComments: '*'
                //保留所有特殊前缀 当你用autoprefixer生成的浏览器前缀，如果不加这个参数，有可能将会删除你的部分前缀
        }))
        .pipe(gulp.dest('dist/img/css'));
});

// 压缩img
gulp.task('images', function() {
    gulp.src('src/img/*.{png,jpg,gif,ico}')
        // .pipe(imagemin()) 基本使用
        .pipe(cache(imagemin({ //加入cache 只压缩修改的图片
            optimizationLevel: 5, //类型：Number  默认：3  取值范围：0-7（优化等级）
            progressive: true, //类型：Boolean 默认：false 无损压缩jpg图片
            interlaced: true, //类型：Boolean 默认：false 隔行扫描gif进行渲染
            multipass: true, //类型：Boolean 默认：false 多次优化svg直到完全优化

            // 深度压缩
            svgoPlugins: [{ removeViewBox: false }], //不要移除svg的viewbox属性
            use: [pngquant()] //使用pngquant深度压缩png图片的imagemin插件
        })))
        .pipe(gulp.dest('dist/img'));
});

// 页面复用
gulp.task('include', function() {
    // 适配html中所有html，排除html下的include文件夹中html
    gulp.src(['src/view/*.html', '!src/view/include/**.html'])
        .pipe(fileinclude({
            prefix: '@@',
            basepath: '@file'
        }))
        .pipe(gulp.dest('src/html'))
        .pipe(reload({ stream: true }));
});

// 修改路径
gulp.task('replace', function() {
    gulp.src('src/view/*.html')
        .pipe(replace('../img/', '//static.yidao.info/static/images/'))
        .pipe(gulp.dest('src/html/*.html'));
});

// 默认任务
gulp.task('default', ['html', 'jsmin', 'css', 'images', 'spriteCss', 'sprite']);