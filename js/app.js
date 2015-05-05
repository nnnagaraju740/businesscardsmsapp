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
          controller : "ProfileController",
		  templateUrl: "profile.html"
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

.controller('AppController', function($scope, $ionicSideMenuDelegate,$location,$http) {
	$scope.toggleLeft = function() {
		$ionicSideMenuDelegate.toggleLeft(); 
	}; 
})
.controller("HomeController", function($scope,$sce,$http,$location,$state) {
  	$scope.p ={};
	$scope.validateRNum=function(){
		var filterr = /^[0-9-+]+$/;
		var mobileInt=$('#mobile').val();
		var stringNum=mobileInt.toString();
		if(filterr.test(mobileInt)){
			if(stringNum.length==3){
				$('#mobile').val(mobileInt+'-');
			}else if(stringNum.length==7){
				$('#mobile').val(mobileInt+'-');
			}
		}
	}
	$scope.isInValidFormatt=function(emailId){
		var arCount = (emailId.match(/@/g) || []).length;
		if( parseInt(arCount) == parseInt("0") || parseInt(arCount) > parseInt("1") || ((parseInt(arCount) == parseInt("1")) && (emailId.charAt(0) == "@")) )
		{
			return false;
		}
		
		var splitOnDot = emailId.split( "." );
		if(Math.floor(splitOnDot[1]) == splitOnDot[1] && $.isNumeric(splitOnDot[1])){
			return false;
		}		
		if( parseInt(splitOnDot.length) == parseInt("1") )
		{
			return false;
		}
		for( var sodi = 0;sodi < splitOnDot.length;sodi++ )
		{
			if( splitOnDot[sodi].length == 0 )
			{
				return false;
			}
		}
		var splitOnAr = emailId.split( "@" );
		var splitOnDotCom = splitOnAr[1].split( "." );
		if( parseInt(splitOnDotCom.length) > parseInt("2") )
		{
			return false;
		}
		for( var soari = 0;soari < splitOnAr.length;soari++ )
		{
			if( splitOnAr[soari].length == 0 )
			{
				return false;
			}
			var splitOnDot = splitOnAr[soari].split( "." );
			for( var sodi = 0;sodi < splitOnDot.length;sodi++ )
			{
				if( splitOnDot[sodi].length == 0 )
				{
					return false;
				}
			}
		}
		return true;
	}
	$scope.regForm = function(ngForm) {
		var flag = true;
		var filter = /^[0-9-+]+$/;
		var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
		if($('#username').val()==''){
			$('#f_n').removeClass("has_error_valid");
			$('#f_n').addClass("has_error_invalid");
			$('#error_mess').html('First name is required.');
			flag=false; return false;
		}else{ 
			$('#f_n').removeClass("has_error_invalid");
			$('#f_n').addClass("has_error_valid");
			$('#error_mess').html('');
		}
		if($('#mobile').val()==''){			
			$('#m_n').removeClass("has_error_valid");
			$('#m_n').addClass("has_error_invalid");
			$('#error_mess').html('Mobile number is required.');
			flag=false; return false;
		}else if($('#mobile').val()!=''){
			var m_id = $('#mobile').val();
			if(!filter.test(m_id)){
				$('#m_n').removeClass("has_error_valid");
				$('#m_n').addClass("has_error_invalid");
				$('#error_mess').html('Please enter a US area code and phone number.');
				flag=false; return false;			
			}else{
				if(m_id.toString().length != 12){
					$('#m_n').removeClass("has_error_valid");
					$('#m_n').addClass("has_error_invalid");
					$('#error_mess').html('Please enter a US area code and phone number.');
					flag=false; return false;	
				}else{
					var finalSmsNum=m_id.split('-');
					if(finalSmsNum[0].toString().length==3 && finalSmsNum[1].toString().length==3 && finalSmsNum[2].toString().length==4){
						$('#m_n').removeClass("has_error_invalid");
						$('#m_n').addClass("has_error_valid");
						$('#error_mess').html('');
					}else{
						$('#m_n').removeClass("has_error_valid");
						$('#m_n').addClass("has_error_invalid");
						$('#error_mess').html('Please enter a US area code and phone number.');
						flag=false; return false;
					}
				}
			}	
		}else{ 
			$('#m_n').removeClass("has_error_invalid");
			$('#m_n').addClass("has_error_valid");
			$('#error_mess').html('');
		}
		if($('#email').val()==''){			
			$('#e_n').removeClass("has_error_valid");
			$('#e_n').addClass("has_error_invalid");
			$('#error_mess').html('Email address is required.');
			flag=false; return false;
		}else if($('#email').val()!=''){
			var e_id = $('#email').val();
			var emailValidd=$scope.isInValidFormatt(e_id);
			if(!emailValidd){
				$('#e_n').removeClass("has_error_valid");
				$('#e_n').addClass("has_error_invalid");
				$('#error_mess').html('Please enter valid email address.');
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
					$location.path('/app/custommessage');
				}
			});
		}
	}
	if(typeof localStorage["user_id"]!='undefined'){
		//$scope.profileAction();
		$location.path('/app/sendsms');
	}
})
.controller('ProfileController', function($scope,$sce,$http,$location,$state) {
	$scope.validateNum=function(){
		var filterr = /^[0-9-+]+$/;
		var mobileInt=$('#ppmobile').val();
		var stringNum=mobileInt.toString();
		if(filterr.test(mobileInt)){
			if(stringNum.length==3){
				$('#ppmobile').val(mobileInt+'-');
			}else if(stringNum.length==7){
				$('#ppmobile').val(mobileInt+'-');
			}
		}
	}
	$scope.isInValidFormat=function(emailId){
		var arCount = (emailId.match(/@/g) || []).length;
		if( parseInt(arCount) == parseInt("0") || parseInt(arCount) > parseInt("1") || ((parseInt(arCount) == parseInt("1")) && (emailId.charAt(0) == "@")) )
		{
			return false;
		}
		
		var splitOnDot = emailId.split( "." );
		if(Math.floor(splitOnDot[1]) == splitOnDot[1] && $.isNumeric(splitOnDot[1])){
			return false;
		}		
		if( parseInt(splitOnDot.length) == parseInt("1") )
		{
			return false;
		}
		for( var sodi = 0;sodi < splitOnDot.length;sodi++ )
		{
			if( splitOnDot[sodi].length == 0 )
			{
				return false;
			}
		}
		var splitOnAr = emailId.split( "@" );
		var splitOnDotCom = splitOnAr[1].split( "." );
		if( parseInt(splitOnDotCom.length) > parseInt("2") )
		{
			return false;
		}
		for( var soari = 0;soari < splitOnAr.length;soari++ )
		{
			if( splitOnAr[soari].length == 0 )
			{
				return false;
			}
			var splitOnDot = splitOnAr[soari].split( "." );
			for( var sodi = 0;sodi < splitOnDot.length;sodi++ )
			{
				if( splitOnDot[sodi].length == 0 )
				{
					return false;
				}
			}
		}
		return true;
	}
	$scope.updForm = function(ngForm) {
		var flag = true;
		var filter = /^[0-9-+]+$/;
		
		var pusername=ngForm.username.$viewValue;
		if(pusername == ''){
			$('#f_n_u').removeClass("has_error_valid");
			$('#f_n_u').addClass("has_error_invalid");
			$('#error_mess_u').html('First name is required.');
			flag=false; return false;
		}else{ 
			$('#f_n_u').removeClass("has_error_invalid");
			$('#f_n_u').addClass("has_error_valid");
			$('#error_mess_u').html('');
		}
		var pmobileNum=ngForm.ppmobile.$viewValue;
		if(pmobileNum == ''){			
			$('#m_n_u').removeClass("has_error_valid");
			$('#m_n_u').addClass("has_error_invalid");
			$('#error_mess_u').html('Mobile number is required.');
			flag=false; return false;
		}else if(pmobileNum != ''){
			var m_id = pmobileNum;
			if(!filter.test(m_id)){
				$('#m_n_u').removeClass("has_error_valid");
				$('#m_n_u').addClass("has_error_invalid");
				$('#error_mess_u').html('Please enter a US area code and phone number.');
				flag=false; return false;			
			}else{
				if(m_id.toString().length != 12){
					$('#m_n_u').removeClass("has_error_valid");
					$('#m_n_u').addClass("has_error_invalid");
					$('#error_mess_u').html('Please enter a US area code and phone number.');
					flag=false; return false;	
				}else{
					var finalSmsNum=m_id.split('-');
					if(finalSmsNum[0].toString().length==3 && finalSmsNum[1].toString().length==3 && finalSmsNum[2].toString().length==4){
						$('#m_n_u').removeClass("has_error_invalid");
						$('#m_n_u').addClass("has_error_valid");
						$('#error_mess_u').html('');
					}else{
						$('#m_n_u').removeClass("has_error_valid");
						$('#m_n_u').addClass("has_error_invalid");
						$('#error_mess_u').html('Please enter a US area code and phone number.');
						flag=false; return false;
					}
				}
			}	
		}else{ 
			$('#m_n_u').removeClass("has_error_invalid");
			$('#m_n_u').addClass("has_error_valid");
			$('#error_mess_u').html('');
		}
		var pemailAdd=ngForm.email.$viewValue;
		if(pemailAdd == ''){			
			$('#e_n_u').removeClass("has_error_valid");
			$('#e_n_u').addClass("has_error_invalid");
			$('#error_mess_u').html('Email address is required.');
			flag=false; return false;
		}else if(pemailAdd != ''){
			var e_id = pemailAdd;
			var emailValid=$scope.isInValidFormat(e_id);
			if(!emailValid){
			$('#e_n_u').removeClass("has_error_valid");
			$('#e_n_u').addClass("has_error_invalid");
			$('#error_mess_u').html('Please enter a valid email address.');
			flag=false; return false;
		}else{
			$('#e_n_u').removeClass("has_error_invalid");
			$('#e_n_u').addClass("has_error_valid");
			$('#error_mess_u').html('');
		}
		}else{ 
			$('#e_n_u').removeClass("has_error_invalid");
			$('#e_n_u').addClass("has_error_valid");
			$('#error_mess_u').html('');
		}
		$scope.user_id 		= 	JSON.parse(localStorage["user_id"]);
		var dataObj = {
			username		:	pusername,
			lastname		:	ngForm.lastname.$viewValue,
			mobile_num		:	pmobileNum,
			fax		        :	ngForm.fax.$viewValue,
			email		    :	pemailAdd,
			web_url		    :	ngForm.web_url.$viewValue
		};
		
		$http.put(webServiceUrl+'register/'+$scope.user_id,dataObj)
		.success(function(response) {
			$('#profileMessage').html("Profile updated successfully.");
			setTimeout(function() {
				$('#profileMessage').html("");
			}, 10000);
			//$location.path('/app/custommessage');
		});
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

.controller("smsController", function($scope,$sce,$http,$location,$state) {	
	$scope.addIphon=function(){
		var filterr = /^[0-9-+]+$/;
		var mobileInt=$('#mobile_1').val();
		var stringNum=mobileInt.toString();
		if(filterr.test(mobileInt)){
			if(stringNum.length==3){
				$('#mobile_1').val(mobileInt+'-');
			}else if(stringNum.length==7){
				$('#mobile_1').val(mobileInt+'-');
			}
		}
	}
	$scope.sendSmsForm=function(smsForm){
		var flag = true;		
		var filter = /^[0-9-+]+$/;
		if($('#mobile_1').val()==''){			
			$('#mo_n').removeClass("has_error_valid");
			$('#mo_n').addClass("has_error_invalid");
			$('#error_sms_mess').html('Mobile number is required.');
			flag=false; return false;
		}else if($('#mobile_1').val()!=''){
			var m_id = $('#mobile_1').val();
			if(!filter.test(m_id)){
				$('#mo_n').removeClass("has_error_valid");
				$('#mo_n').addClass("has_error_invalid");
				$('#error_sms_mess').html('Please enter a US area code and phone number to send a message.');
				flag=false; return false;			
			}else{
				if(m_id.toString().length != 12){
					$('#mo_n').removeClass("has_error_valid");
					$('#mo_n').addClass("has_error_invalid");
					$('#error_sms_mess').html('Please enter a US area code and phone number to send a message.');
					flag=false; return false;	
				}else{
					var finalSmsNum=m_id.split('-');
					if(finalSmsNum[0].toString().length==3 && finalSmsNum[1].toString().length==3 && finalSmsNum[2].toString().length==4){
						$('#mo_n').removeClass("has_error_invalid");
						$('#mo_n').addClass("has_error_valid");
						$('#error_sms_mess').html('');
					}else{
						$('#mo_n').removeClass("has_error_valid");
						$('#mo_n').addClass("has_error_invalid");
						$('#error_sms_mess').html('Please enter a US area code and phone number to send a message.');
						flag=false; return false;
					}
				}
			}	
		}else{ 
			$('#mo_n').removeClass("has_error_invalid");
			$('#mo_n').addClass("has_error_valid");
			$('#error_sms_mess').html('');
		}
		if($('#message_1').val()==''){
			$('#sms_mes').removeClass("has_error_valid");
			$('#sms_mes').addClass("has_error_invalid");
			$('#error_sms_mess').html('Select message');
			flag=false; return false;	
		}else{
			$('#sms_mes').removeClass("has_error_invalid");
			$('#sms_mes').addClass("has_error_valid");
			$('#error_sms_mess').html('');
		}
		if(flag==false){
			return false;
		}else{
			var mobileNum=smsForm.mobile_1.$viewValue;
			var finalNum=mobileNum.replace(/\D/g,'');
			var dataObj = {
				mobile		:	finalNum,
				message		:	smsForm.message_1.$viewValue,
				user_id 	: 	JSON.parse(localStorage["user_id"]),
				mobile_from : 	JSON.parse(localStorage["mobile"]),
			};	
			var smsUrl=webServiceUrl+'sendsms';
			$http.post(smsUrl,dataObj).success(function(response) {
				if(response.sms_id == 0){
					$('#smsMsg').removeClass('success-msg');
					$('#smsMsg').addClass('has_error_color');
					$('#smsMsg').html("Message not sent.");
				}else{
					$('#smsMsg').removeClass('has_error_color');
					$('#smsMsg').addClass('success-msg');
					$('#smsMsg').html("Message sent successfully.");
				}
				setTimeout(function() {
					$('#smsMsg').html("");
				}, 10000);	
				$('#mobile_1').val("");				
				$('#message_1').val("");				
			});
		}
	}
	if(typeof localStorage["user_id"]=='undefined'){
		$location.path('/app/home');
	}
})
.controller("customSmsController", function($scope,$sce,$http,$compile,$location,$state) {
	/*
	$scope.sendCMessage=function(){
		$scope.operations="Update";
		$('#editMessage').removeClass('item item-text-wrap');
		$('#editMessage').html('<label  class="item item-input"><textarea id="textareaMessage">'+$.trim($('#editMessage').html())+'</textarea></label>');
		$('#textareaMessage').focus();
		$('#editButton').hide();
	}
	$scope.navigateTosms=function(type){
		if(type=='Next'){
			$location.path('/app/sendsms');
		}else{
			var message_id = $('#message_id').val();
			var dataObj = {
				 message		:	$('#textareaMessage').val(),
				 user_id 	    : 	JSON.parse(localStorage["user_id"]),
				 message_id 	: 	message_id,
			 };		
			var smsUrl=webServiceUrl+'customsms';
			$http.post(smsUrl,dataObj).success(function(response) {
				$scope.operations="Next";
				$('#editMessage').addClass('item item-text-wrap');
				$('#editMessage').html($('#textareaMessage').val());
				$('#editButton').show();
			});
		}
	}
	*/
	$scope.customSms=function(csmsForm,navValue){
		var flag= true;
		if($('#cmessage_name').val()==''){
			$('#ms_n').removeClass("has_error_valid");
			$('#ms_n').addClass("has_error_invalid");
			$('#error_cus__mess').html('Custom Message is required.');
			flag=false;
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
				var message_text=csmsForm.cmessage_name.$viewValue;
			}
			//$('#customMessages').hide();
			//$('#msgList').show();
			//$('#msgListnext').show();
			//$scope.operations="Next";
			if(typeof localStorage["cmessage_id"]=='undefined'){
				message_id = '';
			}else{
				message_id = JSON.parse(localStorage["cmessage_id"]);
			}
			var dataObj = {
				 message		:	message_text,
				 user_id 	    : 	JSON.parse(localStorage["user_id"]),
				 message_id 	: 	message_id,
			 };		
			var smsUrl=webServiceUrl+'customsms';
			$http.post(smsUrl,dataObj).success(function(response) {
				//$scope.message='';
				//$('#customMessages').hide();
				//$scope.cmessage_id = response.mess_id;
				if(navValue==1){
					$('#updateMessage').html('Message updated successfully.');
					setTimeout(function() {
						  $('#updateMessage').html("");
				}, 10000);
				}else{
					localStorage.setItem( 'cmessage_id', JSON.stringify(response.mess_id) );
					$('#messageNext').hide();
					$('#messageUpdate').show();
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
				//$scope.message='';
				//$('#customMessages').hide();
				//$('#msgList').show();
				//$('#msgListnext').show();
				//$scope.operations="Next";
				$scope.cmessage_name = response.result[0].message_name;
				$scope.dmessage_name = response.result[0].message_name;
				$scope.cmessage_id = response.result[0].message_id;  
			}else{
				//$('#customMessages').show();
				$scope.cmessage_id=0;
			}
		});
	}else{
		$location.path('/app/home');
	}
})