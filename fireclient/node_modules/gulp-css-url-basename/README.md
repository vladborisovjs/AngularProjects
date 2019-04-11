# gulp-css-url-basename
====================

[![Build Status](https://travis-ci.org/stevennuo/gulp-css-url-basename.svg?branch=master)](https://travis-ci.org/stevennuo/gulp-css-url-basename)

Gulp plugin for mapping `url()` calls. Skip the encoded ones, and replace path in rest `url()`s with basename(Unix).

```js
var basename = require('gulp-css-url-basename');
gulp.src('test/url.css')
    .pipe(basename({prefix: 'assets'}))
    .pipe(rename('url-out.css'))
    .pipe(gulp.dest('test'))
```

origin:

```css
body {
  background: url(/images/bg.png);
}
@font-face {
  font-family: 'Glyphicons Halflings';
  src: url('../fonts/glyphicons-halflings-regular.eot?#iefix'),
    url(" ../fonts/glyphicons-halflings-regular.woff ") format('woff');
}
.icon {
  background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAABGdBTUEAALGPC/xhBQAAAAlwSFlzAAAOwgAADsIBFShKgAAAABp0RVh0U29mdHdhcmUAUGFpbnQuTkVUIHYzLjUuMTAw9HKhAAAAlElEQVQoU33PPQrCQBRF4fFnI2KfZVi5ARvdgo1l6mwmkCJVOgluwd5OwUoDtnoOxAei8cLXTN7cvEl/skCNDCMPfsUPO5zQwOHIDEvYtMURHe6wOVLgigvOePRyeDkyR4ln7wZ//7XfFBu8B23+aDJjrHGAwza7hjtHJvDmHg7b7Bru7AMjK7Rw2ObBVHDY5oGk9AKQNB2zy8MBTgAAAABJRU5ErkJggg==");
}
```

yields:

```css
body {
  background: url("assets/bg.png");
}
@font-face {
  font-family: 'Glyphicons Halflings';
  src: url("assets/glyphicons-halflings-regular.eot?#iefix"),
    url("assets/glyphicons-halflings-regular.woff") format('woff');
}
.icon {
  background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAABGdBTUEAALGPC/xhBQAAAAlwSFlzAAAOwgAADsIBFShKgAAAABp0RVh0U29mdHdhcmUAUGFpbnQuTkVUIHYzLjUuMTAw9HKhAAAAlElEQVQoU33PPQrCQBRF4fFnI2KfZVi5ARvdgo1l6mwmkCJVOgluwd5OwUoDtnoOxAei8cLXTN7cvEl/skCNDCMPfsUPO5zQwOHIDEvYtMURHe6wOVLgigvOePRyeDkyR4ln7wZ//7XfFBu8B23+aDJjrHGAwza7hjtHJvDmHg7b7Bru7AMjK7Rw2ObBVHDY5oGk9AKQNB2zy8MBTgAAAABJRU5ErkJggg==");
}
```

### Options

* `prefix` The target directory added before the basename.
* `normalize` Use path.normalize to process the options.prefix or not. default: false