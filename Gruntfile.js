
/*!
 * @description Grunt@!!!!!
 */

module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> v<%= pkg.version %>, <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        src: 'js/controller.js',
        dest: 'js/controller.min.js'
      }
    },
    jshint: {
      options: {
        browser: true,
        globals: {
          jQuery: true
        }
      },
      all: {
        files: {
          src: ['js/*.js']
        }
      }
    },
    concat: {
      options: {
      },
      dist: {
        src: [
          'public/js/vendor/jquery-1.9.0.min.js',
          'public/js/vendor/jquery.transit.min.js',
          'public/js/vendor/jquery.validate.js',
          'public/js/vendor/jquery.notify.js',
          'public/js/vendor/blend.js',
          'public/js/src/app.js',
          'public/js/src/controllers/SiteController.js',
        ],
        dest: 'public/js/app.js'
      }
    },
    less: {
      development: {
        options: {
          paths: ['css'],
          yuicompress: false
        },
        files: {
          'css/styles.css':'css/styles.less'
        }
      }
    },
    cssmin: {
      compress: {
        files: {
          'css/styles.min.css': ['css/styles.css']
        }
      }
    },
    watch: {
      scripts: {
        files: ['Gruntfile.js','js/*.js'],
        tasks: ['uglify'],
        options: {
          debounceDelay: 250
        }
      },
      less: {
        files: 'css/*.less',
        tasks: ['less','cssmin'],
        options: {
          debounceDelay: 250
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  //grunt.loadNpmTasks('grunt-contrib-jshint');
  //grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-cssmin');

  grunt.registerTask('default', ['uglify','less','cssmin','watch']);

};

/* EOF */