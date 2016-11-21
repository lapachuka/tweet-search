(function () {
	'use strict';

	angular.module('category', ['cetegory-details'])
		.config(categoryConfig);


	/*@ngInject*/
	function categoryConfig($stateProvider) {
		$stateProvider
			.state('category', {
				url: "/category",
				parent: 'page',
				views: {
					'content@page': {
						templateUrl: 'main/category/category.tpl.html',
						controller: 'CategoryController as vm'
					}
				}
			});
	}
})();