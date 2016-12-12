(function (angular) {

  'use strict';
  
  angular.module('api.cupons.controllers', ['starter.services'])

  .controller('CupomConfirmeCtrl', CupomConfirmeCtrl);
  
  function CupomConfirmeCtrl($scope, $stateParams, $http, $state, LOCALSTORAGE, $rootScope, CuponsService){
    var user = JSON.parse(localStorage.getItem(LOCALSTORAGE.key));
    if(!user){
      $state.go('login');
    }
    var vm = this;
    vm.data = {};
    couponDetails();
    function couponDetails(){
      CuponsService.couponDetails($state.params.id)
      .then(function(res) {
        if(res.status == "200"){
          vm.data = res.data;
        }
        
        
      },function(data) {
        console.log("ERROR");
            //modal();
        })
    }

    
  }
  
})(window.angular);


