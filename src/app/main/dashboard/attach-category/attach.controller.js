(function () {
	'use strict';

	angular.module('attach')
		.controller('AttachController', attachController);

	/**ngInject*/
	function attachController($mdDialog, Category) {
		var vm = this;

		vm.cancel = cancel;
		vm.save = save;
		vm.categories = [];

		prepareCategory();

		//=============================//

		function prepareCategory() {
			var curList = Category.getList();
			angular.copy(curList, vm.categories);
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