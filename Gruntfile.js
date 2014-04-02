/*global module */
module.exports = function( grunt ) {
	'use strict';
	require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

	grunt.initConfig({

		watch: {
			reload: {
				files: ['vendor/assets/stylesheets/**/*.scss'],
				tasks: 'compile'
			}
		},

		sass: {
			options: {
				includePaths: ['vendor/assets/stylesheets']
			},
			dist: {
				files: [{
					expand: true,
					cwd: 'vendor/assets/stylesheets',
					src: ['*.scss'],
					dest: 'dist/css',
					ext: '.css'
				}]
			}
		},

		myth: {
			dist: {
				files: [{
					expand: true,
					cwd: 'dist/css',
					src: ['*.css', '!*.min.css'],
					dest: 'dist/css',
					ext: '.css'
				}]
			}
		},

		cssmin: {
			dist: {
				expand: true,
				cwd: 'dist/css',
				src: ['*.css', '!*.min.css'],
				dest: 'dist/css',
				ext: '.min.css'
			}
		},

		clean: {
			ui: {
				files: [
					{
						dot: true,
						src: ['ui/*']
					}
				]
			}
		},

		copy: {
			ui: {
				files: [
					{
						expand: true,
						cwd: 'docs/',
						src: ['**/*'],
						dest: 'ui/'
					},
					{
						expand: true,
						cwd: 'dist/css/',
						src: ['*.css'],
						dest: 'ui/assets/css/'
					}
				]
			}
		},

		shell: {
			uibuild: {
				options: {
					stdout: true
				},
				command: 'node ui/build'
			}
		}

	});

	grunt.registerTask('default', ['build']);

	grunt.registerTask('compile', ['sass:dist', 'myth:dist']);

	grunt.registerTask('dist', ['compile', 'cssmin:dist']);

	grunt.registerTask('build', ['dist', 'clean:ui', 'copy:ui', 'shell:uibuild']);

};
