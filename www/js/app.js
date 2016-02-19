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
    }).state('app.account', {
      url: "/account",
      views: {
        'menuContent' :{
          templateUrl: "account.html"
        }
      }
    }).state('app.logout', {
      url: "/logout",
      views: {
        'menuContent' :{
          templateUrl: "logout.html",
		  controller:'LogoutCtrl'
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

	
	$scope.send_order = function(){
	   
	   alert('aaaa');  
	 
	}
	
	
}]);



app.controller('HomeCtrl',function($scope, $http, $window){
	
	 
	 $(document).on("click",".register_link",function(){
		$('form#signup_form').slideDown();
		$('form#login_form').slideUp();
	  });
	  $(document).on("click",".login_link",function(){
		$('form#signup_form').slideUp();
		$('form#login_form').slideDown();
	  });
	  
	  
	  $scope.data = {};	
      $scope.formData = {
				'name': '',
				'email':'',
				'password':''
			  };	 
	  
	  
	  
	  
	  $scope.login_post = function(){
		  
		  $('.home_loader').show();
		  
		  $http({
            method: 'POST',
            url: 'http://ideaweaver.in/samples/mystore/login.php', 
			headers: {'Content-Type': 'application/x-www-form-urlencoded'},
			data: $.param($scope.formData)
			}).success(function(data, status) {
				$scope.login = data;
				sessionStorage.setItem('login_email', data[0].email);
				//var favoriteCookie = sessionStorage.getItem('login_email');
				//alert(favoriteCookie);
				
				if(data==0){
					$scope.ErrorMsg = "Invalid login credentials, try again.";
					$('.account_button').hide();
					$('.logout_button').hide();	
					$('.small_logo_button').show();
				}else{
				  $window.location.href ='#/app/category';
				  $('.account_button').show();	
				  $('.logout_button').show();	
				  $('.small_logo_button').hide();
				}
				
			});	
		  
	  }
	   
	   
	   $scope.formData = {
				'name_reg': '',
				'email_reg':'',
				'password_reg':''
			  };
	   
	   
	   $scope.register_post = function(){

		 $http({
            method: 'POST',
            url: 'http://ideaweaver.in/samples/mystore/register.php', 
			headers: {'Content-Type': 'application/x-www-form-urlencoded'},
			data: $.param($scope.formData)
			}).success(function(data, status) {
				$scope.register = data;
				if(data==0){
					$scope.ErrorMsg = "Email already exist!";				
				}else{
				  $window.location.href ='#/app/category';
				  $('.account_button').show();	
				  $('.logout_button').show();	
				  $('.small_logo_button').hide();
				  sessionStorage.setItem('login_email', $scope.formData.email_reg);
				}
			});

		  
	  }
	  
	
});



app.controller('LogoutCtrl',function($scope, $http,$window){
	
		$scope.$on('$ionicView.enter', function() {	
		      sessionStorage.setItem('login_email', '');		  
			  $scope.LogoutMsg = "You have successfully logout.";
			  $('.account_button').hide();
			  $('.small_logo_button').show();
			  $('.logout_button').hide();
			  setTimeout(function(){	
				$window.location.href ='#/app/home';
			  },2000);
		});
			
});

app.controller('ProfileCtrl', function($scope, $http,$window){
  
	   $scope.data = {};	 
       $scope.formData = { 
				'logged_email':''
			  };
	   
	   //alert(sessionStorage.getItem('login_email'));
	   $scope.formData.logged_email = sessionStorage.getItem('login_email');  
	   //alert($scope.formData.logged_email);
	   $scope.get_user = function(){  
	   //alert('GET USER'); 
	   $http({
            method: 'POST',
            url: 'http://ideaweaver.in/samples/mystore/profile_user.php', 
			headers: {'Content-Type': 'application/x-www-form-urlencoded'},
			data: $.param($scope.formData)
			}).success(function(data, status) {
				$scope.details = data;
				$scope.formData = {		 
					 'name_update': data[0].name,
					 'email_update': data[0].email,
					 'pass_update': data[0].password,
					 'address1_update': data[0].address_1,
					 'address2_update': data[0].address_2
				 };
				 
				 $('.account_loader').hide();
			}); 
	 }
	 $scope.userUpdate = function(){ 
	   $('.account_loader').show(); 
	   $http({
            method: 'POST',
            url: 'http://ideaweaver.in/samples/mystore/user_update.php', 
			headers: {'Content-Type': 'application/x-www-form-urlencoded'},
			data: $.param($scope.formData)
			}).success(function(data, status) {
				    $scope.details = data;
					//alert(data);
					$window.location.href ='#/app/account';
					$('.account_loader').hide();
				    $('.profile_overview').show();
				    $('#userUpdate').hide();
			});
	 }
	 
	 $(document).on("click",".choose_address_1",function(){
		var getVal = $(this).find('.address_1').hasClass('ion-android-checkbox-outline');
		if(getVal){
			$(this).find('.address_1').removeClass('ion-android-checkbox-outline').addClass('ion-android-checkbox-outline-blank');
			$('.address_2').addClass('ion-android-checkbox-outline').removeClass('ion-android-checkbox-outline-blank');
			$("input#default_address").val(2);
		}else{
			$(this).find('.address_1').addClass('ion-android-checkbox-outline').removeClass('ion-android-checkbox-outline-blank');
			$("input#default_address").val(1);
			$('.address_2').removeClass('ion-android-checkbox-outline').addClass('ion-android-checkbox-outline-blank');
		}
	 });
	 
	 $(document).on("click",".choose_address_2",function(){
		var getVal = $(this).find('.address_2').hasClass('ion-android-checkbox-outline');
		if(getVal){
			$(this).find('.address_2').removeClass('ion-android-checkbox-outline').addClass('ion-android-checkbox-outline-blank');
			$('.address_1').addClass('ion-android-checkbox-outline').removeClass('ion-android-checkbox-outline-blank');
			$("input#default_address").val(1);
		}else{
			$(this).find('.address_2').addClass('ion-android-checkbox-outline').removeClass('ion-android-checkbox-outline-blank');
			$("input#default_address").val(2);
			$('.address_1').removeClass('ion-android-checkbox-outline').addClass('ion-android-checkbox-outline-blank');
		}
	 });
	 
	 
	 
	 $(document).on("click",".open_update_form",function(){
		 $('form#userUpdate').slideDown();
		 $('.profile_overview').slideUp();		 
	 });
	 
	 $(document).on("click",".close_form",function(){
		 $('form#userUpdate').slideUp();
		 $('.profile_overview').slideDown();		 
	 });
	 
	 

});









