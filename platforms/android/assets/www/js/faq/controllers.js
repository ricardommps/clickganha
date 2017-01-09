(function (angular) {

	'use strict';
	angular.module('api.faq.controllers', [])
	.controller('FaqCtrl', controller);
	function controller($scope, FaqService, $rootScope){
		var vm = this;
		vm.data ={};
		vm.shownFaq;
		vm.toggleFaq = toggleFaq;
		vm.isFaqShown = isFaqShown;
		$rootScope.$broadcast('title', {title : "FAQ"});

		$scope.accordianData = [  
                                { "heading" : "About Us",         "content" : "Testestetetetetete" },
                                { "heading" : "Terms of Use",     "content" : "" },
                                { "heading" : "Privacy Policy",   "content" : "" },
                                { "heading" : "Help",             "content" : "" },
                             ];
      
      // To expand or collapse the current view
      //This functionality automatically closes the other expanded lists
      $scope.toggleView = function(ary, data, index){
        for(var i=0; i<ary.length; i++){
          if(i!=index) { ary[i].expanded=false; }
          else { data.expanded=!data.expanded; }
        }
      }

		FaqService.faqCategories().then(function(res) {
			vm.data.banner = res;
			//console.log(res);
		})

		FaqService.faqs().then(function(res) {
			if(res.status == "200"){
				vm.data.faqs = res.data.faqs;
				console.log(vm.data.faqs);
			}else{
				console.log("Error");
			}
			
		})

		function toggleFaq(faq){
			if(vm.isFaqShown(faq)){
				$scope.shownFaq = null;
			} else {
				$scope.shownFaq = faq;
			}
		}

		function isFaqShown(faq){
			return $scope.shownFaq === faq;
		}
	}

})(window.angular);