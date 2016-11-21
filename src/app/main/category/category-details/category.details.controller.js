(function () {
	'use strict';

	angular.module('cetegory-details')
		.controller('CategoryDetailsController', categoryDetailsController);

	/**@ngInject*/
	function categoryDetailsController($mdDialog, category, mode) {
		var vm = this;
		vm.save = save;
		vm.cancel = cancel;
		vm.category = category || {};

		vm.title = mode === 'add' ? "Add category" : "Update category";

		//--------------------------
		function cancel() {
			$mdDialog.cancel();
		}

		function save() {
			$mdDialog.hide(vm.category);
		}
	}
})();