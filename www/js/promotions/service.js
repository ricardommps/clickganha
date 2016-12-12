(function(angular) {
 'use strict';
 
 angular
       .module('api.promotions.service',[]) // Define a qual módulo seu .service pertence
       .factory('PromotionsService', PromotionsService); //Define o nome a função do seu .service

       function PromotionsService($q, $http,API_URL,$stateParams) {

         var vm = this;
         vm.service ={
           listAllPromotions  : listAllPromotions,
           listUserPromotions : listUserPromotions
         };
         return vm.service;


         function listAllPromotions() {
          var def = $q.defer();
          $http.get(API_URL.url + '/promotions')
          .then(function(res){
            def.resolve(res);

          },function(data) {
           def.reject("Failed List All Advertisings");
         })
          
          return def.promise;
        }

        function listUserPromotions(){
          var def = $q.defer();
          $http.get(API_URL.url + '/user-promotions')
          .then(function(res){ 
            def.resolve(res);

          },function(data) {
           def.reject("Failed List User Promotions");
         })
          
          return def.promise;
        }

      }
    })(window.angular);


