import gulp from 'gulp'
import gulpif from 'gulp-if'
import livereload from 'gulp-livereload'
import args from './lib/args'

const ENV = args.production ? 'production' : 'development'

gulp.task('jslib', (cb) => {
  return gulp.src('app/scripts/lib/*.js')
    .pipe(gulp.dest(`dist/${args.vendor}/scripts/lib`))
    .pipe(gulpif(args.watch, livereload()))
})