module.exports = function(grunt) {

    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        app: {
            dist: '_site',
            deploy: {
                user: process.env.BERRIART_DEPLOY_USER,
                pass: process.env.BERRIART_DEPLOY_PASS
            }
        },

        clean: {
            build: ['js', '_site']
        },

        uglify: {
            dist: {
                files: {
                    'js/app.js': [

                        'bower_components/jquery/dist/jquery.js',
                        'bower_components/what-input/what-input.js',
                        'bower_components/foundation-sites/js/foundation.core.js',
                        'bower_components/foundation-sites/js/foundation.util.mediaQuery.js',
                        'bower_components/foundation-sites/js/foundation.util.keyboard.js',
                        'bower_components/foundation-sites/js/foundation.util.box.js',
                        'bower_components/foundation-sites/js/foundation.util.triggers.js',
                        'bower_components/foundation-sites/js/foundation.util.motion.js',
                        'bower_components/foundation-sites/js/foundation.reveal.js',
                        'bower_components/foundation-sites/js/foundation.sticky.js',
                        'javascript/app.js',
                        'bower_components/cookieconsent2/build/cookieconsent.min.js',
                    ],
                    'js/sidr.js': [
                        'bower_components/jquery-touchswipe/jquery.touchSwipe.js',
                        'bower_components/sidr/dist/jquery.sidr.js',
                        'javascript/sidr.js'
                    ]
                },
            },
            watch: {
                options: {
                    sourceMap: true,
                    sourceMapIncludeSources: true,
                    compress: false,
                    mangle: false
                },
                files: {
                    'js/app.js': [
                        'bower_components/jquery/dist/jquery.js',
                        'bower_components/what-input/what-input.js',
                        'bower_components/foundation-sites/js/foundation.core.js',
                        'bower_components/foundation-sites/js/foundation.util.mediaQuery.js',
                        'bower_components/foundation-sites/js/foundation.util.keyboard.js',
                        'bower_components/foundation-sites/js/foundation.util.box.js',
                        'bower_components/foundation-sites/js/foundation.util.triggers.js',
                        'bower_components/foundation-sites/js/foundation.util.motion.js',
                        'bower_components/foundation-sites/js/foundation.reveal.js',
                        'bower_components/foundation-sites/js/foundation.sticky.js',
                        'javascript/app.js',
                        'bower_components/cookieconsent2/build/cookieconsent.min.js',
                    ],
                    'js/sidr.js': [
                        'bower_components/jquery-touchswipe/jquery.touchSwipe.js',
                        'bower_components/sidr/dist/jquery.sidr.js',
                        'javascript/sidr.js'
                    ]
                },
            }
        },

        jekyll: {
            options: {
                bundleExec: true,
                src : './'
            },
            watch: {
                options: {
                    dest: '<%= app.dist %>',
                    config: '_config.yml',
                    incremental: true
                }
            },
            dist: {
                options: {
                    dest: '<%= app.dist %>',
                    config: '_config.yml'
                }
            }
        },

        watch: {
            jekyll: {
                files: [
                    '*.{html,xml,php}',
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
        },

        environments: {
            options: {
                local_path: '_site',
                current_symlink: 'current',
                deploy_path: '/home/www/berriart.com'
            },
            production: {
                options: {
                    host: 'berriart.com',
                    username: '<%= app.deploy.user %>',
                    password: '<%= app.deploy.pass %>',
                    port: '22',
                    releases_to_keep: '5'
                }
            }
        },

        scsslint: {
            allFiles: [
                'css/main.scss',
                '_sass/_*.scss',
                '!_sass/_syntax-highlighting.scss'
            ],
            options: {
                bundleExec: true,
                config: '.scss-lint.yml',
                colorizeOutput: true
            },
        },

        eslint: {
            options: {
                configFile: 'eslint.json'
            },
            target: ['javascript/app.js']
        }
    });

    grunt.registerTask('serve', ['build', 'connect', 'watch']);
    grunt.registerTask('build', ['clean', 'uglify:dist', 'jekyll:dist']);

    grunt.registerTask('lint', ['scsslint', 'eslint']);

    grunt.registerTask('all', ['lint', 'build']);

    grunt.registerTask('default', ['serve']);

    grunt.registerTask('deploy', [
        'ssh_deploy:production'
    ]);
};
