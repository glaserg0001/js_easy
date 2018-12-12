var gulp					= require('gulp'),
		src						= require('gulp'),
		sass					= require('gulp-sass'),
		browserSync		= require('browser-sync'),
		del						= require('del'),
		sourcemaps		= require('gulp-sourcemaps'),
		eslint 				= require('gulp-eslint');



var app = './app';

var sassFun = function(){
	return gulp.src(app + '/sass/*.sass')
	.pipe(sourcemaps.init())
	.pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
	.pipe(sourcemaps.write('../maps', {addComment: false}))
	.pipe(gulp.dest(app + '/css'))
	.pipe(browserSync.reload({stream: true}))
}

gulp.task('aa', function () {
    return gulp.src([app + '/js/**/*.js'])
        // eslint() attaches the lint output to the "eslint" property
        // of the file object so it can be used by other modules.
        .pipe(eslint({
        	rules: {
        		"indent": [2,2],
        		"camelcase": 1,
        		"comma-dangle": 2,
        		"quotes": 0
        	}
        }))
        // eslint.format() outputs the lint results to the console.
        // Alternatively use eslint.formatEach() (see Docs).
        .pipe(eslint.format())
        // To have the process exit with an error code (1) on
        // lint error, return the stream and pipe to failAfterError last.
        .pipe(eslint.failAfterError());
});

gulp.task('sass', sassFun);

gulp.task('browser-sync', function() {
	browserSync({
		server: {
			baseDir: './app'
		},
		notify: false,
		// ghostMode: false,
	});
});

gulp.task('watch', ['browser-sync'], function() {
	gulp.watch(app + '/sass/*.sass', ['sass']);


	// gulp.watch(app + '/html/**/*.html', ['html-include']);

	gulp.watch(app + '/**/*.html', browserSync.reload);
	gulp.watch(app + '/js/**/*.js', browserSync.reload);
});

gulp.task('clean', function() {
	return del.sync('dist');
});

gulp.task('build', ['clean', 'sass'], function() {

	var buildCss = gulp.src([
		app + '/css/*.css'
		])
	.pipe(gulp.dest('dist/css'))

	var buildFonts = gulp.src(app + '/fonts/**/*')
	.pipe(gulp.dest('dist/fonts'))

	var buildJs = gulp.src(app + '/js/**/*')
	.pipe(gulp.dest('dist/js'))

	var buildHtml = gulp.src(app + '/*.html')
	.pipe(gulp.dest('dist'));

});

gulp.task('default', ['watch', 'aa']);
