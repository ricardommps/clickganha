(function (angular) {

	'use strict';
	angular.module('api.posts.controllers', [])
	.controller('PostsCtrl', controller);
	function controller($scope, PostsService){
		var vm = this;
		vm.data ={};
		
		PostsService.categories().then(function(result) {
			vm.data.category = result.data["banners"][0];
		})

		PostsService.filter().then(function(result) {
			vm.data.posts = result.data['faqs'];
		})

	}

})(window.angular);