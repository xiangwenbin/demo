/**
 * 将regular 组件内的css,html拷贝到对应的 ts编译目录
 */
var gulp = require('gulp');
gulp.task('default', function() {
	gulp.src([ 'src/typescript/*/*.html', 'src/typescript/*/*.css' ]).pipe(gulp.dest('src/javascript'));
});