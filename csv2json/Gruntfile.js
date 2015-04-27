// #"Last Change: 24-Apr-2015."

var ROOT = './public/';

module.exports = function(grunt) {

 'use strict';
  
 grunt.initConfig({
    pkg: grunt.file.readJSON("package.json"),
    connect: {
        livereload: {
            options: {
                livereload : true
            }
        }
    },
    esteWatch: {
      options: {
        dirs: [ ROOT + 'scss/**',  ROOT + 'css/**' ],
        livereload: {
          enabled: true,
          extensions: [ 'css' ],
          port: 35729
        }
      },
      css    : function( filepath ) { return []; },
      scss   : function( filepath ) { return [ 'compass:prod' ]; },
    },

    compass: {
      dev: {
        options: {
          config: "config.rb",
          environment: "development",
          force: true
        }
      },
      force: {
        options: {
          config: "config.rb",
          environment: "development",
          force: true
        }
      },
      clean: {
        options: {
          clean: 'true'
        }
      },
      prod: {
        options: {
          config: "config.rb",
          environment: "production",
          force: true
        }
      }
    }
  });



  //プラグインの読み
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-este-watch');

  grunt.registerTask("default", ["connect","esteWatch"]);
  grunt.registerTask("development", ["connect","esteWatch"]);
};
