/**
 * Grunt Project
 */
module.exports = function(grunt) {
    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        dirs: {
            src: 'original',
            dest: 'dist/<%= pkg.name %>/<%= pkg.version %>',
            minjs: 'dist/<%= pkg.name %>/<%= pkg.version %>/min/js',
            mincss: 'dist/<%= pkg.name %>/<%= pkg.version %>/min/css'
        },
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            // Compiling all files in a folder dynamically
            my_target: {
                files: [{
                    expand: true,
                    cwd: '<%= dirs.src %>',
//                    src: ['js/**/*.js', 'ui/*.js', 'extended/*.js', 'extended/{validationEngine, uploadify}/*.js', 'external/*.js', 'ui/jMenu/**/*.js'],
                    src: '**/*.js',
                    dest: '<%= dirs.dest %>'
                }]
            }
        },
        cssmin: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n',
                beautify: {
                    ascii_only: true
                }
            },
            my_target: {
                files: [{
                    expand: true,
                    cwd: '<%= dirs.src %>',
                    src: '**/*.css',
                    dest: '<%= dirs.dest %>'
                }]
            }
        },
//        imagemin: {                          // Task
//            static: {                          // Target
//                options: {                       // Target options
//                    optimizationLevel: 3
//                    /*,
//                    use: [mozjpeg()]*/
//                }
//                /*,
//                files: {                         // Dictionary of files
//                    'dist/img.png': 'src/img.png', // 'destination': 'source'
//                    'dist/img.jpg': 'src/img.jpg',
//                    'dist/img.gif': 'src/img.gif'
//                }*/
//            },
//            dynamic: {                         // Another target
//                files: [{
//                    expand: true,                  // Enable dynamic expansion
//                    cwd: '<%= dirs.src %>',                   // Src matches are relative to this path
//                    src: ['**/*.{png,jpg,gif}'],   // Actual patterns to match
//                    dest: '<%= dirs.dest %>/'                  // Destination path prefix
//                }]
//            }
//        }
        imagemin: {
            /* 压缩图片大小 */
            dist: {
                options: {
                    optimizationLevel: 3 //定义 PNG 图片优化水平
                },
                files: [
                    {
                        expand: true,
                        cwd: '<%= dirs.src %>/images',
                        src: ['**/*.{png,jpeg}'], // 优化 img 目录下所有 png/jpg/jpeg 图片
                        dest: '<%= dirs.dest %>/images' // 优化后的图片保存位置，覆盖旧图片，并且不作提示
                    }
                ]
            }
        },
        concat: {
            /*options: {
                separator: ';'
            },*/
            basic: {
                files: {
                    '<%= dirs.minjs %>/common-min.js': [
                        '<%= dirs.dest %>/nodejs-grunt.js',
                        '<%= dirs.dest %>/grunt.js'
                    ],
                    '<%= dirs.mincss %>/common-min.css': [
                        '<%= dirs.dest %>/css/pub.css',
                        '<%= dirs.dest %>/css/common/common.tabs.css'
                    ]
                }
            }
        }
    });
    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
//    grunt.loadNpmTasks('grunt-contrib-jshint');
//    grunt.loadNpmTasks('grunt-contrib-qunit');
//    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-imagemin');

    grunt.registerTask('default', ['uglify', 'concat']);
//    grunt.registerTask('default', ['uglify', 'cssmin', 'concat']);
    grunt.registerTask('img', ['imagemin']);
};