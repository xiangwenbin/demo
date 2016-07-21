/**
 * 将regular 组件内的css,html拷贝到对应的 ts编译目录
 */
var gulp = require('gulp'),dir=[ 'src/typescript/*/*.html', 'src/typescript/*/*.css' ];
gulp.task('copyHtmlCss', function() {
	gulp.src(dir).pipe(gulp.dest('src/javascript'));
});
gulp.task('watch', function() {
	  gulp.watch(dir, ['copyHtmlCss']);
});
gulp.task('default', ['watch', 'copyHtmlCss']);