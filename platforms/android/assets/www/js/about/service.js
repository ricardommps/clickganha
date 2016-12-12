(function(angular) {
 'use strict';
 
 angular
       .module('api.about.service',[]) // Define a qual módulo seu .service pertence
       .factory('AboutService', AboutService); //Define o nome a função do seu .service

       function AboutService($q, $http,API_URL,$stateParams, $httpParamSerializer) {

         var vm = this;
         vm.service ={
           about  : about
         };
         return vm.service;

         function about() {
          var def = $q.defer();
          http.get(API_URL.url + '/coupons')
          .then(function(res){
            def.resolve(res);

          },function(data) {
           def.reject("Failed List All Cupons");
         })
          
          return def.promise;
        }
      }
    })(window.angular);


