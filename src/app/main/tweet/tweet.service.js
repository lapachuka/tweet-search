(function () {
	'use strict';

	angular.module('tweet')
		.factory('Tweet', tweetService);

	/**ngInject*/
	function tweetService() {
		var tweets = [];

		return {
			getByCategoryId: getByCategoryId,
			removeCategoryFromTweet: removeCategoryFromTweet,
			add: add
		};

		function getByCategoryId(categoryId) {
			return tweets.filter(function (item) {
				return item.categories.indexOf(categoryId) !== -1;
			});

		}

		function add(tweet) {
			tweets.push(tweet);
		}

		function removeCategoryFromTweet(tweetId, categoryId) {
			angular.forEach(tweets, function (tweet) {
				if (tweet.id === tweetId) {
					var delIndex = tweet.categories.indexOf(categoryId);
					tweet.categories.splice(delIndex, 1);
				}
			})
		}

	}
})();