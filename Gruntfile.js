module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        app: {
            dist: '_site'
        },

        clean: {
            build: ["js"]
        },

        uglify: {
            dist: {
                files: {
                    'js/app.js': [
                        'bower_components/jquery/dist/jquery.js',
                        'bower_components/what-input/what-input.js',
                        'bower_components/foundation-sites/js/foundation.core.js',
                        'bower_components/foundation-sites/js/foundation.util.mediaQuery.js',
                        'javascript/*.js'
                    ]
                },
            },
            watch: {
                options: {
                    sourceMap: true,
                    sourceMapIncludeSources: true,
                    compress: false
                },
                files: {
                    'js/app.js': [
                        'bower_components/jquery/dist/jquery.js',
                        'bower_components/what-input/what-input.js',
                        'bower_components/foundation-sites/js/foundation.core.js',
                        'bower_components/foundation-sites/js/foundation.util.mediaQuery.js',
                        'javascript/*.js'
                    ]
                },
            }
        },

        jekyll: {                             // Task
            options: {                          // Universal options
                bundleExec: true,
                src : './'
            },
            watch: {                             // Target
                options: {                        // Target options
                    dest: '<%= app.dist %>',
                    config: '_config.yml',
                    incremental: true
                }
            },
            dist: {                             // Target
                options: {                        // Target options
                    dest: '<%= app.dist %>',
                    config: '_config.yml'
                }
            }
        },

        watch: {
            jekyll: {
                files: [
                    '*.{html,xml}',
                    '.html',
                    '_*/**/*.{html,md,mkd,markdown,scss}',
                    'projects/**/*.{html,md,mkd,markdown}',
                    'contact/**/*.{html,md,mkd,markdown}',
                    'css/*',
                    'js/*',
                    'images/*'
                ],
                tasks: ['jekyll:watch']
            },
            javascript: {
                files: ['javascript/*.js'],
                tasks: ['uglify:watch']
            }
        },

        connect: {
            server: {
                options: {
                    port: 4000,
                    base: '_site'
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-jekyll');

    grunt.registerTask('serve', ['connect', 'watch']);
    grunt.registerTask('build', ['clean', 'uglify:dist', 'jekyll:dist']);

    grunt.registerTask('default', ['serve']);
};
