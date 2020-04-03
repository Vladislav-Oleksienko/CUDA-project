import gulp from 'gulp'
import plumber from 'gulp-plumber'
import gif from 'gulp-if'
import sourcemaps from 'gulp-sourcemaps'
import babel from 'gulp-babel'
import terser from 'gulp-terser'
import concat from 'gulp-concat'


import { handleError, liveEnv, project } from '../index'

const jsPaths = project.sourceDirectory + '/' + project.scriptsDirectory + '/**/*.js'
const jsFileName = project.jsMinFileName
const dest = project.distDirectory + '/' + project.scriptsDirectory

 export default function () {
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
