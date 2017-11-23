import gulp from 'gulp'
import gulpSequence from 'gulp-sequence'

gulp.task('build', gulpSequence(
  'clean', [
    'manifest',
    'jslib',
    'scripts',
    'csslib',
    'styles',
    'pages',
    'locales',
    'images',
    'fonts',
    'chromereload'
  ]
))