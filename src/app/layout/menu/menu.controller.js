(function () {
	'use strict';

	angular.module('menu')
		.controller('MenuController', MenuController);

	/*@ngInject**/
	function MenuController($state) {
		var vm = this;
		vm.currentNavItem = $state.$current.name;
	}
})();