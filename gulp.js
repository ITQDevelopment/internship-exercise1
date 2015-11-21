"use strict";

var
    gulp = require('gulp'),
    dest = require('gulp-dest'),
    autoprefixer = require('gulp-autoprefixer'),
    uncss = require('gulp-uncss'),
    uglify = require('gulp-uglify'),
    minifyCss = require('gulp-minify-css'),
    minifyHTML = require('gulp-minify-html');

// operations with CSS
gulp.task('css', function () {
    return gulp.src('app/css/*.css')

        .pipe(autoprefixer({   // add prefixes for cross-browsering
            browsers: ['last 15 versions'],
            cascade: false
        }))
        .pipe(uncss({
            html: ['app/*.html'] // check and than delete unused (at this page) css properties
        }))
        .pipe(minifyCss({compatibility: 'ie8'})) // minfifying of css files
        .pipe(gulp.dest('dist/css')); // put them all into the dist/css folder
});

// operations with HTML
gulp.task('html', function () {
    var opts = {
        conditionals: true,
        spare: true
    };

    return gulp.src('app/*.html')
        .pipe(minifyHTML(opts)) // minify html
        .pipe(gulp.dest('dist')); // put them all into the dist folder
});

// operations with JavaScript
gulp.task('js', function () {
    return gulp.src('app/js/*.js')
        .pipe(uglify()) // minifying of js files
        .pipe(gulp.dest('dist/js')); // put them all into the dist/js folder
});

gulp.task('watch-css', function () {
    return gulp.watch("app/css/*.css", ['css']); // watch for specified location
});

gulp.task('watch-html', function () {
    return gulp.watch("app/*.html", ['html']);
});

gulp.task('watch-js', function () {
     return gulp.watch("app/js/*.js", ['js']);
});


gulp.task('default', ['css', 'html', 'js', 'watch-css', 'watch-html', 'watch-js']); // collect them all together within default task