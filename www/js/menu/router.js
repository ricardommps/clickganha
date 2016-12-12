(function (angular) {

	'use strict';

	angular.module('api.menu.router', [])

	.config(config);

	function config($stateProvider) {
		$stateProvider
		.state('app', {
			url: '/app',
			abstract: true,
			cache: false,
			templateUrl: 'js/menu/menu.html',
          	controller: 'MenuCtrl as vm'
		});
	}


	})(window.angular);
