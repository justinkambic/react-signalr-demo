/* global require */

const browserify = require('browserify');
const collect = require('gulp-rev-collector');
const del = require('del');
const gulp = require('gulp');
const babel = require('gulp-babel');
const gulpIf = require('gulp-if');
const rename = require('gulp-rename');
const rev = require('gulp-rev');
const buffer = require('vinyl-buffer');
const sass = require('gulp-sass');
const source = require('vinyl-source-stream');
const sourcemaps = require('gulp-sourcemaps');
const uglify = require('gulp-uglify');

const argv = require('yargs').argv;

const envify = require('loose-envify/custom');

gulp.task('clean-old', () => {
    return del([
        './dist/**/*',
        './lib/**/*'
    ]);
});

gulp.task('babel', [ 'clean-old' ], () => {
    return gulp.src('./src/**/*.js')
        .pipe(babel({
            presets: [ 'es2015', 'react' ]
        }))
        .pipe(gulp.dest('./lib'));
});

gulp.task('build', [ 'clean-old', 'babel' ], () => {
    const envifyOpts = argv.debug ? { _: 'purge', NODE_ENV: 'debug' } : { _: 'purge', NODE_ENV: 'production' };

    return browserify('./main.js', { debug: true }) // specify entry point
        .transform('babelify', {
           // presets: [ 'es2015', 'react' ]
        }) // main.js is not transpiled in previous step, this ensures browserify can handle it
        .transform(envify(envifyOpts), {
            global: true
        }) // redux screams if you don't envify the code when you're minifying, so it is being set to production mode. The code can be rebuilt in develop mode if a problem is encountered that requires more robust error output
        .bundle() // combine these JS files
        .pipe(source('./bundle.js')) // create a vinyl (virtual) file for simpler stream manipulation
        .pipe(buffer()) // create a stream from the vinyl file
        .pipe(gulp.dest('./dist')) // generate bundle.js
        .pipe(rename('bundle.min.js')) // rename the vinyl file
        .pipe(sourcemaps.init({ loadMaps: true })) // initialize a source map from bundle.js
        .pipe(gulpIf(!argv.debug, uglify())) // minify bundle.js, if the build is production
        .pipe(sourcemaps.write('.')) // persist the generated source map
        .pipe(gulp.dest('./dist')); // persist bundle.min.js
});

gulp.task('build-css', [ 'clean-old', 'babel', 'build' ], () => {
    const sassOpts = argv.debug ? { outputStyle: 'expanded' } : { outputStyle: 'compressed' };

    return gulp.src('./scss/**/*.scss') // target files
            .pipe(sourcemaps.init()) // prepare to write sourcemap
            .pipe(sass(sassOpts)) // convert templates to CSS
            .pipe(sourcemaps.write('./')) // generate sourcemap
            .pipe(gulp.dest('./dist/css/')); // write files
});

gulp.task('cachebust-js', [ 'clean-old', 'babel', 'build', 'build-css' ], () => {
    return gulp.src('./dist/bundle.min.js', { })
        .pipe(rev())
        .pipe(gulp.dest('./dist'))
        .pipe(rev.manifest())
        .pipe(gulp.dest('./rev/js'));
});

gulp.task('cachebust-css', [
    'clean-old',
    'babel',
    'build',
    'build-css',
    'cachebust-js'
], () => {
    return gulp.src('./dist/css/main.css', { }) // target file
        .pipe(rev()) // generate hash
        .pipe(gulp.dest('./dist/css/')) // output new file
        .pipe(rev.manifest()) // generate manifest
        .pipe(gulp.dest('./rev/css')); // output manifest
});

gulp.task('revise', [ 'clean-old', 'babel', 'build', 'build-css', 'cachebust-js', 'cachebust-css' ], () => {
    return gulp.src([ './rev/**/*.json', '../Views/Home/Templates/Tree.cshtml' ])
        .pipe(collect({
            replaceReved: true,
            replaceInExtensions: [ 'cshtml' ]
        }))
        .pipe(gulp.dest('../Views/Home'));
});

gulp.task('clean', [ 'clean-old', 'babel', 'build', 'build-css', 'cachebust-js', 'cachebust-css', 'revise' ], () => {
    return del([
        './dist/bundle.js',
        './dist/bundle.min.js',
        './dist/css/main.css'
    ]);
});

gulp.task('default', [ 'clean-old', 'babel', 'build', 'build-css', 'cachebust-js', 'cachebust-css', 'revise' ]);

gulp.task('watch', () => {
    gulp.watch([
        './src/**/*',
        './main.js'
    ], [ 'default' ]);
});