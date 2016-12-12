(function (angular) {

  'use strict';
  angular.module('api.promotions.router', [])
  .config(config);
  function config($stateProvider) {
    $stateProvider
    .state('app.promotions', {
      url: '/promotions',
      cache: false,
      views: {
        'menuContent': {
          templateUrl: 'js/promotions/promotions.html',
          controller: 'PromotionsCtrl as vm'
        }
      }
    });
  }
  

})(window.angular);


