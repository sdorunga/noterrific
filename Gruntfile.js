//Article on how to build the Gruntfile: http://gruntjs.com/sample-gruntfile
module.exports = function(grunt) {

  grunt.initConfig({
    // reads from package.json
    pkg: grunt.file.readJSON('package.json'),
    // concatenates all of your files
    concat: {
      options: {
        separator: ';'
      },
      dist: {
        src: ['node_modules/angular/angular.min.js',
              'src/**/*.js'],
        dest: 'dist/<%= pkg.name %>.js'
      }
    },
    // strips out all uneccessary space and characters for faster downloads
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yy") %> */\n',
        sourceMap: true,
        compress: true
      },
      dist: {
        files: {
          'dist/<%= pkg.name %>.min.js': ['<%= concat.dist.dest %>']
        }
      }
    },
    // watches for file changes and runs tasks
    watch: {
      files: ['src/**/*.js'],
      tasks: ['concat', 'uglify']
    }
  });
  //
  // loads the grunt plugins via npm
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  // lists the tasks to be run via the 'grunt' command
  grunt.registerTask('default', ['watch']);
};
