var config = require('./gulp.config')();

var gulp = require('gulp'),
	angularFileSort = require('gulp-angular-filesort'),
	concat = require('gulp-concat'),
	inject = require('gulp-inject'),
	ngAnnotate = require('gulp-ng-annotate'),
	ngHtml2js = require('gulp-ng-html2js'),
	sass = require('gulp-sass'),
	replace = require('gulp-replace'),
	autoprefixer = require('gulp-autoprefixer'),
	del = require('del'),
	minify = require('gulp-minify'),
	eventStream = require('event-stream'),
	mainBowerFiles = require('main-bower-files'),
	watch = require('gulp-watch'),
	rsync = require('gulp-rsync'),
	webserver = require('gulp-webserver'),
  filter = require('gulp-filter'),
  uglify = require('gulp-uglify');

gulp.task('clean-dev', cleanDev);
gulp.task('watch', startWatch);
gulp.task('compile', compile);
gulp.task('dev', ['clean-dev', 'watch'], compile);


gulp.task('default', ['dev']);
gulp.task('server', startWebserver);


function deploy() {
	return gulp.src('dev/**')
		.pipe(rsync({
			root: 'dev',
			hostname: 'deploy@46.101.131.7',
			password: 'zF61!Nm46',
			destination: '/home/deploy/ui/'
		}));
}

function startWebserver() {
  return gulp.src('dev')
    .pipe(webserver({
      open: true,
      livereload: true,
      fallback: 'index.html'
    }));
}


function cleanDev() {
	return del(config.dev.index);
}

function startWatch() {
	gulp.watch([
		config.sources.scripts,
		config.sources.stylesheets,
		config.sources.templates,
		config.sources.index], ['compile']);
}

function compile() {
	return eventStream.merge(
		buildIndex(),
		buildImages(),
		buildFonts(),
		buildLib()
	);
}

function buildIndex() {
	return gulp.src(config.sources.index)
		.pipe(inject(buildScripts(), {relative: true}))
		.pipe(inject(buildTemplates(), {relative: true, name: 'templates'}))
		.pipe(inject(buildVendorScripts(), {relative: true, name: 'vendor'}))
		.pipe(inject(buildVendorMap(), {relative: true, name: 'vendor'}))
		.pipe(inject(buildVendorStyle(), {relative: true, name: 'vendor'}))
		.pipe(inject(buildStyles(), {relative: true}))
		.pipe(replace('../dev', ''))
		.pipe(gulp.dest(config.dev.index));
}

function buildImages() {
	return gulp.src(config.sources.images)
		.pipe(gulp.dest(config.dev.images));
}

function buildLib() {
	return gulp.src(config.sources.lib)
		//.pipe(uglify())
		.pipe(gulp.dest(config.dev.lib));
}

function buildFonts() {
	return gulp.src(config.sources.fonts)
		.pipe(gulp.dest(config.dev.fonts));
}

function buildScripts() {
	return gulp.src(config.sources.scripts)
		.pipe(angularFileSort())
		.pipe(ngAnnotate())
		//.pipe(uglify())
		//.pipe(concat('script.js'))
		.pipe(gulp.dest(config.dev.scripts));
}

function buildTemplates() {
	return gulp.src(config.sources.templates)
		.pipe(ngHtml2js({moduleName: 'templates'}))
		//.pipe(uglify())
		.pipe(concat('templates.js'))
		.pipe(gulp.dest(config.dev.templates));
}

function buildVendorScripts() {
	return gulp.src(mainBowerFiles())
		.pipe(filter('**/*.js'))
		//.pipe(concat('vendor.js'))
		.pipe(gulp.dest(config.dev.vendors));
}

function buildVendorMap(){
	return gulp.src(mainBowerFiles())
		.pipe(filter('**/*.js.map'))
		.pipe(gulp.dest(config.dev.vendors));
}

function buildVendorStyle() {
	return gulp.src(mainBowerFiles())
		.pipe(filter('**/*.css'))
	    //.pipe(concat('vendor.css'))
		.pipe(gulp.dest(config.dev.vendors));
}

function buildStyles() {
	return gulp.src(config.sources.stylesheets)
		.pipe(sass())
		.pipe(autoprefixer())
		.pipe(concat('app.css'))
		.pipe(gulp.dest(config.dev.stylesheets));
}
