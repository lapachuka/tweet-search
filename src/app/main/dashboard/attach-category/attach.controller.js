(function () {
	'use strict';

	angular.module('attach')
		.controller('AttachController', attachController);

	/**ngInject*/
	function attachController($mdDialog, Category, Tweet, tweet) {
		var vm = this;

		vm.cancel = cancel;
		vm.save = save;
		vm.categories = [];

		prepareCategory(tweet.id);

		//=============================//

		function prepareCategory(tweetId) {
			var curList = Category.getList();
			var storedTweet = Tweet.getById(tweetId);


			angular.copy(curList, vm.categories);

			if (storedTweet) {
				vm.categories = vm.categories.map(function (category) {
					category.selected = storedTweet.categories.indexOf(category.id) !== -1;
					return category;
				})
			}
		}

		function cancel() {
			$mdDialog.cancel();
		}

		function save() {
			var categoryIds = getCategoryIds();

			$mdDialog.hide(categoryIds);
		}

		function getCategoryIds() {
			var ids = [];

			angular.forEach(vm.categories, function (category) {
				if (category.selected) {
					ids.push(category.id);
				}
			});

			return ids;
		}

	}
})();