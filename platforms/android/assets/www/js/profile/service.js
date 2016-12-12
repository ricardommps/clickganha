(function(angular) {
 'use strict';
 
 angular
       .module('api.profile.service',[]) // Define a qual módulo seu .service pertence
       .factory('ProfileService', ProfileService); //Define o nome a função do seu .service

       function ProfileService($q, $http,API_URL,$stateParams) {
    
        var vm = this;
        vm.service ={
         orders       : orders,
         userProfiles : userProfiles
       };
       return vm.service;


       function orders(userInfo) {
        var def = $q.defer();
        $http.get(API_URL.url + '/orders?filter=[{"email":"'+userInfo.email+'"}]')
        .then(function(res){ 
          def.resolve(res.data.orders);

        })

        return def.promise;
      }

      function userProfiles(userId){

        var def = $q.defer();
          $http.get(API_URL.url + '/user-profiles/'+userId)
          .then(function(res){
            def.resolve(res);

          },function(data) {
           def.reject("Failed List All Profile");
         })
          
          return def.promise;

      }
    }
  })(window.angular);


