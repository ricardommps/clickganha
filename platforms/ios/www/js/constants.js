angular.module('starter.constants', [])
 
.constant('API_ENDPOINT', {
  	//url: 'http://localhost:3000/api'
   //url: 'http://177.38.215.19:3000/api'
  	url: 'https://app-clickganhe.herokuapp.com/api'
  // For a simulator use: url: 'http://127.0.0.1:8080/api'
})
.constant('AUTH_API_URL',{	

	url:'https://app.conektta.com.br:8881/api/auth'
})
.constant('API_URL',{

	url:'https://app.conektta.com.br/api'
})
.constant('PAYMENT_API_URL',{

	url:'https://app.conektta.com.br:8882/api'
})
.constant('LOCALSTORAGE', {

	key: 'userInfo'

});