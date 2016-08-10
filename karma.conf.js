// Karma configuration
// Generated on Wed Jul 20 2016 15:28:12 GMT-0700 (PDT)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['mocha', 'commonjs'],  //for karma to reconize mocha and commonjs plugin


    // list of files / patterns to load in the browser
    files: [
      'src/javascript/**/*.js',   //tells Karma where to load js files
      'src/vendor/chai-3.5.0.js', //tells Karma to load plugin Chai
      'src/vendor/classList.js'   //tells Karma to load classList.js plugin

    ],


    // list of files to exclude
    exclude: [
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      'src/javascript/**/*.js': ['commonjs'], //tell Karma to process all the js files under /src/javascript to get processed by commonjs plugin
      'src/vendor/chai-3.5.0.js': ['commonjs'], //tell Karma to process chai plugin to get process by commonjs, so require("chai...") will works
      'src/vendor/classList.js': ['commonjs']   //tell karma to process classList plugin to get process by commjs, so require("../vendor/classList.js") will works
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['dots'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: false,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: [],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity
  })
}
