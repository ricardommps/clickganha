(function(angular) {
 'use strict';
 
 angular
       .module('api.home.service',[]) // Define a qual módulo seu .service pertence
       .factory('HomeService', HomeService); //Define o nome a função do seu .service

       function HomeService($q, $http,API_URL) {

         var vm = this;
         vm.service ={
           home       : home,
           sections   : sections,
           posts      : posts
         };
         return vm.service;


         function home(data) {
          var def = $q.defer();
          $http.get(API_URL.url + '/banner-categories?filter=[{"name":"home"}]')
          .then(function(res){ 
            try{
              var category = res.data["banner-categories"][0]._id;

              $http.get(API_URL.url + '/banners?filter=[{"categories":"'+category+'"}]')
                .then(function(res){
                  def.resolve(res.data["banners"]);
                })
                .catch(function(res) {
                 def.reject("Error: "+res.data);
               })

            }catch(err){
              def.reject("Error: "+err)
            }
            
          })
          .catch(function(res) {
           def.reject("Error: "+res.data);
         })
          return def.promise;
        }

        function sections(){
          var def = $q.defer();
          $http.get(API_URL.url + '/sections')
          .then(function(res){
            def.resolve(res.data);
          })
          .catch(function(res){
            def.reject("Error: "+res.data);
          })

          return def.promise;
        }

        function posts(){
          var def = $q.defer();
          $http.get(API_URL.url + '/posts?filter=[{"categories":"5787a59686104c8c34624974"}]')
          .then(function(res){
            def.resolve(res.data['posts']);
          })
          .catch(function(res){
            def.reject("Error: "+res.data);
          })

          return def.promise;
        }

      }
    })(window.angular);


