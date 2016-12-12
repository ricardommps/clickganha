(function(angular) {
 'use strict';
 
 angular
       .module('api.faq.service',[]) // Define a qual módulo seu .service pertence
       .factory('FaqService', FaqService); //Define o nome a função do seu .service

       function FaqService($q, $http,API_URL) {

         var vm = this;
         vm.service ={
           faqCategories  : faqCategories,
           faqs           : faqs
         };
         return vm.service;


         function faqCategories(data) {
          var def = $q.defer();
          $http.get(API_URL.url + '/banner-categories?filter=[{"name":"faq"}]')
          .then(function(res){ 
            var category = res.data["banner-categories"][0].id;
            $http.get(API_URL.url + '/banners?filter=[{"categories":"'+category+'"}]')
            .then(function(res){
              def.resolve(res.data["banners"][0]);
            })
            .catch(function(res) {
             def.reject("Error: "+res.data);
           })

          })
          .catch(function(res) {
           def.reject("Error: "+res.data);
         })
          return def.promise;
        }

        function faqs(){
          var def = $q.defer();
          $http.get(API_URL.url + '/faqs')
          .then(function(res){
            def.resolve(res);
          })
          .catch(function(res){
            def.reject("Error: "+res.data);
          })

          return def.promise;
        }

      }
    })(window.angular);


