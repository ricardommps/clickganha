(function (angular) {

  'use strict';
  angular.module('api.posts.router', [])
  .config(config);
  function config($stateProvider) {
    $stateProvider
    .state('app.posts', {
      url: '/posts/:categoryId',
      views: {
        'menuContent': {
          templateUrl: 'js/posts/posts.html',
          controller: 'PostsCtrl as vm'
        }
      }
    });
  }
  

})(window.angular);


