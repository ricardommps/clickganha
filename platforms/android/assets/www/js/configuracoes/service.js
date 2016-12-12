(function(angular) {
 'use strict';
 
angular
       .module('api.configuracoes.service',[]) // Define a qual módulo seu .service pertence
       .factory('ConfigurationsService', ConfigurationsService); //Define o nome a função do seu .service
 
       function ConfigurationsService($q, $http,API_ENDPOINT) {
 
         var vm = this;
         vm.service ={
           setConfigurations : setConfigurations,
           getConfigurations : getConfigurations
         };
         return vm.service

  
         function setConfigurations(data) {
          var def = $q.defer();
          $http.post(API_ENDPOINT.url + '/configurations',data)
            .success(function(data){
              def.resolve(data);
            })
            .error(function(){
              def.reject("Failed to applying configurations");
           });

          return def.promise;
         }

         function getConfigurations(data){

          var def = $q.defer();
          $http.post(API_ENDPOINT.url + '/getConfigurations',data)
            .success(function(data){
              def.resolve(data);
            })
            .error(function(){
              def.reject("Failed to applying configurations");
           });

          return def.promise;

         }

         
   
       }
})(window.angular);


