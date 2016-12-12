(function(angular) {
 'use strict';
 
 angular
       .module('api.checkout.service',[]) // Define a qual módulo seu .service pertence
       .factory('CheckoutService', CheckoutService); //Define o nome a função do seu .service

       function CheckoutService($q, $http,API_URL,$stateParams) {

         var vm = this;
         vm.service ={
           transaction  : transaction,
           pay          : pay
         };
         return vm.service;


         function transaction(code) {
          var def = $q.defer();
          $http.get(PAYMENT_API_URL.url + '/pagseguro/verifyTransaction/'+code)
          .then(function(res){ 
            def.resolve(res.data);

          })
          
          return def.promise;
        }

        function pay(data) {
          var def = $q.defer();

          $http.post(PAYMENT_API_URL.url + '/pagseguro',data)
          .then(function(res){ 
            def.resolve(res.data.code);

          })
          
          return def.promise;
        }

      }
    })(window.angular);


