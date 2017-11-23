import gulp from 'gulp'
import gulpif from 'gulp-if'
import livereload from 'gulp-livereload'
import args from './lib/args'

const ENV = args.production ? 'production' : 'development'

gulp.task('csslib', (cb) => {
  return gulp.src('app/styles/lib/*.css')
    .pipe(gulp.dest(`dist/${args.vendor}/styles/lib`))
    .pipe(gulpif(args.watch, livereload()))

})