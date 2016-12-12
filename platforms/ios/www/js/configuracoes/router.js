(function (angular) {

  'use strict';
  angular.module('api.configuracoes.router', [])
  .config(config);
  function config($stateProvider) {
    $stateProvider
    .state('app.configuracoes', {
      url: '/configuracoes',
      cache: false,
      views: {
        'menuContent': {
          templateUrl: 'js/configuracoes/configuracoes.html',
          controller: 'ConfigCtrl as vm'
        }
      }
    });
  }
  

})(window.angular);


