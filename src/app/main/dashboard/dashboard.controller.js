;(function () {
	'use strict';

	angular.module('dashboard')
		.controller('DashboardController', dashboardController);

	/*@ngInject*/
	function dashboardController($mdDialog, Tweet, Category) {
		var vm = this;

		vm.search = search;
		vm.tweets = Tweet.getLastData();
		vm.searchValue = '';
		vm.categoriesCount = Category.getCategoriesCount();
		vm.showCategoryList = showCategoryList;
		vm.clearAll = clearAll;
		vm.madeSearch = false;

		//============================

		function clearAll() {
			vm.tweets = [];
			vm.searchValue = '';
			vm.madeSearch = false;
			Tweet.clearLastData();
		}

		function showCategoryList(tweet, index) {
			$mdDialog.show({
				controller: 'AttachController',
				controllerAs: 'vm',
				templateUrl: 'main/dashboard/attach-category/attach.tpl.html',
				parent: angular.element(document.body),
				locals: {
					tweet: tweet
				},
				clickOutsideToClose: false
			})
				.then(function (resp) {
					tweet.categories = resp;
					Tweet.add(tweet);
				});
		}

		function search() {
			var value = vm.searchValue.replace('#', '%23');
			Tweet.search(value)
				.then(function (resp) {
					vm.tweets = resp.statuses;
					vm.madeSearch = true;
				});
		}

	}
})();

