(function (angular) {

  'use strict';
  angular.module('api.rbs.router', [])
  .config(config);
  function config($stateProvider) {
    $stateProvider
    .state('app.rbs', {
      url: '/rbs',
      cache: false,
      views: {
        'menuContent': {
          templateUrl: 'js/rbs/rbs.html',
          controller: 'RBSCtrl as vm'
        }
      }
    });
  }
  

})(window.angular);


