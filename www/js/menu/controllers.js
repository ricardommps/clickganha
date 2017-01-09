(function (angular) {

	'use strict';
	angular.module('api.menu.controllers', ['starter.services'])


	.controller('MenuCtrl',MenuCtrl);

	function MenuCtrl($scope, PlaylistsServices, $state, LOCALSTORAGE, $rootScope, $mdSidenav, $log){
		var user = JSON.parse(localStorage.getItem(LOCALSTORAGE.key));
		if(!user){
			$state.go('login');
		}
		var vm = this;
		vm.data = user;
		vm.logout = logout;
		vm.close = close;
		vm.totalPoints = $rootScope.totalPoints;
		vm.toggleLeft = buildToggler('left');
		vm.onClickMenu = onClickMenu;
		vm.user = user;
		vm.title = "Home";


		vm.menu = [
		{
			link : 'app.home',
			title: 'Home',
			icon: 'home'
		},
		{
			link : 'app.campanhas',
			title: 'Campanhas',
			icon: 'star'
		},
		{
			link : 'app.promotions',
			title: 'Promoções',
			icon: 'local_offer'
		},
		{
			link : '',
			title: 'Cupons ',
			icon: 'local_play'
		},
		{
			link : 'app.faq',
			title: 'Faq',
			icon: 'info_outline'
		},
		{
			link : 'app.rbs',
			title: 'WIFI',
			icon: 'network_wifi'
		},
		{
			link : 'app.profile',
			title: 'Perfil',
			icon: 'face'
		},
		{
			link : 'app.about',
			title: 'Quem somos',
			icon: 'info'
		},
		{
			link : 'login',
			title: 'Sair',
			icon: 'exit_to_app'
		}
		];

		
		$scope.$on("updateTotalPoints",function () {
			vm.totalPoints = $rootScope.totalPoints; 
		});

		$scope.$on("title",function (event, obj) {
	    	console.log(obj);
	    	vm.title = obj.title;
	    	console.log(vm.title);
	    	//listUserAdvertisings();  
	  	});

		function buildToggler(componentId) {
			return function() {
				$mdSidenav(componentId).toggle();
			}
		}

		function logout(){
			localStorage.removeItem(LOCALSTORAGE.key);
			$state.go('login');
		}

		function close(){
			$mdSidenav('right').close()
			.then(function () {
				$log.debug("close RIGHT is done");
			});
		}

		function onClickMenu (newPage) {
			if (newPage !== undefined) {
				if(newPage == "login"){
					localStorage.removeItem(LOCALSTORAGE.key);
				}
				$mdSidenav('left').close()
				.then(function() {
					$state.go(newPage);
				});
			} else {
				$mdSidenav('left').close();
			}
		};	
	}
	
})(window.angular);
