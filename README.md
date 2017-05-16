# gulp-rax-debuger

> 旺铺rax模块转化成weexbundle供playground调试

### 主要功能

- 将模块的weex.bundle.js通过以下三个js组合：

  - rax-data.js: 模块数据
  - rax-mod.js: 模块源码
  - index.bundle.js: 全局的依赖 + 调用代码

### Usage

```shell
var gulpRaxDebuger = require('gulp-rax-debuger');

return gulp.src(sourceFiles)
  .pipe(gulpRaxDebuger())
  .pipe(gulp.dest(distDir));
```
