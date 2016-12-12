(function (angular) {

  'use strict';
  angular.module('api.faq.router', [])
  .config(config);
  function config($stateProvider) {
    $stateProvider
    .state('app.faq', {
      url: '/faq',
      cache: false,
      views: {
        'menuContent': {
          templateUrl: 'js/faq/faq.html',
          controller: 'FaqCtrl as vm'
        }
      }
    });
  }
  

})(window.angular);


