(function (angular) {

  'use strict';
  angular.module('api.profile.router', [])
  .config(config);
  function config($stateProvider) {
    $stateProvider
    .state('app.profile', {
      url: '/profile',
      views: {
        'menuContent': {
          templateUrl: 'js/profile/profile.html',
          controller: 'ProfileCtrl as vm'
        }
      }
    });
  }
  

})(window.angular);


