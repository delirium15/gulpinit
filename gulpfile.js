'use strict';

var gulp = require('gulp'),
	watch = require('gulp-watch'),
	sass = require('gulp-sass'),
	cleanCSS = require('gulp-clean-css'),		// минификация css
	concatCss = require('gulp-concat-css'),
	htmlmin = require('gulp-htmlmin'),			// минификация html
	browserSync = require('browser-sync').create();

var path = {
	dest: {
		html: 'out/',
		js: 'out/js/',
		css: 'out/css/',
		//img: 'out/img/'
	},
	src: {
		html: 'app/*.html',
		js: 'app/js/app.js',
		customStyle: 'app/scss/app.scss',
		materializeStyle: 'app/scss/materialize.scss',
		//img: 'app/img/*'
	},
	watch: {
		html: 'app/*.html',
		js: 'app/js/*.js',
		css: 'app/scss/*.scss'
	},
	//clean: './dist'
};


gulp.task('build-html', function () {
  return gulp.src(path.src.html)
    .pipe(htmlmin({ collapseWhitespace: true }))
	.pipe(gulp.dest(path.dest.html))
	.pipe(browserSync.stream());
});

gulp.task('build-materialize-css', function () {
  return gulp.src(path.src.materializeStyle)
    .pipe(sass().on('error', sass.logError))	// компиляция sass в css
    .pipe(concatCss("materialize.min.css"))		// конкатенация css в один файл
    .pipe(cleanCSS({compatibility: 'ie8'}))		// минификация css
    .pipe(gulp.dest(path.dest.css))				// сохранение минифицированных css
});

gulp.task('build-custom-css', function () {
  return gulp.src(path.src.customStyle)
    .pipe(sass().on('error', sass.logError))	// компиляция sass в css
    .pipe(concatCss("app.min.css"))				// конкатенация css в один файл
    //.pipe(cleanCSS({compatibility: 'ie8'}))		// минификация css
    .pipe(gulp.dest(path.dest.css))				// сохранение минифицированных css
    .pipe(browserSync.stream());
});

gulp.task('build-js', function () {
  return gulp.src(path.src.js)
    .pipe(gulp.dest(path.dest.js))
    .pipe(browserSync.stream());
});

gulp.task('serve', [
		'build-materialize-css', 
		'build-custom-css', 
		'build-js', 
		'build-html'
	], function() {
    browserSync.init({
        server: "./out"
    });
    gulp.watch(path.watch.css, ['build-materialize-css', 'build-custom-css']);
    gulp.watch(path.watch.js, ['build-js']);
    gulp.watch(path.watch.html, ['build-html']).on('change', browserSync.reload);
});

gulp.task('default', ['serve']);