
module.exports = function(grunt) {
    // Project configuration.
    grunt.initConfig({
      pkg: grunt.file.readJSON('package.json'),
      ngtemplates:  {
        app:        {
          src:      ['public/templates/**.html', 'public/templates/parts/**.html'],
          dest:     'public/js/dist/template.js',
          options:  {
            url:    function(url) { 
              url = url.replace('public/templates/', '/templates/');
              return url;
            }
          }
        }
      },
      uglify: {
        options: {
          compress: {},
          mangle: {
            except: ['jQuery', 'angular']
          }
        },
        build: {
          files: {
            "public/js/dist/main.min.js" : [
              'public/js/*.js',
              'public/js/src/modules/*.js',
              'public/js/src/modules/angular/controllers/*.js',
              'public/js/src/modules/angular/services/*.js',
              'public/js/src/modules/angular/directives/*.js',
              'public/js/src/modules/angular/directives/dir/*.js',
              'public/js/src/modules/validators/*.js',
              'public/js/src/modules/forms/*.js',
              'public/js/src/modules/angular/app__main.js',
              'public/js/dist/template.js'
            ]//end files
          }
        }
      },
      less: {
        build: {
          files: {
            "public/css/style.css" : [
              "public/css/less/_normalize.less",
              "public/css/less/remixins.less",
              "public/css/less/style.less",
              "public/css/style.less.css"
            ]
          }
        }
      },
      cssmin: {
        combine: {
          files: {
            "public/css/style.css" : "public/css/style.css"
          }
        }
      }
    });
  
  
    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-angular-templates');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
  
    // Default task(s).
    //grunt.registerTask('css', ['less', 'cssmin', 'autoprefixer']);
    grunt.registerTask('def', ['ngtemplates', 'uglify', 'less', 'cssmin']);
    //grunt.registerTask('def', ['uglify', 'less', 'cssmin']);
  
  };