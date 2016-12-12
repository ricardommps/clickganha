(function (angular) {

  'use strict';
  angular.module('api.promotion.router', [])
  .config(config);
  function config($stateProvider) {
    $stateProvider

    .state('app.promotion', {
      url: '/promotion/:promotionId',
      cache: false,
      views: {
        'menuContent': {
          templateUrl: 'js/promotion/promotion.html',
          controller: 'PromotionCtrl as vm'
        }
      }
    })

    .state('app.promotion-category', {
      url: '/promotion/category',
      cache: false,
      views: {
        'menuContent': {
          templateUrl: 'js/promotion/promotion-category.html',
          controller: 'PromotionCategoryCtrl as vm'
        }
      }
    });
  }
  

})(window.angular);


