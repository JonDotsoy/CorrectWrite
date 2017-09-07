const gulp = require('gulp')
const BrowserSyncWebpackPlugin = require('browser-sync-webpack-plugin')

gulp.task('watch', () => (
  gulp.src(['./src/index.js'])
  .pipe(
    require('webpack-stream')({
      watch: true,
      module: {
        rules: [
          {
            test: /\.js/,
            exclude: /node_modules/,
            loader: 'babel-loader',
            options: {
              presets: [
                'env',
                'stage-0',
                'react'
              ]
            }
          }
        ]
      },
      output: {
        filename: 'index.js'
      },
      plugins: [
        new BrowserSyncWebpackPlugin({
          server: {
            baseDir: './public'
          }
        })
      ]
    })
  )
  .pipe(gulp.dest('./public'))
))
