(function (angular) {

	'use strict';
	angular.module('api.post.controllers', [])
	.controller('PostCtrl', controller);
	function controller($scope, PostService){
		var vm = this;
		vm.data ={};
		
		PostService.posts().then(function(result) {
			vm.data.category = result.data;
		})


	}

})(window.angular);