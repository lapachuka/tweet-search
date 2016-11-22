(function () {
	'use strict';

	angular.module('dashboard')
		.factory('Dashboard', DashboardService);

	/* ngInject()*/
	function DashboardService($q, $rootScope) {
		var authorizationResult = false;
		var lastData = [];
		OAuth.clearCache('twitter');

		return {
			search: search,
			setAuthResult: setAuthResult,
			getLastData: getLastData,
			clearLastData: clearLastData,
			getAuthResult: getAuthResult
		};

		function clearLastData() {
			lastData = [];
		}

		function getLastData() {
			return lastData;
		}

		function getAuthResult() {
			return authorizationResult;
		}

		function setAuthResult() {
			var deferred = $q.defer();

			OAuth.initialize('d-K7_xYzzusWLME8Ktan0N9Es-w');
			OAuth.popup("twitter", {
				cache: true
			}, function (error, result) {
				if (!error) {
					authorizationResult = result;
					deferred.resolve(authorizationResult);
				} else {
					deferred.reject(authorizationResult);
				}
			});

			return deferred.promise;
		}

		function search(key) {
			if (authorizationResult) {
				return searchByKey(key);
			} else {
				return setAuthResult()
					.then(function () {
						return searchByKey(key);
					});
			}
		}

		function searchByKey(key) {
			var deferred = $q.defer();
			var url = '/1.1/search/tweets.json?lang=en&q=';

			$rootScope.isLoading = 1;

			authorizationResult.get(url + key)
				.done(function (data) {
					$rootScope.isLoading = 0;
					lastData = data.statuses;
					deferred.resolve(data);
				}).fail(function (err) {
				$rootScope.isLoading = 0;
				deferred.reject(err);
			});

			return deferred.promise;
		}
	}
})();
