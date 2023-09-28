# HTML Email Build Process Using Gulp.js

**This is the build process for building and serving HTML emails that were initially created from multiple template files into a single html email to be served.**

In this use case, the Gulp build process has the following features:

- Handlebars HTML templates with [Panini](http://github.com/zurb/panini)
- Simplified HTML email syntax with [Inky](http://github.com/zurb/inky)
- Sass compilation
- Image compression
- Built-in BrowserSync server
- Full email inlining process

This document is meant to explain the Gulp build process in detail. For information about how to install the entire email build process, see the README.md file for the full email templating system. 

Gulp is an automated build tool built with JavaScript that allows developers to automate slow and cumbersom build process, thus saving many hours of development time. If you are new to Gulp, a good place to start is their [getting started documentation](https://gulpjs.com/docs/en/getting-started/quick-start).

This Gulp build file has a number of dependencies that are used in the build process. These can be installed in the project with NPM.

```javascript
import gulp     from 'gulp';
import plugins  from 'gulp-load-plugins';
import browser  from 'browser-sync'; // https://www.npmjs.com/package/browser-sync Keep multiple browsers & devices in sync when building websites.
import rimraf   from 'rimraf'; // https://www.npmjs.com/package/rimraf  The rimraf command is an alternative to the Linux command rm -rf . It allows you to do deep recursive deletion of files and folders.
import panini   from 'panini';
import inky     from 'inky';
import fs       from 'fs';  //js provides an inbuilt module called FS (File System)
import path     from 'path'; //https://www.npmjs.com/package/path copy of node path path module provides utilities for working with file and directory paths. It can be accessed using:
```
**Gulp Tasks**

This set of tasks use the Gulp [series](https://gulpjs.com/docs/en/api/series) method to run the tasks in order given as arguments, and build the distribution folder for the emails. The tasks included will be explained with their methods below.

```javascript
gulp.task('build',
  gulp.series(clean, pages, sass, images, inline));
```

The next task will build the emails, run a server, then watch for file changes.
```javascript
gulp.task('default',
  gulp.series('build', server, watch));
```

**Functions called by Gulp Tasks**

The **clean** function deletes the distribution (dist) folder following every build to ensure a clean build every time a new build is started. This function uses the [rimraf](https://github.com/isaacs/rimraf#readme) deep-deletion module for node, which performs deep recursive deletion of files and folders. Notice that this clean() function is called in the first Gulp build task above.

```javascript
import rimraf   from 'rimraf';

function clean(done) {
  rimraf('dist', done);
}
```

The **pages** function compiles the separate files of email content, including layouts, pages, and partials, into flat HTML files. These files are then parsed using [Inky](http://github.com/zurb/inky) templates. The pages function uses the Gulp [src method](https://gulpjs.com/docs/en/api/src/) to find the location of the separate build files. This location is in the first part of the array passed to gulp.src: `src/pages/**/*.html`. Anything sent to gulp.src in the second position of the array is discarded: `!src/pages/archive/**/*.html`. The pages function then calls the JavaScript pipe method to call functions in order, giving each function the output of the previous function. The pipe calls the flat file generator Panini to build the email html file from multiple elements. These results are then passed to Inky, which converts the Inky templating language into a responisve browser-ready html email file. Finally, the results are piped to the [gulp.dest](https://gulpjs.com/docs/en/api/dest) method, which places production ready html email files into the dist folder.

```javascript
import panini   from 'panini';
import inky     from 'inky';

function pages() {
  return gulp.src(['src/pages/**/*.html', '!src/pages/archive/**/*.html'])
    .pipe(panini({
      root: 'src/pages',
      layouts: 'src/layouts',
      partials: 'src/partials',
      helpers: 'src/helpers'
    }))
    .pipe(inky())
    .pipe(gulp.dest('dist'));
}
```

The **reset** function resets Panini's cache of layouts and partials.

```javascript
import panini   from 'panini';

function resetPages(done) {
  panini.refresh();
  done();
}
```

The **sass** function compiles SASS into CSS. Much like the pages function, the sass function uses pipes to call two [Gulp plugins](https://gulpjs.com/docs/en/getting-started/using-plugins), [sass](https://www.npmjs.com/package/gulp-sass) and [postcss](https://www.npmjs.com/package/gulp-postcss), to convert SASS files into CSS. The new CSS files are then put into the css folder of the dist directory.

```javascript
const $ = plugins();
import plugins  from 'gulp-load-plugins';

function sass() {
  return gulp.src('src/assets/scss/app.scss')
    .pipe($.sass({
      includePaths: ['node_modules/foundation-emails/scss']
    }).on('error', $.sass.logError))
    .pipe($.postcss(
      {
        html: ['dist/**/*.html']
      })))
    .pipe(gulp.dest('dist/css'));
}
```

The **images** function copies and compresses images. The Gulp plugin [imagemin](https://www.npmjs.com/package/gulp-imagemin) is used, in addition to the **gulp.src** method, also used previously in the **pages** method. The minified images are then put in the img folder of the dist directory.

```javascript
const $ = plugins();
import plugins  from 'gulp-load-plugins';

function images() {
  return gulp.src(['src/img/**/*', '!src/img/archive/**/*'])
    .pipe($.imagemin())
    .pipe(gulp.dest('./dist/img'));
}
```

The **inline** function puts external CSS into the HTML, then minifies the HTML using the Gulp [cssInline](https://www.npmjs.com/package/gulp-css-inliner) plugin.

```javascript
const $ = plugins();
import plugins  from 'gulp-load-plugins';

function inline() {
  return gulp.src('dist/**/*.html')
    .pipe($.cssInline({directory: 'dist/css/app.css'}))
    .pipe(gulp.dest('dist'));
}
```

The **server** function starts a server with [LiveReload](https://github.com/livereload/livereload-js/blob/master/README.md) to preview the email files in a browser pointed at the dist directory.

```javascript
import browser  from 'browser-sync';

function server(done) {
  browser.init({
    server: 'dist'
  });
  done();
}
```


The **watch** function uses the Gulp watch function to detect changes to files that happen in the file paths passed to it. If a change to any files takes place, the Gulp [watch function](https://gulpjs.com/docs/en/api/watch) starts a new build process and reloads the files in the browser so that any changes made are immediately visible to the developer.

```javascript
function watch() {
  gulp.watch('src/pages/**/*.html').on('all', gulp.series(pages, inline, browser.reload));
  gulp.watch(['src/layouts/**/*', 'src/partials/**/*']).on('all', gulp.series(resetPages, pages, inline, browser.reload));
  gulp.watch(['../scss/**/*.scss', 'src/assets/scss/**/*.scss']).on('all', gulp.series(resetPages, sass, pages, inline, browser.reload));
  gulp.watch('src/assets/img/**/*').on('all', gulp.series(images, browser.reload));
}
```


