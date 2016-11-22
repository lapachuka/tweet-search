(function () {
	'use strict';

	angular.module('tweet')
		.factory('Tweet', tweetService);

	/**ngInject*/
	function tweetService($q, $rootScope) {
		var tweets = [],
			lastData = [],
			authorizationResult = false;

		OAuth.clearCache('twitter');

		return {
			getByCategoryId: getByCategoryId,
			removeCategoryFromTweet: removeCategoryFromTweet,
			add: add,
			search: search,
			getLastData: getLastData,
			clearLastData: clearLastData,
			getAuthResult: getAuthResult,
			getById: getById
		};

		function getById(tweetId){
			return tweets.filter(function(tweet){
				return tweet.id === tweetId
			})[0];
		}

		function getByCategoryId(categoryId) {
			return tweets.filter(function (item) {
				return item.categories.indexOf(categoryId) !== -1;
			});

		}

		function add(tweet) {
			var hasTweet = tweets.filter(function (curTweet) {
				return curTweet.id === tweet.id;
			});

			if (!hasTweet.length) {
				tweets.push(tweet);
			}
		}

		function removeCategoryFromTweet(tweetId, categoryId) {
			angular.forEach(tweets, function (tweet) {
				if (tweet.id === tweetId) {
					var delIndex = tweet.categories.indexOf(categoryId);
					tweet.categories.splice(delIndex, 1);
				}
			})
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


		function clearLastData() {
			lastData = [];
		}

		function getLastData() {
			return lastData;
		}

		function getAuthResult() {
			return authorizationResult;
		}

	}
})();