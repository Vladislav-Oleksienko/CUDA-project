import gulp from 'gulp'
import plumber from 'gulp-plumber'
import gif from 'gulp-if'
import sourcemaps from 'gulp-sourcemaps'
import babel from 'gulp-babel'
import terser from 'gulp-terser'
import concat from 'gulp-concat'
import sass from 'gulp-sass'
import autoprefixer from 'gulp-autoprefixer'

import { handleError, liveEnv, targets, project } from '../index'

const jsPaths = project.sourceDirectory + '/' + project.remoteWidget + '/' + project.scriptsDirectory + '/main.js'
const jsFileName = project.jsMinFileName
const dest = project.distDirectory + '/' + project.remoteWidget + '/' + project.scriptsDirectory

 export function remoteJs () {
  return function () {
    return gulp
      .src(jsPaths)
      .pipe(plumber({ errorHandler: handleError }))
      .pipe(gif(!liveEnv, sourcemaps.init()))
      .pipe(concat(jsFileName))
      .pipe(terser())
      .pipe(gif(!liveEnv, sourcemaps.write()))
      .pipe(gulp.dest(dest))
  }
} 

const sassPaths = project.sourceDirectory + '/' + project.remoteWidget + '/' + project.stylesDirectory + '/style.scss'
const autoprefixerSettings = targets.autoprefixer
const cssFileName = project.cssMinFileName
const desta = project.distDirectory + '/' + project.remoteWidget + '/' + project.stylesDirectory


export function remoteStyles () {
    return function () {
      return gulp
        .src(sassPaths)
        .pipe(plumber({ errorHandler: handleError }))
        .pipe(gif(!liveEnv, sourcemaps.init()))
        .pipe(sass({
            outputStyle: 'compressed',
          })
        )
        .pipe(autoprefixer({
            browsersList: autoprefixerSettings
          })
        )
        .pipe(concat(cssFileName))
        .pipe(gif(!liveEnv, sourcemaps.write()))
        .pipe(gulp.dest(desta))
    }
  }

  export function remote () {
    return function (done) {
      return gulp
        .series(
          'remoteStyles', 'remoteJs'
        )(done)
    }
  }
  