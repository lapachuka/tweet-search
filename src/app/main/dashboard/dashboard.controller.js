;(function () {
	'use strict';

	angular.module('dashboard')
		.controller('DashboardController', dashboardController);

	/*@ngInject*/
	function dashboardController(Dashboard, $mdDialog, Tweet, Category, $httpParamSerializer) {
		var vm = this;

		vm.search = search;
		vm.tweets = Dashboard.getLastData();
		vm.searchValue = '';
		vm.categoriesCount = Category.getCategoriesCount();
		vm.showCategoryList = showCategoryList;
		vm.clearAll = clearAll;

		//============================

		function clearAll() {
			vm.tweets = [];
			vm.searchValue = '';
			Dashboard.clearLastData();
		}

		function showCategoryList(tweet, index) {
			$mdDialog.show({
				controller: 'AttachController',
				controllerAs: 'vm',
				templateUrl: 'main/dashboard/attach-category/attach.tpl.html',
				parent: angular.element(document.body),
				clickOutsideToClose: false
			})
				.then(function (resp) {
					tweet.categories = resp;
					Tweet.add(tweet);

					vm.tweets.splice(index, 1);
				});
		}

		function search() {
			var value = vm.searchValue.replace('#', '%23');
			Dashboard.search(value)
				.then(function (resp) {
					console.log(resp);
					vm.tweets = resp.statuses;
				});
		}

	}
})();

