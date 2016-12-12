(function (angular) {

	'use strict';
	angular.module('api.promotion.controllers', [])
	.controller('PromotionCtrl', PromotionCtrl)
	.controller('PromotionCategoryCtrl', PromotionCategoryCtrl);
	function PromotionCtrl($scope, PromotionService,$state, 
		$ionicModal, LOCALSTORAGE, $rootScope, CuponsService, $mdDialog){

		var user = JSON.parse(localStorage.getItem(LOCALSTORAGE.key));
		if(!user){
			$state.go('login');
		}

		var vm = this;
		vm.data ={};
		vm.validation = {};
		vm.buy = buy;
		vm.confirmBuy = _confirmBuy;
		vm.validationBuy = validationBuy;
		vm.modalShowConfirmBuy = modalShowConfirmBuy;
		vm.modal = {};
		vm.totalPoints = $rootScope.totalPoints;
		var cupom = {};

		function validationBuy(){

			if(vm.totalPoints < vm.data.promotion.price_amount){
				vm.validation.points = true;
				vm.popSaldo();

			}else{
				vm.validation.points = false;
			}

			validationCoupons();

		}

		$scope.$on("updateTotalPoints",function () {

			vm.totalPoints = $rootScope.totalPoints;
			validationBuy(); 
		});

		promotionDetails();

		function promotionDetails(){

			PromotionService.promotionDetails($state.params.promotionId)
			.then(function(res) {
				if(res.status == "200"){
					vm.data = res.data;
					validationBuy();
				}else{
					vm.validation.points = true;
					console.log(res.statusText);
				}

			},function(data) {
				vm.validation.points = true;
				console.log("ERROR");
		      //modal();
		  })

		}

		function modalShowConfirmBuy(ev){
			$mdDialog.show({
				templateUrl: 'modalConfirmBuy.tmpl.html',
				controller: PromotionCtrl,
				controllerAs: 'vm',
				parent: angular.element(document.body),
				targetEvent: ev,
				clickOutsideToClose:true
			})
			.then(function(answer) {
				$scope.status = 'You said the information was "' + answer + '".';
			}, function() {
				$scope.status = 'You cancelled the dialog.';
			});

		}

		function buy(){
			vm.modal.modalConfirmBuy.show();
			$scope.title_modal = "Confirmar compra";
			$scope.message_modal="Esta promoção custa " + vm.data.promotion.price_amount +
			" pontos. Podemos confirmar sua compra?";
			//$state.go('app.checkout', {promotion:vm.data.promotion});
		}

		function validationCoupons(){
			var filter = {
				_idPromotion	: vm.data.promotion._id,
				_idStatus 		: "5836e8411328213ef529d3b5"
			}
			
			CuponsService.listAllCouponsForPromotions(filter)
			.then(function(res) {
				if(res.status == "200"){
					cupom = res.data.coupons[0];
					if(cupom == undefined){
						vm.validation.coupons = true;
					}else{
						vm.validation.coupons = false;
					}
					
				}else{
					vm.validation.coupons = true;
				}
			},
			function(data) {
				vm.validation.coupons = true;
				console.log("ERROR");
			      //modal();
			  })
		}

		function _confirmBuy(){
			console.log("confirmBuy");
			var data = {
				promotion: vm.data.promotion._id,
				coupon : cupom._id,
				pointAmount: vm.data.promotion.price_amount,
				user: user._id,
				createdAt: new Date()
			}

			PromotionService.userPromotions(data)
			.then(function(res) {
				console.log("PromotionService.userPromotions");
				if(res.status == "200"){
					updateStatusCoupon();
				}
				
				
			},function(data) {
				console.log("ERROR");
			      //modal();
			  })
			

		}

		function updateStatusCoupon(){

			CuponsService.updateStatusCoupon(cupom._id)
			.then(function(res) {
				if(res.status == "200"){
					console.log("updateStatusCoupon");
					$rootScope.$broadcast('root_totalPoints');
					$mdDialog.hide();
					$state.go('app.cupomConfirme', {'id': res.data.coupon._id});
					
				}
				
				
			},function(data) {
				console.log("ERROR");
			      //modal();
			  })

			
		}

	}

	function PromotionCategoryCtrl($scope, PromotionService){
		var vm = this;
		vm.data ={};
	}

})(window.angular);