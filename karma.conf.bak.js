// Karma configuration
module.exports = function(config) {
    config.set({
        frameworks: ['mocha'],
        // ... normal karma configuration
        files: [
            // all files ending in "_test"
            {
                pattern: 'spec/*.js',
                watched: false
            }, {
                pattern: 'spec/**/*.js',
                watched: false
            }
            // each file acts as entry point for the webpack configuration
        ],

        preprocessors: {
            // add webpack as preprocessor
            'spec/*_test.js': ['webpack'],
            'spec/**/*_test.js': ['webpack']
        },

        webpack: {
            // karma watches the test entry points
            // (you don't need to specify the entry option)
            // webpack watches dependencies

            // webpack configuration
        },

        webpackMiddleware: {
            // webpack-dev-middleware configuration
            // i. e.
            stats: 'errors-only'
        },
        client: {
            mocha: {
                // change Karma's debug.html to the mocha web reporter
                reporter: 'html',

                // require specific files after Mocha is initialized
                // require: [require.resolve('bdd-lazy-var/bdd_lazy_var_global')],

                // custom ui, defined in required file above
                // ui: 'bdd-lazy-var/global',
            }
        }
    });
};
