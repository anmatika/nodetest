module.exports = function(config) {
    'use strict';
    config.set({

        basePath: './',

        frameworks: ['mocha'],

        files: [
            'spec/**/*.spec.js',
            'app/*.js', {
                pattern: 'node_modules/chai/chai.js',
                include: true
            },
        ],

        // reporters: ['mocha', 'progress', 'junit', 'coverage'],
      reporters: ['mocha'],
        // browsers: ['PhantomJS'],
        logLevel: config.LOG_INFO,
        port: 9876,
        colors: true,
        autoWatch: false,
        singleRun: false,
        plugins: [
            'karma-mocha',
            'karma-chrome-launcher',
            'karma-junit-reporter',
            'karma-mocha-reporter',
            'karma-coverage',
            'karma-phantomjs-launcher'
        ]
    });
};
