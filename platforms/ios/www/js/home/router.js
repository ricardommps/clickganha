(function (angular) {
  angular.module('api.home.router', ['starter.services'])

  .config(config);

  function config($stateProvider){
    $stateProvider
    .state('app.home', {
      url: '/home',
      cache: false,
      views: {
        'menuContent': {
          templateUrl: 'js/home/home.html',
          controller: 'HomerCtrl as vm'
        }
      }
    });
  }

})(window.angular);