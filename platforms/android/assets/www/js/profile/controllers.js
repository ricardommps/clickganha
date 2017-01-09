(function (angular) {

	'use strict';
	angular.module('api.profile.controllers', [])
	.controller('ProfileCtrl', controller);
	function controller($scope, ProfileService, $window, $state, LOCALSTORAGE, $rootScope){
		var user = JSON.parse(localStorage.getItem(LOCALSTORAGE.key));
	    if(!user){
	      $state.go('login');
	    }

		var vm = this;
		vm.data = {};

		vm.user = user;
		$rootScope.$broadcast('title', {title : "Perfil"});

		userProfiles();

		function userProfiles(){
	      ProfileService.userProfiles(user._id)
	      .then(function(res) {
	        if(res.status == "200"){
	          //vm.data = res.data.advertisings;
	          console.log(res);
	        }else{
	          console.log(res.statusText);
	        }
	        

	      },function(data) {
	        console.log("ERROR");
	      //modal();
	      })
	    } 
	}

})(window.angular);