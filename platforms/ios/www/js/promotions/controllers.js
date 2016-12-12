(function (angular) {

	'use strict';
	angular.module('api.promotions.controllers', [])
	.controller('PromotionsCtrl', controller);
	function controller($scope, PromotionsService, CuponsService){
		var vm = this;
		vm.data ={};
		vm.openPromotion = openPromotion;
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

	    function activeCoupons(){

	      
	    }

	    function openPromotion(_id){

	    }

	}

})(window.angular);