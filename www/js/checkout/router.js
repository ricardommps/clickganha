(function (angular) {

  'use strict';
  angular.module('api.checkout.router', [])
  .config(config);
  function config($stateProvider) {
    $stateProvider

    .state('app.checkout', {
      url: '/checkout',
      views: {
        'menuContent': {
          templateUrl: 'js/checkout/checkout.html',
          controller: 'CheckoutCtrl as vm'
        }
      },
      params: {
        promotion: null
      }
    })

    .state('app.checkout-success', {
      url: '/checkout-success',
      views: {
        'menuContent': {
          templateUrl: 'js/checkout/checkout_success.html',
          controller: 'CheckoutSuccessCtrl as vm'
        }
      }
    })

    .state('app.checkout-error', {
      url: '/checkout-error',
      views: {
        'menuContent': {
          templateUrl: 'js/checkout/checkout_error.html',
          controller: 'CheckoutErrorCtrl as vm'
        }
      }
    });


  }
  

})(window.angular);


