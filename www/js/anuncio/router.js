(function (angular) {

  'use strict';
  angular.module('api.anuncio.router', [])
  .config(config);
  function config($stateProvider) {
    $stateProvider
    .state('app.anuncio', {
      url: '/anuncio',
      cache: false,
      views: {
        'menuContent': {
          templateUrl: 'js/anuncio/anuncio.html',
          controller: 'AnuncioCtrl as vm'
        }
      },
      params: {
        advertising: null
      }
    });
  }
  

})(window.angular);


