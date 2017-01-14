var webpack = require('webpack');
const path = require('path');
// Karma configuration
module.exports = function(config) {
    config.set({
        files: [
            // all files ending in "test"
            './node_modules/phantomjs-polyfill/bind-polyfill.js',
            'spec/**/*.js',
            // 'app/*.js'
            // each file acts as entry point for the webpack configuration
        ],

        // frameworks to use
        frameworks: ['mocha'],

        preprocessors: {
            // add webpack as preprocessor
            'app/**/*.js': ['webpack'],
            'spec/**/*.js': ['babel'],
        },
        reporters: ['spec', 'coverage'],

        coverageReporter: {
            type: 'html',
            dir: 'build/coverage/'
        },

        webpack: {
            // webpack configuration
            module: {
                // postLoaders: [{
                //     test: /\.js/,
                //     exclude: /(test|node_modules|bower_components)/,
                //     loader: 'istanbul-instrumenter'
                // }],

                loaders: [{
                    loader: 'babel',
                    test: /(\.jsx)|(\.es6\.js)$/,
                    exclude: /node_modules/
                }],
            },
            resolve: {
                modulesDirectories: [
                    "",
                    "src",
                    "node_modules"
                ],

                extensions: ['', '.js', '.es6.js', '.coffee', '.jsx', '.es6.jsx']

            }
        },

        webpackMiddleware: {
            // webpack-dev-middleware configuration
            noInfo: true
        },

        plugins: [
            require("karma-webpack"),
            require("istanbul-instrumenter-loader"),
            require("karma-mocha"),
            require("karma-coverage"),
            require("karma-phantomjs-launcher"),
          require("karma-chrome-launcher"),
            require("karma-spec-reporter"),
            'karma-babel-preprocessor'
        ],

        // browsers: ['PhantomJS']
      browsers: ['Chrome']
    });
};
