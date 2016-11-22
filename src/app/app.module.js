(function () {
	'use strict';
	angular.module('app', [
		'ui.router',
		'ngMaterial',
		'dashboard',
		'page',
		'tweet',
		'category',
		'templates',
		'menu'
	])
	.config(appConfig);

	/**@ngInject*/
	function appConfig($locationProvider){
		// use the HTML5 History API
		$locationProvider.html5Mode({
			enabled: true,
			requireBase: false
		});
	}
	


})();