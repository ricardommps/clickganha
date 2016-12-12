(function (angular) {

	'use strict';
	angular.module('api.secure.controllers', [])
	.controller('SecureCtrl', controller);
	function controller($scope){
		var vm = this;
		vm.data ={};
	}

})(window.angular);