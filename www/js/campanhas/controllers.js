(function (angular) {

  'use strict';
  
  angular.module('api.campanhas.controllers', ['starter.services'])

  .controller('CampanhasCtrl', controller);
  
  function controller($scope, $stateParams, $http, $state, LOCALSTORAGE, CampanhasService, $rootScope, PromotionsService){
    var user = JSON.parse(localStorage.getItem(LOCALSTORAGE.key));
    if(!user){
      $state.go('login');
    }
    var vm = this;
    vm.data = {};
    vm.openAdvertising = openAdvertising;
    vm.totalPoints = $rootScope.totalPoints

    listAllAdvertisings();

    $scope.$on("updateTotalPoints",function () {
      vm.totalPoints = $rootScope.totalPoints; 
    });

    function openAdvertising(data){
      $state.go('app.anuncio', {advertising:data});
    }


    function listAllAdvertisings(){
      CampanhasService.listAllAdvertisings()
      .then(function(res) {
        if(res.status == "200"){
          vm.data = res.data.advertisings;
          vm.data.amount = 10;
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


