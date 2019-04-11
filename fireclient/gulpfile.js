var gulp = require('gulp');
var less = require('gulp-less');
//var path = require('path');
var clean = require('gulp-clean');
var rev = require('gulp-rev');
var revReplace = require('gulp-rev-replace');
var useref = require('gulp-useref');
var filter = require('gulp-filter');
var uglify = require('gulp-uglify');
var csso = require('gulp-csso');
var flatten = require('gulp-flatten');
var basename = require('gulp-css-url-basename');
var urlAdjuster = require('gulp-css-url-adjuster');
var cleanDest = require('gulp-clean-dest');
var templateCache = require('gulp-angular-templatecache');
var watch = require('gulp-watch');
var gutil = require('gulp-util');
var gulpSequence = require('gulp-sequence');


var file = require('gulp-file');


// gulp.task('watch-less', () => gulp.watch('./sources/main-less/**/*.less', ['less']));
gulp.task('watch-less', function () {
    gulp.watch('./sources/main_less/**/*.less', ['less']);
});

gulp.task('watch', function () {
    gulp.watch('sources/**/*.html', ['getTemplates']);
    // Other watchers
});

gulp.task('build-it-all (ASSETS FREE)', ["build-htmls", "get-print", "get-emit-simulate", 'get-user-roles', 'get-beep', 'buildCreationDate-Client', 'copy-chs']);

gulp.task('build-it-all', ["build-htmls", "get-print", "get-emit-simulate", 'get-user-roles', 'get-fonts', 'get-png', 'get-beep', 'CopyConfig', 'buildCreationDate-Client']);

gulp.task('less', function () {
    return gulp.src(['./sources/main_less/main.less', './sources/main_less/form6.less'])
        .pipe(less())
        .pipe(gulp.dest('./sources/css'))
});

gulp.task('getTemplates', function () {
    return gulp.src('sources/**/*.html')
        .pipe(templateCache('myTemplates.js', {
            module: 'myTemplates', standalone: true, moduleSystem: 'IIFE', transformUrl: function (url) {
                return 'sources/' + url;
            }
        }))
        .pipe(gulp.dest('sources'));
});

gulp.task('start', gulpSequence(['less', 'getTemplates'], ['watch', 'watch-less']));

gulp.task('clean', function () {
    return gulp.src('build/', {read: false})
        .pipe(clean());
});


gulp.task("build-htmls", ['getTemplates'], function () {
    var jsFilter = filter("**/*.js", {restore: true});
    var cssFilter = filter("**/*.css", {restore: true});

    var userefAssets = useref.assets();
    return gulp.src(["index.html", "map.html"])
        .pipe(cleanDest('build/'))
        .pipe(userefAssets)      // Concatenate with gulp-useref
        // .pipe(jsFilter)
        /*
         .pipe(uglify().on('error',gutil.log))             // Minify any javascript sources
         .pipe(jsFilter.restore)
         */
        .pipe(cssFilter)
        .pipe(basename())
        .pipe(urlAdjuster({
            prepend: 'assets/'
        }))
        .pipe(csso())               // Minify any CSS sources
        .pipe(cssFilter.restore)
        .pipe(rev())                // Rename the concatenated files
        .pipe(userefAssets.restore())
        .pipe(useref())
        .pipe(revReplace())         // Substitute in new filenames
        .pipe(gulp.dest('build/'));
});
gulp.task('get-htmls', ['get-print'], function () {
    return gulp.src('sources/**/*.html', '!sources/print/print.*')
        .pipe(gulp.dest('build/sources/'));
});
gulp.task('get-print', function () {
    return gulp.src('sources/print/*.*')
        .pipe(gulp.dest('build/sources/print'));
});

gulp.task('get-emit-simulate', function () {
    return gulp.src('sources/simulateEmit/*.*')
        .pipe(gulp.dest('build/sources/simulateEmit'));
});
gulp.task('get-user-roles', function () {
    return gulp.src('sources/userRoles/*.*')
        .pipe(gulp.dest('build/sources/userRoles'));
});
gulp.task('copy-chs', function () {
    return gulp.src('sources/chs/*.*')
        .pipe(gulp.dest('build/sources/chs'));
});

gulp.task('get-fonts', ['clean'], function () {
    return gulp.src(["**/*.woff", "**/*.woff2", "**/*.eot", "**/*.ttf", "**/*.svg"])
        .pipe(flatten())
        .pipe(gulp.dest('build/css/assets'));
});
gulp.task('get-png', ['clean'], function () {
    return gulp.src("**/*.png")
        .pipe(flatten())
        .pipe(gulp.dest('build/css/assets'));
});
gulp.task('get-beep', function () {
    return gulp.src("./beep.mp3")
        .pipe(gulp.dest('build/'));
});

gulp.task('CopyConfig', ['clean'], function () {
    /*
     return gulp.src("./config.js")
     .pipe(gulp.dest('build/'));
     */
});

gulp.task('get-Ubuntu-fonts', function () {
    return gulp.src("bower_components/ubuntu-fontface/fonts/*")
        .pipe(gulp.dest('sources/fonts/ubuntu/'))
});

var bDate = null;

gulp.task('buildCreationDate-Client', ['buildCreationDate-Server'], function () {
    var str = '", "short":"' + (("" + (new Date(bDate)).toISOString()).replace(/^([^T]+)T(.+)$/, '$1').replace(/^(\d+)-(\d+)-(\d+)$/, '$3.$2.$1')) + ' ' + bDate.toLocaleTimeString() + '"}';
    str = 'var _buildCreationDate = {"lastBuild":"' + bDate.getTime() + str;
    return file('buildCreationDate.js', str)
        .pipe(gulp.dest('./sources/js'));
});

gulp.task('buildCreationDate-Server', function () {
    bDate = new Date();
    var servStr = 'buildCreationDate = ' + bDate.getTime();

    return file('application.conf', servStr, {src: true})
        .pipe(gulp.dest('./build'));
});


// gulp.task('build-it-all', ["build-htmls", 'get-fonts', 'get-png', 'get-beep', 'CopyConfig']);
// gulp.task('build-it-all', ['buildCreationDate', "build-htmls", "get-print", "get-emit-simulate", 'get-user-roles', 'get-fonts', 'get-png', 'get-beep', 'CopyConfig']);


//gulp.task('rev-html-templates', function () {
//    return gulp.src(['./build/sources/**/*.html'])
//        .pipe(gulp.dest('build/sources/'))
//        .pipe(rev())
//        .pipe(gulp.dest('build/sources/'))
//        .pipe(rev.manifest())
//        .pipe(gulp.dest('build/sources/'));
//});

//gulp.task("revreplace-html-templates", [], function () {
//    var manifest = gulp.src("./build/sources/rev-manifest.json");
//
//    return gulp.src(["./build/sources/app.js"])
//        .pipe(revReplace({manifest: manifest}))
//        .pipe(gulp.dest("./build/sources/"));
//});
//
//gulp.task("copy-root-to-build", function () {
//    return gulp.src(["./*.html", "./beep.mp3"])
//        .pipe(gulp.dest("./build/"))
//});
//
//gulp.task("copy-sources-to-build", function () {
//    return gulp.src(["./sources/**/*.*"])
//        .pipe(gulp.dest("./build/sources"))
//});

//gulp.task("copy-bower-components-to-build", function () {
//    return gulp.src(["./bower_components/**/*.*"])
//        .pipe(gulp.dest("./build/bower_components/"))
//});

//gulp.task("copy-map-to-build", function () {
//    return gulp.src(["./sources/map/map.js"])
//        .pipe(gulp.dest("./build/sources/map/"))
//});
//
//gulp.task("copy-fonts-to-build", function () {
//    return gulp.src(["./sources/fonts/*.*"])
//        .pipe(gulp.dest("./build/sources/fonts/"))
//});
////
//gulp.task("copy-fonts-to-build", function () {
//    return gulp.src(["./sources/fonts/*.*"])
//        .pipe(gulp.dest("./build/sources/fonts/"))
//});


gulp.task('default', ['build-it-all'], function () {

});
