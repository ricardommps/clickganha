(function (angular) {

  'use strict';
  angular.module('api.about.router', [])
  .config(config);
  function config($stateProvider) {
    $stateProvider
    .state('app.about', {
      url: '/about',
      cache: false,
      views: {
        'menuContent': {
          templateUrl: 'js/about/about.html',
          controller: 'AboutCtrl as vm'
        }
      }
    });
  }
  

})(window.angular);


