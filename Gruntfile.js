/*global module */
module.exports = function( grunt ) {
	'use strict';
	require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

	grunt.initConfig({

		watch: {
			reload: {
				files: ['vendor/assets/stylesheets/**/*.scss'],
				tasks: 'compile'
			},
			dev: {
				files: ['vendor/assets/stylesheets/**/*.scss', 'docs/assets/css/docs.css'],
				tasks: 'dev'
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
					src: ['*.scss', '!_*.scss'],
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
			dist: {
				files: [
					{
						dot: true,
						src: ['dist/*']
					}
				]
			},
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
			dist: {
				files: [
					{
						expand: true,
						cwd: 'vendor/assets/javascripts/',
						src: ['**/*'],
						dest: 'dist/js/'
					},
					{
						expand: true,
						cwd: 'vendor/assets/images/',
						src: ['**/*'],
						dest: 'dist/img/'
					}
				]
			},
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

	grunt.registerTask('dist', ['clean:dist', 'copy:dist', 'compile', 'cssmin:dist']);

	grunt.registerTask('build', ['dist', 'clean:ui', 'copy:ui', 'shell:uibuild']);

	grunt.registerTask('dev', ['clean:dist', 'copy:dist', 'compile', 'clean:ui', 'copy:ui', 'shell:uibuild']);

};
