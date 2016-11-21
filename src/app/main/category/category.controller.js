(function () {
	'use strict';

	angular.module('category')
		.controller('CategoryController', CategoryController);

	/* ngInject()*/
	function CategoryController($mdSidenav, Tweet, Category, $mdDialog) {
		var vm = this;

		vm.categories = [];
		vm.selectedCategory = '';
		vm.selectedCategoryId = '';
		vm.toggleLeft = buildToggler('left');
		vm.close = close;
		vm.deleteTweetFromCategory = deleteTweetFromCategory;
		vm.selectTweetByCategory = selectTweetByCategory;
		vm.addCategory = addCategory;
		vm.editCategory = editCategory;
		vm.deleteCategory = deleteCategory;
		prepareCategory();

		//====================================

		function deleteTweetFromCategory(tweetId) {
			Tweet.removeCategoryFromTweet(tweetId, vm.selectedCategoryId);
			vm.tweets = Tweet.getByCategoryId(vm.selectedCategoryId);
		}

		function addCategory() {
			$mdDialog.show({
				controller: 'CategoryDetailsController',
				controllerAs: 'vm',
				templateUrl: 'main/category/category-details/category.details.tpl.html',
				parent: angular.element(document.body),
				locals: {
					category: {},
					mode: 'add'
				},
				clickOutsideToClose: false
			})
				.then(function (resp) {
					var category = Category.add(resp.name);

					if (category) {
						vm.categories.push(category);
					}
				});
		}

		function editCategory(category) {
			var curCategory = {};

			angular.copy(category, curCategory);
			$mdDialog.show({
				controller: 'CategoryDetailsController',
				controllerAs: 'vm',
				templateUrl: 'main/category/category-details/category.details.tpl.html',
				parent: angular.element(document.body),
				locals: {
					category: curCategory,
					mode: 'update'
				},
				clickOutsideToClose: false
			})
				.then(function (item) {
					Category.update(item);
					angular.copy(item, category);
				});
		}

		function deleteCategory(categoryId, index) {
			var confirm = $mdDialog.confirm()
				.title('Would you like to delete your category?')
				.textContent('All information will be lost')
				.ok('Please do it!')
				.cancel('Cancel');

			$mdDialog.show(confirm).then(function () {
				Category.deleteItem(categoryId);
				vm.categories.splice(index, 1);
			});
		}

		function selectTweetByCategory(item) {
			vm.selectedCategory = item.name;
			vm.selectedCategoryId = item.id;
			vm.tweets = Tweet.getByCategoryId(item.id);
			$mdSidenav('left').close();
		}

		function prepareCategory() {
			var curList = Category.getList();
			angular.copy(curList, vm.categories);
		}

		function close() {
			$mdSidenav('left').close();
		}

		function buildToggler(navID) {
			return function () {
				$mdSidenav(navID).toggle();
			}
		}
	}

})();
