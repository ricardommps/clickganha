(function (angular) {
  angular.module('api.cupons.router', [])

  .config(config);

  function config($stateProvider){
    $stateProvider
    .state('app.cupomConfirme', {
      url: '/cupomConfirme/:id',
      cache: false,
      views: {
        'menuContent': {
          templateUrl: 'js/cupons/cupomConfirme.html',
          controller: 'CupomConfirmeCtrl as vm'
        }
      }
    });
  }
})(window.angular);