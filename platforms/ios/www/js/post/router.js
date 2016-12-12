(function (angular) {

  'use strict';
  angular.module('api.post.router', [])
  .config(config);
  function config($stateProvider) {
    $stateProvider
    .state('app.post', {
      url: '/post/:postId',
      views: {
        'menuContent': {
          templateUrl: 'js/post/post.html',
          controller: 'PostCtrl as vm'
        }
      }
    });
  }
  

})(window.angular);


