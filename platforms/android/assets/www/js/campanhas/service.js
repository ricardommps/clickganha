(function(angular) {
 'use strict';
 
 angular
       .module('api.campanhas.service',[]) // Define a qual módulo seu .service pertence
       .factory('CampanhasService', CampanhasService); //Define o nome a função do seu .service

       function CampanhasService($q, $http,API_URL,$stateParams, $httpParamSerializer) {

         var vm = this;
         vm.service ={
           listAllAdvertisings  : listAllAdvertisings,
           listUserAdvertisings : listUserAdvertisings,
           userAdvertisings     : userAdvertisings,
           advertisingFilter    : advertisingFilter
         };
         return vm.service;


         function listAllAdvertisings() {
          var def = $q.defer();
          $http.get(API_URL.url + '/advertisings')
          .then(function(res){
            def.resolve(res);

          },function(data) {
           def.reject("Failed List All Advertisings");
         })
          
          return def.promise;
        }

        function listUserAdvertisings(){
          var def = $q.defer();
          $http.get(API_URL.url + '/user-advertisings')
          .then(function(res){ 
            def.resolve(res);

          },function(data) {
           def.reject("Failed Save Advertisings");
         })
          
          return def.promise;
        }

         function advertisingFilter(filter){
          var def = $q.defer();
          $http.get(API_URL.url + '/banners?filter=[' + filter + ']')
          .then(function(res){ 
            def.resolve(res);

          },function(data) {
           def.reject("Failed Save Advertisings");
         })
          
          return def.promise;
        }

        function userAdvertisings(advertisings){
          var def = $q.defer();
          $http({
            async: true,
            crossDomain: true,
            method  : 'POST',
            url     : API_URL.url + '/user-advertisings',
            data: $httpParamSerializer(advertisings),
            headers : { 'Content-Type': 'application/x-www-form-urlencoded' }  // set the headers so angular passing info as form data (not request payload)
          }

          )

          .then(function(res){ 
            def.resolve(res);

          },function(data) {
           def.reject("Failed Save Advertisings");
         })
          
          return def.promise;
        }

      }
    })(window.angular);


