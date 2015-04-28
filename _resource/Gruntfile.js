// #"Last Change: 28-Apr-2015."

var DOCUMENT_ROOT = '../csv2json/';

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
        dirs: [ 'scss/**', 'coffee/**', 'jade/**', DOCUMENT_ROOT + 'css/**' ],
        livereload: {
          enabled: true,
          extensions: [ 'css' ],
          port: 35729
        }
      },
      css    : function( filepath ) { return []; },
      scss   : function( filepath ) { return [ 'compass:prod' ]; },
      jade   : function( filepath ) { return [ 'jade:html' ]; },
      coffee : function( filepath ) { return [ 'coffee:compile' ]; },
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
    },

    jade: {
      html : {
        options: {
          client: false,
          pretty: true,
          data: function(dest, src) {},
          basedir: '../'
        },
        files: [ {
          cwd: "./jade/",
          src: [
            "*.jade",
          ],
          dest: DOCUMENT_ROOT,
          expand: true,
          ext: ".html"
        }]
      }
    },

    coffee: {
      compile : {
        options:{
          bare: true
        },
        files:[{ 
          expand: true,
          bare: false,
          cwd: './coffee/',
          src: [
            '*.coffee',
            '**/*.coffee'
          ],
          dest: DOCUMENT_ROOT + 'js/content',
          ext: '.js',
        }]
      }
    }
  });



  //プラグインの読み
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-coffee');
  grunt.loadNpmTasks('grunt-contrib-jade' );
  grunt.loadNpmTasks('grunt-este-watch');

  grunt.registerTask("default", ["connect","esteWatch"]);
  grunt.registerTask("development", ["connect","esteWatch"]);
};
