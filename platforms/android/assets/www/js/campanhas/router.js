(function (angular) {
  angular.module('api.campanhas.router', [])

  .config(config);

  function config($stateProvider){
    $stateProvider
    .state('app.campanhas', {
      url: '/campanhas',
      cache: false,
      views: {
        'menuContent': {
          templateUrl: 'js/campanhas/campanhas.html',
          controller: 'CampanhasCtrl as vm'
        }
      }
    });
  }
})(window.angular);