angular.module('starter', ['ionic'])  

.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider
    .state('app', {
      url: "/app",
      abstract: true,
      templateUrl: "app.html"
    })
    .state('app.home', {
      url: "/home",
      views: {
        'appContent' :{
          templateUrl: "home.html",
          controller : "HomeController"
        }
      }
    })
	.state('app.profile', {
      url: "/profile",
      views: {
        'appContent' :{
          templateUrl: "profile.html",
          controller : "ProfileController"
        }
      }
    })
	
	.state('app.custommessage', {
      url: "/custommessage",
      views: {
        'appContent' :{
          templateUrl: "custommessage.html",
          controller : "customSmsController"
        }
      }
    })
	.state('app.sendsms', {
      url: "/sendsms",
      views: {
        'appContent' :{
          templateUrl: "sendsms.html",
         controller : "smsController"
        }
      }
    })
  
  $urlRouterProvider.otherwise("/app/home");
})

.controller('AppController', function($scope, $ionicSideMenuDelegate) {
  $scope.toggleLeft = function() {
    $ionicSideMenuDelegate.toggleLeft();
  };
})
.controller('ProfileController', function($scope,$sce,$http,$location,$state) {
		//$scope.results = {};
		$scope.updatedMessage = "";
		$scope.updForm = function(ngForm) {
			$scope.updatedMessage   = '';
			var flag = true;
			var filter = /^[0-9-+]+$/;
			var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
			if($('#username').val()==''){
				$('#f_n').removeClass("has_error_valid");
				$('#f_n').addClass("has_error_invalid");
				$('#error_mess').html('First Name is required.');
				flag=false; return false;
			}else{ 
				$('#f_n').removeClass("has_error_invalid");
				$('#f_n').addClass("has_error_valid");
				$('#error_mess').html('');
			}
			if($('#mobile').val()==''){			
			$('#m_n').removeClass("has_error_valid");
			$('#m_n').addClass("has_error_invalid");
			$('#error_mess').html('Mobile Number is required.');
			flag=false; return false;
		}else if($('#mobile').val()!=''){
			var m_id = $('#mobile').val();
			if(!filter.test(m_id)){
				$('#m_n').removeClass("has_error_valid");
				$('#m_n').addClass("has_error_invalid");
				$('#error_mess').html('Please enter only numbers.');
				flag=false; return false;			
			}else{
				$('#m_n').removeClass("has_error_invalid");
				$('#m_n').addClass("has_error_valid");
				$('#error_mess').html('');
			}	
		}else{ 
			$('#m_n').removeClass("has_error_invalid");
			$('#m_n').addClass("has_error_valid");
			$('#error_mess').html('');
		}
		
		if($('#email').val()==''){			
			$('#e_n').removeClass("has_error_valid");
			$('#e_n').addClass("has_error_invalid");
			$('#error_mess').html('Email Address is required.');
			flag=false; return false;
		}else if($('#email').val()!=''){
			var e_id = $('#email').val();
			if(!regex.test(e_id)){
				$('#e_n').removeClass("has_error_valid");
				$('#e_n').addClass("has_error_invalid");
				$('#error_mess').html('Entered email formate is wrong.');
				flag=false; return false;
			}else{
				$('#e_n').removeClass("has_error_invalid");
				$('#e_n').addClass("has_error_valid");
				$('#error_mess').html('');
			}
		}else{ 
			$('#e_n').removeClass("has_error_invalid");
			$('#e_n').addClass("has_error_valid");
			$('#error_mess').html('');
		}
			$scope.user_id 		= 	JSON.parse(localStorage["user_id"]);
			var dataObj = {
				username		:	ngForm.username.$viewValue,
				lastname		:	ngForm.lastname.$viewValue,
				mobile_num		:	ngForm.mobile.$viewValue,
				fax		        :	ngForm.fax.$viewValue,
				email		    :	ngForm.email.$viewValue,
				web_url		    :	ngForm.web_url.$viewValue
			};	
			$http.put(webServiceUrl+'register/'+$scope.user_id,dataObj)
			.success(function(response) {
				//$scope.updatedMessage   = 'Successfully details updated';
				//$('#regSuccess').html("Successfully details updated");
				$location.path('/app/custommessage');
			});			
			/*
			setTimeout(function() {
				$('#regSuccess').html("");
			}, 10000);	
			*/			
		}
		
		if(typeof localStorage["user_id"]!='undefined'){
			$scope.user_id 		= 	JSON.parse(localStorage["user_id"]);
			$http.get(webServiceUrl+'register/'+$scope.user_id)	
			.success(function(response) {
				var results = [response.data]; 
				$scope.puser_name = response.data.user_name;
				$scope.plastname = response.data.lastname;
				$scope.pmobile = response.data.mobile;
				$scope.pemail = response.data.email;
				$scope.pfax = response.data.fax;				
				$scope.pweb_site_url = response.data.web_site_url; 
			});
		}else{
			$location.path('/app/home');
		}
})
.controller("HomeController", function($scope,$sce,$http,$location,$state) {
  	$scope.p ={};
	$scope.regForm = function(ngForm) {
		var flag = true;
		var filter = /^[0-9-+]+$/;
		var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
		if($('#username').val()==''){
			$('#f_n').removeClass("has_error_valid");
			$('#f_n').addClass("has_error_invalid");
			$('#error_mess').html('First Name is required.');
			flag=false; return false;
		}else{ 
			$('#f_n').removeClass("has_error_invalid");
			$('#f_n').addClass("has_error_valid");
			$('#error_mess').html('');
		}
		/*
		if($('#lastname').val()==''){
			$('#l_n').removeClass("has_error_valid");
			$('#l_n').addClass("has_error_invalid");
			$('#error_mess').html('Last Name is required.');
			flag=false; return false;
		}else{ 
			$('#l_n').removeClass("has_error_invalid");
			$('#l_n').addClass("has_error_valid");
			$('#error_mess').html('');
		}
		*/
		if($('#mobile').val()==''){			
			$('#m_n').removeClass("has_error_valid");
			$('#m_n').addClass("has_error_invalid");
			$('#error_mess').html('Mobile Number is required.');
			flag=false; return false;
		}else if($('#mobile').val()!=''){
			var m_id = $('#mobile').val();
			if(!filter.test(m_id)){
				$('#m_n').removeClass("has_error_valid");
				$('#m_n').addClass("has_error_invalid");
				$('#error_mess').html('Please enter only numbers.');
				flag=false; return false;			
			}else{
				$('#m_n').removeClass("has_error_invalid");
				$('#m_n').addClass("has_error_valid");
				$('#error_mess').html('');
			}	
		}else{ 
			$('#m_n').removeClass("has_error_invalid");
			$('#m_n').addClass("has_error_valid");
			$('#error_mess').html('');
		}
		/*
		if($('#fax').val()==''){			
			$('#fax_n').removeClass("has_error_valid");
			$('#fax_n').addClass("has_error_invalid");
			$('#error_mess').html('Fax Number is required.');
			flag=false; return false;
		}else{ 
			$('#fax_n').removeClass("has_error_invalid");
			$('#fax_n').addClass("has_error_valid");
			$('#error_mess').html('');
		}	
		*/
		if($('#email').val()==''){			
			$('#e_n').removeClass("has_error_valid");
			$('#e_n').addClass("has_error_invalid");
			$('#error_mess').html('Email Address is required.');
			flag=false; return false;
		}else if($('#email').val()!=''){
			var e_id = $('#email').val();
			if(!regex.test(e_id)){
				$('#e_n').removeClass("has_error_valid");
				$('#e_n').addClass("has_error_invalid");
				$('#error_mess').html('Entered email formate is wrong.');
				flag=false; return false;
			}else{
				$('#e_n').removeClass("has_error_invalid");
				$('#e_n').addClass("has_error_valid");
				$('#error_mess').html('');
			}
		}else{ 
			$('#e_n').removeClass("has_error_invalid");
			$('#e_n').addClass("has_error_valid");
			$('#error_mess').html('');
		}	
		/*
		if($('#web_url').val()==''){			
			$('#w_n').removeClass("has_error_valid");
			$('#w_n').addClass("has_error_invalid");
			$('#error_mess').html('Web Site URL is required.');
			flag=false; return false;
		}else{ 
			$('#w_n').removeClass("has_error_invalid");
			$('#w_n').addClass("has_error_valid");
			$('#error_mess').html('');
		}	
		*/
		if(flag==false){
			return false;
		}else{
			$scope.regMessage   = '';
			var dataObj = {
				username		:	ngForm.username.$viewValue,
				lastname		:	ngForm.lastname.$viewValue,
				mobile_num		:	ngForm.mobile.$viewValue,
				fax		        :	ngForm.fax.$viewValue,
				email		    :	ngForm.email.$viewValue,
				web_url		    :	ngForm.web_url.$viewValue
			};	
			$http.post(webServiceUrl+'register',dataObj)
			.success(function(response) {
				if(response.mobile != '0'){
					$scope.modile = response.mobile;
					$scope.userName = response.user_name;
					$scope.user_id = response.user_id;
					localStorage.setItem( 'user_name', JSON.stringify($scope.userName) );
					localStorage.setItem( 'mobile', JSON.stringify($scope.modile) );
					localStorage.setItem( 'user_id', JSON.stringify($scope.user_id) );
					//$scope.smsloading		= $sce.trustAsHtml('');
					$scope.regMessage       = 'Successfully registered';
					$location.path('/app/custommessage');
				}
			});
		}
	}
	if(typeof localStorage["user_id"]!='undefined'){
		$location.path('/app/profile');
	}
})
.controller("smsController", function($scope,$sce,$http,$location,$state) {	
	$scope.sendSmsForm=function(smsForm){
		var flag = true;		
		var filter = /^[0-9-+]+$/;
		if($('#mobile_1').val()==''){			
			$('#mo_n').removeClass("has_error_valid");
			$('#mo_n').addClass("has_error_invalid");
			$('#error_sms_mess').html('Mobile Number is required.');
			flag=false; return false;
		}else if($('#mobile_1').val()!=''){
			var m_id = $('#mobile_1').val();
			if(!filter.test(m_id)){
				$('#mo_n').removeClass("has_error_valid");
				$('#mo_n').addClass("has_error_invalid");
				$('#error_sms_mess').html('Please enter only numbers.');
				flag=false; return false;			
			}else{
				$('#mo_n').removeClass("has_error_invalid");
				$('#mo_n').addClass("has_error_valid");
				$('#error_sms_mess').html('');
			}	
		}else{ 
			$('#mo_n').removeClass("has_error_invalid");
			$('#mo_n').addClass("has_error_valid");
			$('#error_sms_mess').html('');
		}
		if($('#message_1').val()==''){
			$('#sms_mes').removeClass("has_error_valid");
			$('#sms_mes').addClass("has_error_invalid");
			$('#error_sms_mess').html('Select Message');
			flag=false; return false;	
		}else{
			$('#sms_mes').removeClass("has_error_invalid");
			$('#sms_mes').addClass("has_error_valid");
			$('#error_sms_mess').html('');
		}
		if(flag==false){
			return false;
		}else{
			var dataObj = {
				mobile		:	smsForm.mobile_1.$viewValue,
				message		:	smsForm.message_1.$viewValue,
				user_id 	: 	JSON.parse(localStorage["user_id"]),
				mobile_from : 	JSON.parse(localStorage["mobile"]),
			};	
			var smsUrl=webServiceUrl+'sendsms';
			$http.post(smsUrl,dataObj).success(function(response) {
				//smsForm.mobile_1.$viewValue={};
				//smsForm.message_1.$viewValue={};
				if(response.sms_id == '0'){
					$('#smsMsg').html("Message Not Sent.");	
					$('#smsMsg').addClass("error-msg");		
				}else{
					$('#smsMsg').html("Message Sent Successfully.");
					$('#smsMsg').addClass("success-msg");
					//$scope.failError="Message Sent Successfully.";
				}
				setTimeout(function() {
						  $('#smsMsg').html("");
				}, 10000);	
				$('#mobile_1').val("");				
				//$state.go($state.current, {}, {reload: true});				
			});
		}
	}
	if(typeof localStorage["storeMessage"]!='undefined'){
		$scope.message=JSON.parse(localStorage["storeMessage"]);
		localStorage.removeItem("storeMessage");
	} 
	if(typeof localStorage["user_id"]=='undefined'){	
		 $location.path('/app/home');
	}
})
.controller("customSmsController", function($scope,$sce,$http,$compile,$location,$state) {
	if(typeof localStorage["user_id"]=='undefined'){	
		 $location.path('/app/home');
	}
	
	localStorage.removeItem("type");
	localStorage.removeItem("messageId");
	$scope.buttonSave =$sce.trustAsHtml('<button type="submit" class="button button-block  button-energized">Save</button>');
	//$scope.failError ='';
	$scope.csms ={};
	$scope.sendCMessage=function(messageId,type){
		var storeMessage=$('#message_'+messageId).html();

		if(type==1){
			localStorage.setItem( 'storeMessage', JSON.stringify(storeMessage) );
			$location.path('/app/sendsms');
		}else if(type==2){			
			$('#customMessages').show();
		}else{
			localStorage.setItem( 'type', JSON.stringify(type) );
			localStorage.setItem( 'messageId', JSON.stringify(messageId) );
			$scope.customSms(0);
		}
	}
	$scope.customSms=function(csmsForm){
		var flag= true;
		if($('#messageIn').val()==''){
			$('#ms_n').removeClass("has_error_valid");
			$('#ms_n').addClass("has_error_invalid");
			$('#error_cus__mess').html('Custom Message is required.');
			flag=false; return false;
		}else{ 
			$('#ms_n').removeClass("has_error_invalid");
			$('#ms_n').addClass("has_error_valid");
			$('#error_cus__mess').html('');
		}
		if(flag==false){
			return false;
		}else{
			if(csmsForm==0){
				var message_text=0;
			}else{
				var message_text=csmsForm.message.$viewValue;
			}
			var message_id = csmsForm.message_id.$viewValue;
			$('#customMessages').hide();
			$('#msgList').show();
			if(message_id == undefined){
				message_id = '';				
			}else{
				message_id = message_id; 
			}
			
			var dataObj = {
				 message		:	message_text,
				 user_id 	    : 	JSON.parse(localStorage["user_id"]),
				 message_id 	: 	message_id,
			 };		
			var smsUrl=webServiceUrl+'customsms';
			$http.post(smsUrl,dataObj).success(function(response) {
				$scope.message='';
				$('#customMessages').hide();
				if(response.mess_id==0){ 
					$location.path('/app/sendsms');
				}else{
					$location.path('/app/sendsms'); 
					
				}
			});
		}
	}
	if(typeof localStorage["user_id"]!='undefined'){
		$scope.user_id 		= 	JSON.parse(localStorage["user_id"]);
		$http.get(webServiceUrl+'customsms/'+$scope.user_id)	
		.success(function(response) {
			if(response.value == 1){
				$scope.csms = response.result; 
				$scope.cmessage_name = response.result[0].message_name;
				$scope.dmessage_name = response.result[0].message_name;
				$scope.cmessage_id = response.result[0].message_id;  
			}else{
				$scope.csms = []; 
				$('#customMessages').hide();
			}
		});
	}else{
		$location.path('/app/sendsms');
	}
})