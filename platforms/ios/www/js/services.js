angular
  .module('starter.services',[])
  .service('PlaylistsServices', function($q, $http,API_ENDPOINT) {
 
  var anuncio = function(playlistId){
    return $q(function(resolve, reject) {
      $http.get('http://adserver.conektta.com.br/revive/www/api/v4/api/public/advertise/banner/'+playlistId)
      .then(function(result) {
          console.log(result);
         resolve(result.data);
      }).catch(function (err) {
          reject("Algo deu errado:"+err.statusText);
      });
    });
  }

  var credits = function(user) {
    return $q(function(resolve, reject) {
      $http.post(API_ENDPOINT.url + '/credits',user).then(function(result) {
        if (result.data.success) {
          resolve(result.data.data);
        } else {
          reject(result.data);
        }
      });
    });
  };

  var contClick = function(banner) {
    return $q(function(resolve, reject) {
      $http.post(API_ENDPOINT.url + '/credit', banner).then(function(result) {
        console.log(result);
        if (result.data.success) {
          resolve(result.data.msg);
        } else {
          reject(result.data.msg);
        }
      });
    });
  };

  var banners = function(banner) {
    var url ="http://adserver.conektta.com.br/revive/www/api/v4/api/public/advertise/banners/8";
    return $q(function(resolve, reject) {
      $http.get(url).then(function(result) {
        if (result.data.length > 0) {
          resolve(result.data);
        } else {
          reject(result.data);
        }
      });
    });
  };


  return {
    anuncio:anuncio,
    contClick:contClick,
    credits :credits,
    banners: banners
  }
})

