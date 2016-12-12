(function (angular) {

  'use strict';

  angular.module('api.anuncio.controllers', ['starter.services'])


  .controller('AnuncioCtrl',controller);

  function controller($scope, $stateParams, LOCALSTORAGE, CampanhasService, $rootScope){
    var user = JSON.parse(localStorage.getItem(LOCALSTORAGE.key));
    if(!user){
      $state.go('login');
    }

    var vm = this;
    vm.advertising = $stateParams.advertising;
    vm.userAdvertisings = {
      user        : user._id,
      advertising : vm.advertising._id,
      pointAmount : 1,
      createdAt   : new Date() 

    };

    userAdvertisings();

    function userAdvertisings(){
      CampanhasService.userAdvertisings(vm.userAdvertisings)
      .then(function(res) {
        if(res.status == "200"){
          $rootScope.$broadcast('root_totalPoints');
        }
        
      },function(data) {
        console.log("ERROR");
      //modal();
      })
    }
   
  }

})(window.angular);





