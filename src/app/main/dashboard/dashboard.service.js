(function () {
	'use strict';

	angular.module('dashboard')
		.factory('Dashboard', DashboardService);

	/* ngInject()*/
	function DashboardService($q, $rootScope) {
		var authorizationResult = false;
		var lastData = [];
		var url = '/1.1/search/tweets.json?lang=en&q=';
		/*;*/

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
			var deferred = $q.defer();
			$rootScope.isLoading = 1;

			if (authorizationResult) {

				authorizationResult.get(url + key)
					.done(function (data) {
						$rootScope.isLoading = 0;
						lastData = data.statuses;
						deferred.resolve(data);
					}).fail(function (err) {
					$rootScope.isLoading = 0;
					deferred.reject(err);
				});

			} else {
				OAuth.initialize('d-K7_xYzzusWLME8Ktan0N9Es-w');

				setAuthResult()
					.then(function () {

						authorizationResult.get(url + key)
							.done(function (data) {
								$rootScope.isLoading = 0;
								lastData = data.statuses;
								deferred.resolve(data);
							}).fail(function (err) {
							$rootScope.isLoading = 0;
							deferred.reject(err);
						});

					});
			}


			return deferred.promise;
		}
	}
})();
