(function (angular) {

	'use strict';
	angular.module('api.home.controllers', ['starter.services'])


	.controller('HomerCtrl',controller);

	function controller($scope, $rootScope, PromotionsService, $state, LOCALSTORAGE, PromotionService, HomeService){
		try{
		    vm.data.userInfo=JSON.parse(localStorage.getItem(LOCALSTORAGE.key));
		    vm.data.userInfo.email;
		}catch(err)
		{
		    ///$state.go("login");
		}
		
		var vm = this;
		vm.data = {};
		vm.totalPoints = $rootScope.totalPoints;


		$scope.$on("updateTotalPoints",function () {
			vm.totalPoints = $rootScope.totalPoints; 
		});
		listAllPromotions();

		function listAllPromotions(){

	      PromotionsService.listAllPromotions()
	      .then(function(res) {
	        if(res.status == "200"){
	        	vm.data = res.data;
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
