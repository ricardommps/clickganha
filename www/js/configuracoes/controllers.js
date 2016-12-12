(function (angular) {

  'use strict';
  angular.module('api.configuracoes.controllers', ['ionMdInput','ion-datetime-picker', 'ngCordova'])


  .controller('ConfigCtrl',controller);

  function controller($scope, PlaylistsServices, $state, LOCALSTORAGE, ConfigurationsService, $cordovaLocalNotification){
    var user = JSON.parse(localStorage.getItem(LOCALSTORAGE.key));
    if(!user){
      $state.go('login');
    }
    
    var vm = this;
    vm.data ={};
    vm.data.username = user.username;
    vm.minDate = moment().hour(0).minute(10).second(0).milliseconds(0).toDate();

    ConfigurationsService.getConfigurations(vm.data).then(function(result) {
        if(result.data.length > 0){
          vm.data = result.data[0];
          vm.data.timernotifications = moment(vm.data.timernotifications).second(0).milliseconds(0).toDate();
          if(vm.data.timernotifications == "undefined" || vm.data.timernotifications == 0){
            vm.data.timernotifications = moment().hour(0).minute(10).second(0).milliseconds(0).toDate();

          }

        }else{
          vm.data.timernotifications = moment().hour(0).minute(10).second(0).milliseconds(0).toDate();
        }
    });


    function setConfigurations(){
      if(vm.data.notifications == false){
        vm.data.timernotifications = moment().hour(0).minute(10).second(0).milliseconds(0).toDate();
      }else{
        startNotification();
      }
      vm.data.username = user.username;
      /*
      
      console.log(seconds*1000);
      */
      
      ConfigurationsService.setConfigurations(vm.data).then(function(result) {

      });
    }

    $scope.$on('$ionicView.beforeLeave', function() {
      setConfigurations();
        //alert("");
      });


    function startNotification() {
      var h = addZero(vm.data.timernotifications.getHours());
      var m = addZero(vm.data.timernotifications.getMinutes());
      var s = addZero(vm.data.timernotifications.getSeconds());
      var seconds = (+h) * 60 * 60 + (+m) * 60 + (+s); 

      var now = new Date().getTime();
      var _10SecondsFromNow = new Date(now + 10 * 1000);

      $cordovaLocalNotification.add({
        id: "1", //informo um id único para a notificação
        date: _10SecondsFromNow,
        message: "Agendado a 1 hora!", //mensagem da notificação
        title: "Teste Artigo no WebDevBr" //título da notificação
      }).then(function () {
        console.log("Notificação agendada"); //executa alguma ação caso a notificação seja agendada com sucesso
      });

      $scope.isScheduled = function(){
        $cordovaLocalNotification.isScheduled("1").then(function(isScheduled){
          alert("Notification 1 Scheduled: "+isScheduled);

        })
      }


    }

    function addZero(i) {
      if (i < 10) {
        i = "0" + i;
      }
      return i;
    }


  }
  
})(window.angular);
