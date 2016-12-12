(function (angular) {
  angular.module('api.login.router', [])

  .config(config);

  function config($stateProvider,$urlRouterProvider){
   $stateProvider

   .state('login', {
    url: '/login',
    cache: false,
    templateUrl: 'js/login/login.html',
    controller:'LoginCtrl as vm'
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/login');
}

})(window.angular);