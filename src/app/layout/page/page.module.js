(function () {
	'use strict';

	angular.module('page', [])
		.config(pageConfig);


	/*@ngInject*/
	function pageConfig($stateProvider) {
		$stateProvider
			.state('page', {
				abstract: true,
				views: {
					'': {
						templateUrl: 'layout/page/page.tpl.html'
					},
					'menu@page': {
						templateUrl: 'layout/menu/menu.tpl.html',
						controller: 'MenuController'
					}
				}
			});
	}
})();