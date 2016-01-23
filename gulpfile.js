var gulp = require('gulp');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var uglifycss = require('gulp-uglifycss');
var clean = require('gulp-clean');
var path = {
    'assets': "./assets",
    'bower': "./bower_components",
    'public': "./public"
};

gulp.task('clean', function () {
    gulp.src(path.public + '/css/**/*.css', {read: false})
        .pipe(clean());
    return gulp.src(path.public + '/js/**/*.js', {read: false})
        .pipe(clean());
});
gulp.task('copyFontFiles', function () {
    gulp.src([
        path.bower + '/font-awesome/fonts/*'
    ]).pipe(gulp.dest(path.public + '/fonts'));
    return gulp.src([
        path.bower + '/bootstrap-sass/assets/fonts/bootstrap/*'
    ]).pipe(gulp.dest(path.public + '/fonts/bootstrap'));
});
gulp.task('styles', ['copyFontFiles'], function () {
    return gulp.src([
            path.assets + '/styles/app.scss'
        ])
        .pipe(sass({
            includePaths: [
                path.bower + '/bootstrap-sass/assets/stylesheets',
                path.bower + '/font-awesome/scss'
            ]
        }))
        .pipe(concat('app.css'))
        .pipe(uglifycss())
        .pipe(gulp.dest(path.public + '/css'));
});
gulp.task('scripts', function () {

    //vendor scripts
    gulp.src([
            path.bower + '/jquery/dist/jquery.js',
            path.bower + '/bootstrap-sass/assets/javascripts/bootstrap.js',
            path.bower + '/requirejs/require.js',
            path.bower + '/json2/json2.js',
            path.bower + '/underscore/underscore.js',
            path.bower + '/backbone/backbone.js',
            path.bower + '/backbone.babysitter/lib/backbone.babysitter.js',
            path.bower + '/backbone.marionette/lib/backbone.marionette.js',
            path.bower + '/backbone.wreqr/lib/backbone.wreqr.js'
        ])
        .pipe(uglify())
        .pipe(gulp.dest(path.public + '/js/vendor'));

    //assets scripts
    return gulp.src(path.assets + '/scripts/**/*.js').pipe(gulp.dest(path.public + '/js'));

});
gulp.task('watch', function () {
    gulp.watch(path.assets + '/styles/**/*.scss', ['styles']);
    gulp.watch(path.assets + '/scripts/**/*.js', ['scripts']);
});
gulp.task('default', ['clean', 'styles', 'scripts']);