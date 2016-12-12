(function (angular) {

	'use strict';
	angular.module('api.checkout.controllers', [])
	.controller('CheckoutCtrl', controllerCheckout)
	.controller('CheckoutSuccessCtrl', controllerSuccess)
	.controller('CheckoutErrorCtrl', controllerError);

	function controllerSuccess(){

	}

	function controllerError(){
		
	}

	function controllerCheckout($scope, PromotionService, CheckoutService, $timeout, $state, $window, $stateParams){
		var vm = this;
		vm.data =$stateParams;
	}

})(window.angular);