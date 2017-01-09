(function() {

  "use strict";

  angular.module("api.termos.directives",[])

  .directive('termos', function () {
    return {
      restrict:'E',
      replace:true,
      cache:false,
      templateUrl: 'js/termos/termos.html',
      scope: {
        //if there were attributes it would be shown here
      },
      link:function (scope, element, attrs, ctrl) {
        // DOM manipulation may happen here.
      }
    }
  })

// you may add as much directives as you want below
}());