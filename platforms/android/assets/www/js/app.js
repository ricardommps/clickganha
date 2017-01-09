  // Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', [
  'ionic',
  'ngMap',
  'ngCordova',
  'ngMaterial',
  'ngComboDatePicker',
  'api.login.controllers',
  'api.login.router',
  'api.login.service',
  'api.menu.router',
  'api.menu.controllers',
  'api.termos.directives',
  'api.about.controllers',
  'api.about.router',
  'api.about.service',
  'api.home.controllers',
  'api.home.router',
  'api.home.service',
  'api.secure.controllers',
  'api.secure.router',
  'api.anuncio.controllers',
  'api.anuncio.router',
  'api.cupons.controllers',
  'api.cupons.router',
  'api.cupons.service',
  'api.campanhas.controllers',
  'api.campanhas.router',
  'api.campanhas.service',
  'api.configuracoes.controllers',
  'api.configuracoes.router',
  'api.configuracoes.service',
  'api.posts.controllers',
  'api.posts.service',
  'api.posts.router',
  'api.post.controllers',
  'api.post.service',
  'api.post.router',
  'api.profile.controllers',
  'api.profile.service',
  'api.profile.router',
  'api.faq.controllers',
  'api.faq.service',
  'api.faq.router',
  'api.rbs.controllers',
  'api.rbs.service',
  'api.rbs.router',
  'api.promotions.controllers',
  'api.promotions.service',
  'api.promotions.router',
  'api.promotion.controllers',
  'api.promotion.service',
  'api.promotion.router',
  'api.checkout.controllers',
  'api.checkout.service',
  'api.checkout.router',
  'starter.constants'])

.config(function($mdThemingProvider) {
  $mdThemingProvider.theme('default')
    .primaryPalette('green')
    .accentPalette('orange');
})
.run(function($ionicPlatform, $rootScope, $timeout) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    //ionic.Platform.fullScreen();
    
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
    window.cordova.plugins.notification.local.onadd = function(id, state, json){
      var notification = {
        id: id,
        state: state,
        json : json
      }

      $timeout(function () {
        $rootScope.$broadcast('$cordovaLocalNotification:added', notification);
      });
    }
  });
})

.config(['$httpProvider', '$provide', function ($httpProvider, $provide) {
  $provide.factory('requestInterceptorChangeDeleteToPost', function () { 
    return {
      request: function (request) {
        if (request.method === 'PUT') {
          request.headers = request.headers || {}; 
          request.headers['X-HTTP-Method-Override'] = 'PATCH';
          request.headers['X-Requested-With'] = 'XMLHttpRequest';
          request.headers['content-type'] = 'application/x-www-form-urlencoded';
        }
        return request; 
      }
    };
  });

  $httpProvider.interceptors.push('requestInterceptorChangeDeleteToPost'); 
}])

.config(['$httpProvider', function($httpProvider) {
  $httpProvider.defaults.headers.common = {};
  $httpProvider.defaults.headers.post = {};
  $httpProvider.defaults.headers.put = {};
  $httpProvider.defaults.headers.patch = {};
  $httpProvider.defaults.useXDomain = true;
  //$httpProvider.defaults.headers.common["X-Requested-With"] = 'XMLHttpRequest';
  delete $httpProvider.defaults.headers.common['X-Requested-With'];
 
}])

.controller('balanceOfPoints', function($scope, $rootScope, PromotionsService, CampanhasService) {
  console.log('balanceOfPoints');
  var totalPointsPromotions = 0;
  var totalPointsAdvertisings = 0;

  listUserAdvertisings();

  function totalPoints(){
    console.log("totalPointsAdvertisings:"+totalPointsAdvertisings);
    console.log("totalPointsPromotions:"+totalPointsPromotions);
    var totalPointsNum = parseInt(totalPointsAdvertisings) - parseInt(totalPointsPromotions);
    $rootScope.totalPoints = totalPointsNum;
    $rootScope.$broadcast('updateTotalPoints');
  }

  function listUserPromotions(){

    PromotionsService.listUserPromotions()
    .then(function(res) {
      if(res.status == "200"){
        totalPointsPromotions = 0;
        var userPromotions = res.data['user-promotions'];
        for(var i in userPromotions){
          
          if(userPromotions[i].pointAmount != undefined){
            totalPointsPromotions = totalPointsPromotions + parseInt(userPromotions[i].pointAmount);
          }
          

        }
        totalPoints();

      }else{
        console.log(res.statusText);
      }


    },function(data) {
      console.log("ERROR");
      //modal();
    })
  }

  function pointsAdvertisings(){
    console.log("pointsAdvertisings");
  }

  function listUserAdvertisings(){
    console.log("listUserAdvertisings");
    
      CampanhasService.listUserAdvertisings()
      .then(function(res) {
        console.log("CampanhasService.listUserAdvertisings");
        if(res.status == "200"){
          totalPointsAdvertisings = 0;
          var userAdvertisings = {};
          userAdvertisings = res.data['user-advertisings'];
            
          for(var i in userAdvertisings){
            totalPointsAdvertisings = parseInt(totalPointsAdvertisings) + parseInt(userAdvertisings[i].pointAmount);

          }
          listUserPromotions();
        }else{
          console.log(res.statusText);
        }
        

      },function(data) {
        console.log("ERROR");
      //modal();
      })

    }
  

  $scope.$on("root_totalPoints",function () {
    console.log("root_totalPoints");
    listUserAdvertisings();  
  });
})
