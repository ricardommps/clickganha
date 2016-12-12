(function (angular) {

  'use strict';

  angular.module('api.about.controllers', ['starter.services'])


  .controller('AboutCtrl',AboutCtrl);

  function AboutCtrl($scope, $stateParams, LOCALSTORAGE, AboutService, $rootScope){
    var user = JSON.parse(localStorage.getItem(LOCALSTORAGE.key));
    if(!user){
      $state.go('login');
    }

    var vm = this;
    vm.data = {};
    
    function userAdvertisings(){
      AboutService.about()
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





