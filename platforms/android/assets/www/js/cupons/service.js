(function(angular) {
 'use strict';
 
 angular
       .module('api.cupons.service',[]) // Define a qual módulo seu .service pertence
       .factory('CuponsService', CuponsService); //Define o nome a função do seu .service

       function CuponsService($q, $http,API_URL,$stateParams, $httpParamSerializer) {

         var vm = this;
         vm.service ={
           generatorCoupons             : generatorCoupons,
           listAllCouponsForPromotions  : listAllCouponsForPromotions,
           listAllCouponsFilter         : listAllCouponsFilter,
           couponDetails                : couponDetails,
           updateStatusCoupon           : updateStatusCoupon
         };
         return vm.service;

         function listAllCouponsForPromotions(filter) {
          var def = $q.defer();
          $http.get(API_URL.url + '/coupons/?filter={"promotion":"' +  filter._idPromotion + '","status":"' + filter._idStatus + '"}')
          .then(function(res){
            def.resolve(res);

          },function(data) {
           def.reject("Failed List All Cupons");
         })
          
          return def.promise;
        }

        function listAllCouponsFilter(filter) {
          var def = $q.defer();
          $http.get(API_URL.url + '/coupons/?filter={"promotion":"' +  filter._idPromotion + '"}')
          .then(function(res){
            def.resolve(res);

          },function(data) {
           def.reject("Failed List All Cupons");
         })
          
          return def.promise;
        }

        function couponDetails(_id){
          var def = $q.defer();
          $http.get(API_URL.url + '/coupons/'+_id)
          .then(function(res){
            def.resolve(res);

          },function(data) {
           def.reject("Failed List All Cupons");
         })
          
          return def.promise;
        }



        function updateStatusCoupon(_id){
          var data = {
            status : "5836e8521328213ef529d3b7"
          };
          var def = $q.defer();
          $http({
            async: true,
            crossDomain: true,
            method  : 'POST',
            url     : API_URL.url + '/coupons/'+_id,
            data: $httpParamSerializer(data),
            headers : { 
              "x-http-method-override": "PATCH",
              'Content-Type': 'application/x-www-form-urlencoded' ,
            }

          })

          .then(function(res){ 
            def.resolve(res);

          },function(data) {
           def.reject("Failed Save Advertisings");
         })
          
          return def.promise;
        }

        function generatorCoupons(coupom){
          var def = $q.defer();
          $http({
            async: true,
            crossDomain: true,
            method  : 'POST',
            url     : API_URL.url + '/coupons',
            data: $httpParamSerializer(coupom),
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


