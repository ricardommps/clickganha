(function (angular) {

	'use strict';
	angular.module('api.login.controllers', ['starter.services', 'ionMdInput'])
	.controller('LoginCtrl', LoginCtrl);
	function LoginCtrl($scope,$state, LOCALSTORAGE, $sce, LoginsService, $window, $ionicLoading, 
		$ionicModal, $timeout, $mdDialog, $cordovaInAppBrowser){
		var vm = this;
		$scope.modal = {};
		vm.data ={};
		vm.signin = signin;
		vm.signup = signup;
		vm.login = login;
		vm.resetPassword = resetPassword;
		vm.modalShowResetPassword = modalShowResetPassword;
		vm.modalShowTermos = modalShowTermos;
		vm.cancel = cancel;
		vm.data.loginForm=true;
		vm.searchText ="";

		try{
			var user = JSON.parse($window.localStorage.getItem('userInfo'));
			if(user.email.length > 0 && user.password.length > 0){
				$state.go('app.home');
			}
			
		}catch(err){

		}

		$ionicModal.fromTemplateUrl('templates/modal.html', {
			scope: $scope
		}).then(function(modal) {
			$scope.modal.login_fail = modal;	   
		});


		$ionicModal.fromTemplateUrl('templates/change_password.html', {
			scope: $scope
		}).then(function(modal) {
			$scope.modal.change_password = modal;	   
		});
		

		function modalShowResetPassword(ev){
			$mdDialog.show({
				templateUrl: 'recoverPassword.tmpl.html',
				controller: LoginCtrl,
				controllerAs: 'vm',
				parent: angular.element(document.body),
				targetEvent: ev,
				clickOutsideToClose:true
			})
			.then(function(answer) {
				$scope.status = 'You said the information was "' + answer + '".';
			}, function() {
				$scope.status = 'You cancelled the dialog.';
			});

		}

		function modalShowTermos(ev){
			$mdDialog.show({
				templateUrl: 'termos.tmpl.html',
				controller: LoginCtrl,
				controllerAs: 'vm',
				parent: angular.element(document.body),
				targetEvent: ev,
				clickOutsideToClose:true
			})
			.then(function(answer) {
				$scope.status = 'You said the information was "' + answer + '".';
			}, function() {
				$scope.status = 'You cancelled the dialog.';
			});

		}

		function cancel () {
			console.log("cancel");
			$mdDialog.cancel();
		};

		function resetPassword(){
			LoginsService.resetPassword(vm.data)
			.then(function(res) {
				console.log(res);
				$scope.modal.reset_password.hide();
				$scope.modal.login_fail.show();
				if(res.error){
					$scope.message_modal=res.error;
				}
				else{
					$scope.message_modal="Siga instruções enviadas para seu e-mail";
				}	
			},function(data) {
				console.log(data);
				$scope.modal.login_fail.show();
				$scope.message_modal=data;
				$ionicLoading.hide();
			})
		}	
		
		function login(server){
			loading();
			var internalToken = Math.floor((Math.random() * 9999));
			LoginsService.login(server,internalToken)
			.then(function(res) {
				console.log(res);
				try{
					console.log("window.open");
					window.open = cordova.InAppBrowser.open;		
				}catch(err){
					$ionicLoading.hide();
				}
				//var w = window.open($sce.trustAsResourceUrl(res.data.uri), '_system', 'location=no');
				var w = window.open($sce.trustAsResourceUrl(res.data.uri), '_blank', 'location=no');
				//var w = window.open('http://www.twitter.com/nraboy','_blank', 'location=yes');
				if (ionic.Platform.isWebView()){
					console.log('using in app browser');
					w.addEventListener('loadstop', function (data) {
						console.log('load start');
						console.log(data.url);
					});

					getToken(internalToken,w);						
				}

			},function(data) {
				$scope.modal.login_fail.show();
				$scope.message_modal="Não foi possivel realizar o login.";
				$ionicLoading.hide();
				 w.close();
			})
			
		}
		function getToken(internalToken,window_login){
			console.log("getToken")
			console.log(window_login);
			LoginsService.getToken(internalToken)
			.then(function(res) {
				console.log(res.userInfo);
				$window.localStorage.setItem('userInfo', JSON.stringify(res.userInfo));			
				$scope.userInfo=JSON.parse($window.localStorage.getItem('userInfo'));
				$ionicLoading.hide();
				window_login.close();
				$state.go('app.home');
			},function(data) {
				console.log("Error");
				console.log(data);
				getToken(internalToken,window_login);
			})
		}

		function signin(form){
			loading();
			LoginsService.signin(vm.data)
			.then(function(res) {
				console.log(res);
				try{
					var userInfo = res.user;
					$window.localStorage.setItem('userInfo', JSON.stringify(userInfo));
					//$window.localStorage.setItem('userInfo', JSON.stringify(userInfo));
					vm.data.userInfo = JSON.parse($window.localStorage.getItem('userInfo'));
					$state.go('app.home');
					$ionicLoading.hide();
				}catch(err){
					$scope.modal.login_fail.show();
					$scope.message_modal="Não foi possivel realizar o login.";
					$ionicLoading.hide();
				}	

			},function(data) {
				$scope.modal.login_fail.show();
				$scope.message_modal="Não foi possivel realizar o login.";
				$ionicLoading.hide();
			})
		}

		function signup(form){
			console.log(vm.data);
			loading();
				LoginsService.signup(vm.data)
				.then(function(res) {
					console.log(res);
					try{
						var userInfo = res.user;
						$window.localStorage.setItem('userInfo', JSON.stringify(userInfo));
					//$window.localStorage.setItem('userInfo', JSON.stringify(userInfo));
					vm.data.userInfo = JSON.parse($window.localStorage.getItem('userInfo'));
					$state.go('app.home');
					$ionicLoading.hide();
				}catch(err){
					$scope.modal.login_fail.show();
					$scope.message_modal="Não foi possivel realizar o login.";
					$ionicLoading.hide();
				}	

			},function(data) {
				$scope.modal.login_fail.show();
				$scope.message_modal="Não foi possivel realizar o login.";
				$ionicLoading.hide();
			})
		}

		function loading(){

			$ionicLoading.show({
				content: 'Loading',
				animation: 'fade-in',
				showBackdrop: true,
				maxWidth: 200,
				showDelay: 0
			});

		}

	}

})(window.angular);