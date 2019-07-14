var gulp = require('gulp')
gulp.task('copy', () => {
    return gulp.src(['src/**/*.jsonc', 'src/**/*.json', '!*.ts'])
        .pipe(gulp.dest('dist'))
})