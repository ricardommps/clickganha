(function(angular) {
 'use strict';
 
 angular
       .module('api.login.service',[]) // Define a qual módulo seu .service pertence
       .factory('LoginsService', LoginsService); //Define o nome a função do seu .service

       function LoginsService($q, $http, AUTH_API_URL, API_ENDPOINT) {

         var vm = this;
         vm.service ={
           creatUser      : creatUser,
           resetPassword  : resetPassword,
           signin         : signin,
           signup         : signup,
           login          : login,
           getToken       : getToken,
           resetPassword  : resetPassword
         };
         return vm.service

         vm.data ={};

         function creatUser(data) {
          var def = $q.defer();
          $http.post(API_ENDPOINT.url + '/creatUser',data)
          .success(function(data){
            def.resolve(data);
          })
          .error(function(){
            def.reject("Failed to crear user");
          });

          return def.promise;
        }

        function getToken(internalToken){
          console.log("Server getToken");
          var def = $q.defer();
          $http.get(AUTH_API_URL.url +'/login/getToken/'+internalToken,{
            headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
          })
          .then(function(res){ 
            console.log(res);
            def.resolve(res.data);

          },function(data) {
           def.reject("Failed");
         })
          
          return def.promise;

        }

        function resetPassword(){

        }

        function signup(data) {
          var def = $q.defer();
          var user = 'name='+data.form.name+'&password='+data.form.password+'&email='+data.form.email
          +'&name.first='+data.form.name.first+'&name.last='+data.form.name.last+'&gender='+data.form.gender
          +'&birthDate='+data.form.birthDate+'&username='+data.form.username
          console.log(user);
          $http.post(AUTH_API_URL.url + '/signup',user,{
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
          })
          .then(function(res){ 
            console.log(res);
            def.resolve(res.data);

          },function(data) {
           def.reject("Failed login");
         })
          
          return def.promise;
        }

        function signin(data) {
          var def = $q.defer();
          var user = 'username='+data.form.username+'&password='+data.form.password;
          console.log(user);
          $http.post(AUTH_API_URL.url + '/signin',user,{
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
          })
          .then(function(res){ 
            console.log(res);
            def.resolve(res.data);

          },function(data) {
           def.reject("Failed signin");
         })
          
          return def.promise;
        }



        function login(server,internalToken) {
          console.log("Service Login Google");
          var def = $q.defer();
          $http.post(AUTH_API_URL.url + '/login/' + server + "/" +internalToken,{
            headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
          })
          .then(function(res){ 
            console.log(res);
            def.resolve(res);

          },function(data) {
            console.log("Error Service Login google");
            console.log(data);
           def.reject("Failed login");
         })
          
          return def.promise;
        }

        function resetPassword(data){

          var def = $q.defer();
          console.log(data);
          var email = 'email='+data.form.email;
          $http.post(AUTH_API_URL.url + '/forgot',email,{
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
          })
          .then(function(res){ 
            console.log(res);
            def.resolve(res.data);

          },function(data) {
           def.reject("Failed Reset Password");
         })
          
          return def.promise;

        }

      }

    })(window.angular);


