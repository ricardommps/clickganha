(function(angular) {
 'use strict';
 
 angular
       .module('api.posts.service',[]) // Define a qual módulo seu .service pertence
       .factory('PostsService', PostsService); //Define o nome a função do seu .service

       function PostsService($q, $http,API_URL,$stateParams) {

         var vm = this;
         vm.service ={
           categories  : categories,
           filter      : filter
         };
         return vm.service;


         function categories() {
          var def = $q.defer();
          $http.get(API_URL.url + '/post-categories/'+$stateParams.categoryId)
          .then(function(res){ 
            def.resolve(res.data['post category']);

          })
          
          return def.promise;
        }

        function filter(){
          var def = $q.defer();
          $http.get(API_URL.url + '/posts?filter=[{"categories":"'+$stateParams.categoryId+'"}]')
          .then(function(res){
            def.resolve(res.data["posts"]);
          })
          .catch(function(res){
            def.reject("Error: "+res.data);
          })

          return def.promise;
        }

      }
    })(window.angular);


