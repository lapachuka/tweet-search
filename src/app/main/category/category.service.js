(function () {
	'use strict';

	angular.module('category')
		.factory('Category', categoryService);

	/* ngInject()*/
	function categoryService() {
		var categories = [
			{
				name: 'Food',
				id: 1
			}, {
				name: 'Sport',
				id: 2
			}, {
				name: 'Rest',
				id: 3
			}
		];

		return {
			getList: getList,
			update: update,
			deleteItem: deleteItem,
			add: add,
			getCategoriesCount: getCategoriesCount
		};


		function getCategoriesCount(){
			return categories.length;
		}

		function deleteItem(id) {
			var index;

			angular.forEach(categories, function (categoryItem, key) {
				if (categoryItem.id === id) {
					index = key;
				}
			});

			if (typeof index !== undefined) {
				categories.splice(index, 1);
			}
		}

		function update(item) {
			angular.forEach(categories, function (categoryItem) {
				if (categoryItem.id === item.id) {
					angular.copy(item, categoryItem);
				}
			})
		}

		function add(itemName) {
			var item = {};
			if (itemName) {
				item.id = guid();
				item.name = itemName;
				categories.push(item);
				return item;
			}

			return false;
		}

		function getList() {
			return categories;
		}

		function guid() {
			function s4() {
				return Math.floor((1 + Math.random()) * 0x10000)
					.toString(16)
					.substring(1);
			}

			return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
				s4() + '-' + s4() + s4() + s4();
		}


	}
})();
