(function(angular) {
 'use strict';
 
 angular
       .module('api.promotion.service',[]) // Define a qual módulo seu .service pertence
       .factory('PromotionService', PromotionService); //Define o nome a função do seu .service

       function PromotionService($q, $http,API_URL,$stateParams,  $httpParamSerializer) {

         var vm = this;
         vm.service ={
           promotionDetails   : promotionDetails,
           promotionCategory  : promotionCategory,
           userPromotions     : userPromotions
         };
         return vm.service;


         function promotionDetails(_id) {
          var def = $q.defer();
          $http.get(API_URL.url + '/promotions/'+_id)
          .then(function(res){
            def.resolve(res);

          },function(data) {
           def.reject("Failed List All Advertisings");
         })
          
          return def.promise;
        }

        function userPromotions(promotion){
          var def = $q.defer();
          $http({
            async: true,
            crossDomain: true,
            method  : 'POST',
            url     : API_URL.url + '/user-promotions',
            data: $httpParamSerializer(promotion),
            headers : { 'Content-Type': 'application/x-www-form-urlencoded' }  // set the headers so angular passing info as form data (not request payload)
          })
          .then(function(res){ 
            def.resolve(res);

          },function(data) {
           def.reject("Failed Save Advertisings");
         })
          
          return def.promise;
        }

        function promotionCategory() {
          var def = $q.defer();
          $http.get(API_URL.url + '/promotion-categories')
          .then(function(res){ 
            def.resolve(res.data['promotion-categories']);

          })
          
          return def.promise;
        }

      }
    })(window.angular);



