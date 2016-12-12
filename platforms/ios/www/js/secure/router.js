(function (angular) {

  'use strict';
  angular.module('api.secure.router', [])
  .config(config);
  function config($stateProvider) {
    $stateProvider
    .state('secure', {
      url: '/secure',
      views: {
        'menuContent': {
          templateUrl: 'js/secure/secure.html',
          controller: 'SecureCtrl as vm'
        }
      }
    });
  }
  

})(window.angular);


