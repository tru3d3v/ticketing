(function($, document, window){
	
	$(document).ready(function(){


		console.log('root');
		var token = readCookie('ticketingApp_token_user');
		console.log('read token:'+token);
		console.log(window.location.pathname.split('/')[1]);
		var pageName = window.location.pathname.split('/')[1].toLowerCase();

		var menu = $('.menu');

		if(pageName=='index.html'){
			menu.append('<li class="menu-item current-menu-item"><a href="index.html">Home</a></li>');
		}else{
			menu.append('<li class="menu-item"><a href="index.html">Home</a></li>');
		}

		if(pageName=='review.html'){
			menu.append('<li class="menu-item current-menu-item"><a href="review.html">Movie reviews</a></li>');
		}else{
			menu.append('<li class="menu-item"><a href="review.html">Movie reviews</a></li>');
		}

		if(pageName=='contact.html'){
			menu.append('<li class="menu-item current-menu-item"><a href="contact.html">Contact</a></li>');
		}else{
			menu.append('<li class="menu-item"><a href="contact.html">Contact</a></li>');
		}

		if(pageName=='profile.html'){
			menu.append('<li class="menu-item current-menu-item"><a href="profile.html">Profile</a></li>');
		}else{
			menu.append('<li class="menu-item"><a href="profile.html">Profile</a></li>');
		}

		if(pageName=='about.html'){
			menu.append('<li class="menu-item current-menu-item"><a href="about.html">About</a></li>');
		}else{
			menu.append('<li class="menu-item"><a href="about.html">About</a></li>');
		}
		
		menu.append('<li class="menu-item"><a href="#" id="btnloginLogout">Logout</a></li>');

		if(token!='' && token!=null && token!=undefined){
			$('#btnloginLogout').text('Logout');
		}else{
			$('#btnloginLogout').text('Login');
		}

		$('#btnloginLogout').click(function(){

			var loginText = $('#btnloginLogout').text();
			location.href='login.html';
			if(loginText=='Logout'){
				eraseCookie('ticketingApp_token_user');
			}

		});


		// validasi halaman yang diharuskan login : profil, transaction history
		if(pageName=='profile.html' || pageName=='history.html' ){
			$.ajax({
				url: '/checkToken',
				dataType: 'json',
				type: 'get',
				headers: { 'token': token },
				contentType: 'application/json',
				beforeSend: function () {
				}
			}).done(function(data){
				console.log('token',data);
				if(data.length>0){
					var token = data[1][0].ret_value;
					if(token=='invalid token'){
						location.href='login.html';
					}
				}
			})
				.fail(function(request, textStatus, errorThrown){
					alert('An error occurred during your request /checkToken: ' + request.status + ' ' + textStatus + ' ' + errorThrown);
				})
				.always(function(){});
		}


		// Cloning main navigation for mobile menu
		$(".mobile-navigation").append($(".main-navigation .menu").clone());

		// Mobile menu toggle 
		$(".menu-toggle").click(function(){
			$(".mobile-navigation").slideToggle();
		});
		$(".search-form button").click(function(){
			$(this).toggleClass("active");
			var $parent = $(this).parent(".search-form");

			$parent.find("input").toggleClass("active").focus();
		});


		$(".slider").flexslider({
			controlNav: false,
			prevText:'<i class="fa fa-chevron-left"></i>',
			nextText:'<i class="fa fa-chevron-right"></i>',
		});
		if( $(".map").length ) {
			$('.map').gmap3({
				map: {
					options: {
						maxZoom: 14 
					}  
				},
				marker:{
					address: "40 Sibley St, Detroit",
				}
			},
			"autofit" );
	    	
	    }
	});

	$(window).load(function(){

	});

})(jQuery, document, window);