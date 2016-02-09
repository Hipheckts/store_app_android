// Ionic Starter App, v0.9.20

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js

var app = angular.module('starter', ['ionic', 'starter.controllers','ngCart']);

app.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('app', {
      url: "/app",
      abstract: true,
      templateUrl: "menu.html",
      controller: 'AppCtrl'
    })
	.state('app.home', {
      url: "/home",
      views: {
        'menuContent' :{
          templateUrl: "home.html"
        }
      }
    })
	.state('app.category', {
      url: "/category",
      views: {
        'menuContent' :{
          templateUrl: "category.html"
        }
      }
    })
    .state('app.mens_womens_products', {
      url: "/mens_womens_products/:id",
      views: {
        'menuContent' :{
          templateUrl: "mens_womens_products.html",
		  controller: 'MensWomensProCtrl'
        }
      }
    }).state('app.pro_details', {
      url: "/pro_details/:id",
      views: {
        'menuContent' :{
          templateUrl: "pro_details.html",
		  controller: 'ProDetailsCtrl'
        }
      }
    }).state('app.cart', {
      url: "/cart",
      views: {
        'menuContent' :{
          templateUrl: "cart.html"
        }
      }
    });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/home');
});



app.controller('CategoryCtrl', function($scope, $http){

    $http({
            method: 'POST',
            url: 'http://ideaweaver.in/samples/mystore/category.php'
        }).success(function(data, status) {
            $scope.category = data;
		  if(data[0].cat_icon){	
			$('.category_loader').hide();
			$('.category_list').show(); 
		  }
			
        });
});


app.controller('MensWomensProCtrl',[ '$scope', '$http','$location', '$stateParams','ngCart',function($scope,$http, $location, $stateParams, ngCart) {
     

	$scope.data = {};	
    $scope.formData = {
				'cid': $stateParams.id
			  };	 

	
	$scope.postCatId = function(){ 
	 // alert($scope.formData.cid);
	$http({
            method: 'POST',
            url: 'http://ideaweaver.in/samples/mystore/products.php', 
			headers: {'Content-Type': 'application/x-www-form-urlencoded'},
			data: $.param($scope.formData)
        }).success(function(data, status) {
            $scope.products = data;
			if(data!=''){	
				$('.pro_loader').hide();
				$('.pro_list').show(); 
			  }else{
				  $('.pro_loader').hide();
				  $('.no_pro_list').show();  
			  }
        });
	}

 	 ngCart.setTaxRate(7.5);
  	 ngCart.setShipping(2.99); 



    
}]);

app.controller('ProDetailsCtrl',[ '$scope', '$http','$location', '$stateParams',function($scope,$http, $location, $stateParams) {
	  $scope.data = {};	 
      $scope.formData = { 
				'pid': $stateParams.id
			  };
	$scope.postProId = function(){ 
	//alert('formSubmit');		  
	 $http({
            method: 'POST',
            url: 'http://ideaweaver.in/samples/mystore/pro_details.php', 
			headers: {'Content-Type': 'application/x-www-form-urlencoded'},
			data: $.param($scope.formData)
        }).success(function(data, status) {
            $scope.products = data;
			if(data[0].id){	
			    //$('.pro_detail_list').show(); 
				$('.pro_detail_loader').hide();
			  }
        });	
	}
	
}]);


app.controller('CartCtrl',[ '$scope', '$http','$location', '$stateParams','ngCart',function($scope,$http, $location, $stateParams, ngCart) {
	
	 ngCart.setTaxRate(7.5);
  	 ngCart.setShipping(2.99);   
	//alert('bbb');
}]);