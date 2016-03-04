'use strict'
const resolve = require('path').resolve
const basename = require('path').basename
const readFile = require('fs').readFileSync
const through = require('through2')
const run = require('run-sequence')
const jade = require('jade').compile
const moment = require('moment')
const gulp = require('gulp-help')(require('gulp'))
const del = require('del')
const marked = require('marked')
const gutil = require('gulp-util')
const markdown = require('gulp-markdown')
const prettify = require('gulp-html-prettify')
const livereload = require('gulp-livereload')
const gls = require('gulp-live-server')
const deploy = require('gulp-gh-pages')
const frontMatter = require('gulp-front-matter')

const server = gls([gls.script, 'dist', 9080], undefined, false)
const renderer = new marked.Renderer()

gulp.task('clean', false, (done) => {
  return del(['./dist'], done)
})

gulp.task('compile', false, (done) => {
  return gulp.src(['./src/**/*.md', '!./src/toc.md'])
    .pipe(through.obj((file, encoding, cb) => {
      const contents = file.contents.toString()
      const headings = /\#{1,6}\s?(.+)/ig.exec(contents)

      if (headings) {
        file.title = headings.pop()
      }

      return cb(null, file)
    }))
    .pipe(frontMatter({ property: 'meta' }))
    .pipe(markdown())
    .pipe(through.obj((file, encoding, cb) => {
      if (file.isNull()) {
        return cb(null, file)
      }

      if (file.isStream()) {
        return cb(new gutil.PluginError('gulpfile.js', 'Streaming not supported'))
      }

      const tableOfContents = String(readFile(resolve('./src/toc.md')))

      const locals = {
        title: file.meta.title || file.title,
        modified: moment(file.meta.modified || file.stat.mtime).format('dddd, MMMM D, YYYY'),
        filename: basename(file.relative, '.html'),
        toc: marked(tableOfContents, { renderer: renderer }),
        markdown: file.contents.toString()
      }

      const template = jade(readFile(resolve('./src/template.jade')))
      const path = (!!~file.path.indexOf('index') ? '.html' : '/index.html')

      file.contents = new Buffer(template(locals))
      file.path = gutil.replaceExtension(file.path, path)
      return cb(null, file)
    }))
    .pipe(prettify({ indent_char: ' ', indent_size: 2 }))
    .pipe(gulp.dest('./dist'))
    .pipe(livereload())
})

gulp.task('cname', false, () => {
  return gulp.src('./src/CNAME')
    .pipe(gulp.dest('./dist'))
})

gulp.task('build', 'Build pages.', (done) => {
  run('clean', 'compile', done)
})

gulp.task('watch', false, () => {
  server.start()
  livereload.listen()
  gulp.watch(['./src/**/*.md', './src/template.jade'], ['compile'])
})

gulp.task('develop', 'Develop in realtime!', (done) => {
  run('build', 'watch', done)
})

gulp.task('push', false, (done) => {
  return gulp.src('./dist/**/*')
    .pipe(deploy({ branch: 'gh-pages' }))
})

gulp.task('deploy', 'Deploy recent changes.', (done) => {
  run('build', 'cname', 'push', done)
})
