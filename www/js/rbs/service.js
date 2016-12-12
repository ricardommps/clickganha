(function(angular) {
 'use strict';
 
 angular
       .module('api.rbs.service',[]) // Define a qual módulo seu .service pertence
       .factory('RBSService', RBSService); //Define o nome a função do seu .service

       function RBSService($q, $http,API_URL) {

        var vm = this;
        vm.service ={
         rbsBanners   : rbsBanners,
         rbs          : rbs
       };
       return vm.service;


       function rbs() {
          var def = $q.defer();
          $http.get(API_URL.url + '/rbs')
          .then(function(res){
            def.resolve(res);

          },function(data) {
           def.reject("Failed List All RBS");
         })
          
          return def.promise;
        }


       function rbsBanners() {
        var def = $q.defer();
        $http.get(API_URL.url + '/banners?filter=[{"title":"wifi"}]')
        .then(function(res){ 
          def.resolve(res.data["banners"][0]);

        })

        return def.promise;
      };


    }
  })(window.angular);


