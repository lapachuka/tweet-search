(function () {
	'use strict';

	angular
		.module('dashboard', ['attach'])
		.config(dashboardConfig);

	/*@ngInject*/
	function dashboardConfig($stateProvider) {
		$stateProvider
			.state('dashboard', {
				url: "/",
				parent: 'page',
				views: {
					'content@page': {
						templateUrl: 'main/dashboard/dashboard.tpl.html',
						controller: 'DashboardController as vm'
					}
				}
			});

	}
})();