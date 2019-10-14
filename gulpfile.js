const gulp = require('gulp')
const typedoc = require('gulp-typedoc')
gulp.task('copy', () => {//将其他文件复制到dist目录下
    return gulp.src(['src/**/*.*', '!src/**/*.ts', '!src/**/*.js']).pipe(gulp.dest('dist'))
})
gulp.task('typedoc', () => {
    return gulp
        .src(['src/**/*.ts'])
        .pipe(typedoc({
            exclude: ['node_modules',
                '**/*+(index|.worker|.e2e).ts'],
            // TypeScript options (see typescript docs)
            module: 'commonjs',
            target: 'es6',
            includeDeclarations: false,

            // Output options (see typedoc docs)
            out: './doc',

            // TypeDoc options (see typedoc docs)
            name: 'cq-robot',
            ignoreCompilerErrors: false,
            version: true,
            theme: 'markdown'
        }))
})