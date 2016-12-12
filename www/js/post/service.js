(function(angular) {
 'use strict';
 
 angular
       .module('api.post.service',[]) // Define a qual módulo seu .service pertence
       .factory('PostService', PostService); //Define o nome a função do seu .service

       function PostService($q, $http,API_URL,$stateParams) {

         var vm = this;
         vm.service ={
           posts : posts
         };
         return vm.service;


         function posts() {
          var def = $q.defer();
          $http.get(API_URL.url + '/posts/'+$stateParams.postId)
          .then(function(res){ 
            def.resolve(res.data['post']);

          })
          
          return def.promise;
        }
      }
    })(window.angular);


