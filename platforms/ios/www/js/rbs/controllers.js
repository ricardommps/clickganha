(function (angular) {

	'use strict';
	angular.module('api.rbs.controllers', [])
	.controller('RBSCtrl', controller);
	function controller($scope, RBSService, $cordovaGeolocation,CampanhasService){
		var vm = this;
		vm.data ={};

		var filter ={"title":"wifi"};
		listAllRBS();

		function listAllRBS(){
	      RBSService.rbs()
	      .then(function(res) {
	        if(res.status == "200"){
	          vm.data = res.data.rbs;
	          console.log(vm.data);
	          configMaps();
	          advertisingFilter();
	          
	        }else{
	          console.log(res.statusText);
	        }
	        

	      },function(data) {
	        console.log("ERROR");
	      //modal();
	      })
	    }

	    function advertisingFilter(){
	      CampanhasService.advertisingFilter(filter)
	      .then(function(res) {
	        if(res.status == "200"){
	          console.log(vm.data);
	          
	        }else{
	          console.log(res.statusText);
	        }
	        

	      },function(data) {
	        console.log("ERROR");
	      //modal();
	      })
	    }

	    function configMaps(){
	    	for(var i in vm.data){
	    		//console.log(vm.data[i]);
	    		vm.data[i].center = [parseFloat(vm.data[i].circle.center.lat, 10),parseFloat(vm.data[i].circle.center.lng, 10)];
	    	}
	    } 
		

	}

})(window.angular);