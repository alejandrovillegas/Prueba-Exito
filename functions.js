// Browser detection for when you get desparate. A measure of last resort.

// var b = document.documentElement;
// b.setAttribute('data-useragent',  navigator.userAgent);
// b.setAttribute('data-platform', navigator.platform);

// sample CSS: html[data-useragent*='Chrome/13.0'] { ... }
if(typeof String.prototype.trim !== 'function') {
  String.prototype.trim = function() {
    return this.replace(/^\s+|\s+$/g, ''); 
  };
}

// function for chat connection
var openchat = false;
function setUrl(urliframe, iddiv) {
    var myiframe = document.getElementById(iddiv);
    if (!openchat && myiframe) {
	myiframe.src = urliframe;
	openchat = true;
    }
}

function centrar(parent, child){

	var wParent = ($(parent).innerWidth())/2;
	var wChild = ($(child).outerWidth())/2;
	var left = wParent - wChild;
	$(child).css('left',left);
	
}

//centrar chat
function centrarChat(){
		var Mbody = $('body').width()/2;
		var Mwrapper = $('.content_wrapper').width()/2;
		if (!Mwrapper) {
		    Mwrapper = $('.content_wrapper_int').width()/2;

		}

		Mright = Mbody - Mwrapper - 9 +'px';
		$('.chat').css('marginRight' , Mright);
}

// remap jQuery to $
(function($) {

    /* trigger when page is ready */
    $(document).ready(function() {
	
		$('.btn_chat').click(function(){
			$('.iframe_chat').slideDown('slow');
			$('.btn_chat').fadeOut('slow');
			$('.close_chat').fadeIn('slow');
		
		});
		
		$('.close_chat').click(function(){
			$('.iframe_chat').slideUp('slow');
			$('.close_chat').fadeOut('slow');
			$('.btn_chat').fadeIn('slow');
			
		});
		
		
        // your functions go here
        centrarChat();


        //posicion Men�
        $(".wrapper > ul > li").mouseenter(function(){
            var menuWidth = $('.wrapper > ul').width();
            var submenuWidth = 0;
            var windowWith = $(window).width();

            if (windowWith > 480) {

                $(this).find("ul li").each(function(i){
                    submenuWidth+= $(this).find("a").innerWidth();
                });
                submenuWidth+=40;
                
                if((submenuWidth / 2) > (menuWidth / 2)) {
                    $(this).css("position","static");
                    $(this).find("ul").css({
                        "width": submenuWidth,
                        "right": "75px",
                        "left": "auto",
                        "text-align": "right"
                    });
                }
            }
        });

        // buscador menu
        $('.button_search img').click(function() {
            $('.search_box').toggle();
        });

        menu_mobile();
		
        acordeonFaq();
        panelTabs();
        //overlayConmuter();        
        accordionControler();
		//benefToggle();

    });


// On window load. This waits until images have loaded which is essential
$(window).load(function() {
        // Fade in images so there isn't a color "pop" document load and then on window load
        $(".bolsa_incluye li img").fadeIn(500);
		
		        
		//Englobar ultimos 3 d�gitos
        $('.precio').each(function() {
            var digitos = $(this).text();
			digitos = digitos.trim();
            var last3 = digitos.slice(-3);
			digitos = digitos.slice(0, -3);
            $(this).html(digitos+"<span>" + last3 + "</span>");
        });

		// moneda precios
        $(".precio_plan .precio").each(function(){
			var htmlPrice = $(this).html();
			htmlPrice = htmlPrice.trim();
			var newText= htmlPrice.substring(1);
			var currency = htmlPrice.substring(0,1);
			$(this).html("<span class='moneda'>"+currency+"</span>"+newText);
        });
		
		// letra peque�a dentro del precio
        $(".precio").siblings(".small").each(function(){
            $(this).appendTo($(this).parent().find(".precio"));
        });
		
        // clone image
        $('.bolsa_incluye li img').each(function() {
            var el = $(this);
            el.wrap("<div class='img_wrapper' style='display: inline-block;'>").clone().addClass('img_grayscale').css({"position": "absolute", "z-index": "998", "opacity": "0"}).insertBefore(el).queue(function() {
                var el = $(this);
                el.parent().css({"width": this.width, "height": this.height});
                el.dequeue();
            });
            this.src = grayscale(this.src);
        });
		
        centrarChat();

        //Fade image
        // var itemBolsa = $('.bolsas_datos ul ul li');
        // itemBolsa.each(function(){
        // 	$(this).mouseover(function(){
        // 		$(this).find('.bolsa_incluye li img').stop().css("opacity", "1");
        // 	});
        // 	$(this).mouseout(function(){
        // 		$(this).find('.img_grayscale').stop().css("opacity", "0");
        // 	});
        // });	
    });




})(window.jQuery);

//Funcionalidad men� responsive para dispositivos m�viles
function menu_mobile() {

    //Creamos el bot�n de apertura y cierre del men�
    $('.pre_header_top').append("<div class='menu_mobile_btn'></div>");

    //A�adimos un boton a cada link con hijos para que al hacer click sobre �l se despliegue el submenu
    $('.has_child').append("<span class='submenu_btn'></span>");

    //Funcionalidad del bot�n
    $('.menu_mobile_btn').click(function(){
        $(this).toggleClass('active');
        $('nav .wrapper > ul').slideToggle();
    });

    //Funcionalidad del menu
    $('.has_child .submenu_btn').each(function(){
        $(this).click(function(){
            var canal = $(this).siblings('.link_menu').html();
            $(this).siblings('.sub_menu').addClass('open');
            $(this).siblings('.sub_menu').prepend("<li><div class='btn_atras'>Atras</div></li>");

            $('.btn_atras').click(function(){
                $(this).parent().parent().removeClass('open');
                $(this).parent('li').remove();
            });
        });
    });

    //Mostramos el men� al pasar de mobil a desktop
$(window).resize(function(){

        var winW = $(window).width();
        if (winW > 480) {
            $('.btn_atras').parent('li').remove();
            $('nav .wrapper > ul').show();
            $('.sub_menu').removeClass('open');
        }

	centrarChat();
	

    });
};



/*// Background slider (Home)
function cambiarImagenFondo(nuevaImagen, contenedor){
    var contenedor = $('.' + contenedor);
    //cargar imagen primero
    var tempImagen = new Image();
	
    $(tempImagen).load( function(){
        contenedor.css('backgroundImage', 'url('+tempImagen.src+')');
    });
	
	tempImagen.src = 'img/' + nuevaImagen;
    
}

function bgSlider() {

    $('.carousel-inner .item.active').each(function() {
		alert(index());
        var elementActive = $(this).index() + 1;
        var backGround = 'url(img/slide' + elementActive + '.jpg) center top';
        $('.bg_home').css('background', backGround);

    });
}*/


// Grayscale w canvas method
function grayscale(src) {
    var canvas = document.createElement('canvas');
    var ctx = canvas.getContext('2d');
    var imgObj = new Image();
    imgObj.src = src;
    canvas.width = imgObj.width;
    canvas.height = imgObj.height;
    ctx.drawImage(imgObj, 0, 0);
    var imgPixels = ctx.getImageData(0, 0, canvas.width, canvas.height);
    for (var y = 0; y < imgPixels.height; y++) {
        for (var x = 0; x < imgPixels.width; x++) {
            var i = (y * 4) * imgPixels.width + x * 4;
            var avg = (imgPixels.data[i] + imgPixels.data[i + 1] + imgPixels.data[i + 2]) / 3;
            imgPixels.data[i] = avg;
            imgPixels.data[i + 1] = avg;
            imgPixels.data[i + 2] = avg;
        }
    }
    ctx.putImageData(imgPixels, 0, 0, 0, 0, imgPixels.width, imgPixels.height);
    return canvas.toDataURL();
}

//Acordeon Preguntas Frecuentes
function acordeonFaq() {
    $('.preguntas_faq > ul > li:has(ol)').addClass('has-sub');
    $('.preguntas_faq > ul > li.active ol').show();

    $('.preguntas_faq > ul > li > a').click(function() {

        var checkElement = $(this).next();

        $('.preguntas_faq li').removeClass('active');
        $(this).closest('li').addClass('active');
        $('.preguntas_faq ul ol > li').removeClass('active');
        $('.preguntas_faq ul ol > li > p').hide();

        if ((checkElement.is('ol')) && (checkElement.is(':visible'))) {
            $(this).closest('li').removeClass('active');
            checkElement.slideUp('normal');
        }

        if ((checkElement.is('ol')) && (!checkElement.is(':visible'))) {
            $('.preguntas_faq ul ol:visible').slideUp('normal');
            checkElement.slideDown('normal');
        }

        if (checkElement.is('ol')) {
            return false;
        } else {
            return true;
        }
    });

    $('.preguntas_faq ul ol > li > span').click(function() {

        var checkElement = $(this).next();

        $('.preguntas_faq ul ol > li').removeClass('active');
        $(this).closest('li').addClass('active');

        if ((checkElement.is('div')) && (checkElement.is(':visible'))) {
            $(this).closest('li').removeClass('active');
            checkElement.slideUp('normal');
        }

        if ((checkElement.is('div')) && (!checkElement.is(':visible'))) {
            $('.preguntas_faq ul ol > li > div:visible').slideUp('normal');
            checkElement.slideDown('normal');
        }

        if (checkElement.is('div')) {
            return false;
        } else {
            return true;
        }

    });
}


// Funcionalidad Componente de pestañas (panelTab)
function panelTabs() {

    //$('.panel:first-child').children('.page').show();

    $('.panelTab .tab').each(function() {

        $(this).click(function() {

            var getNumberItem = $(this).index() + 1;

            $('.tab').removeClass('active');
            $('.panel').children('.page').hide();

            $(this).addClass('active');
            $('#panel' + getNumberItem).children('.page').show();
        });
    });
}

// Funcionalidad Componente WHO WE ARE SLIDER exclusiva para quienes_somos.html
function who_we_are_slider() {
	var MyUrl = document.URL;
	var n = MyUrl.search('#');

	if(n != -1){
		var MyUrl= MyUrl.split('#');
		$('.who_we_are_slider aside div').removeClass('active_button');
		pulsado = $('.who_we_are_slider aside #button-'+MyUrl[1]);
		pulsado.addClass('active_button');
		
		var idslider = '#'+MyUrl[1];
		pos = $(idslider).offset();
		margin_botton = parseInt($(idslider).css('margin-bottom'));
		new_top = Math.floor(pos.top - $('.who_we_are_slider aside').height() + ($('.who_we_are_slider aside').height()) / 2);
		$("html, body").animate({scrollTop: new_top}, "slow");
		
	}else{
    	pulsado = $('.who_we_are_slider aside div:first-child');
		$(window).scrollTop(100);
	}
	
    function pressbutton(btn) {
        if (pulsado.hasClass('active_button')) {
            pulsado.removeClass('active_button');
        }
        pulsado = btn;
        pulsado.addClass('active_button');

    }
    $('.who_we_are_slider aside div').each(function() {
        $(this).click(function() {
            idslider = $(this).attr('id');
            idslider = '#' + idslider.replace('button-', '');
            pos = $(idslider).offset();
            margin_botton = parseInt($(idslider).css('margin-bottom'));
            new_top = Math.floor(pos.top - $('.who_we_are_slider aside').height() + ($('.who_we_are_slider aside').height()) / 2);
            $("html, body").animate({scrollTop: new_top}, "slow");
            pressbutton($(this));
        });
});

    $(window).scroll(function() {
        pmargen = Math.floor(($('.who_we_are_slider #always-connected').height() - $('.who_we_are_slider aside').height()) / 2);
        pini = $('.who_we_are_slider').offset();
        p = $('.who_we_are_slider #always-connected').offset();
        poscion = $(window).scrollTop() + '<br>' + (p.top - pini.top) + '<br>' + pmargen;
        $('.who_we_are_slider>ul>li').each(function() {

            temppos = $(this).offset();
            fin = temppos.top;
            ini = fin - $(this).height();
            if ($(this).parent().is('div:last-of-type')) {
                 top_comprueba = ini + ($('.who_we_are_slider #always-connected').height() )-pmargen;
                if ($(window).scrollTop() > top_comprueba) {
                    if (!$('.who_we_are_slider aside').hasClass('asidebuttom')) {
                        $('.who_we_are_slider aside').addClass('asidebuttom');
                    }
                } else {
                    if ($('.who_we_are_slider aside').hasClass('asidebuttom')) {
                        $('.who_we_are_slider aside').removeClass('asidebuttom');
                    }

                }
            } else {
                if ($('.who_we_are_slider aside').hasClass('asidebuttom')) {
                    $('.who_we_are_slider aside').removeClass('asidebuttom');
                }

            }
            if ($(window).scrollTop() > ini && $(window).scrollTop() < fin) {
                pressbutton($('#button-' + $(this).attr('id')));
            }

        });
    });

}

// Funcionalidad modo overlay en manuales.html
/*function overlayConmuter() {
    $(window).resize(function(){
        var fotoHeight = $('.overlay-wrapper').height();
        $('.overlay-wrapper').css('margin-top',-fotoHeight / 2);
    });
    $('.activate, .video_player').click(function(e) {
        e.preventDefault();
        $('.overlay-container').show();        
        var fotoHeight = $('.overlay-wrapper').height();
        $('.overlay-wrapper').css('margin-top',-fotoHeight / 2);
    });
    $('.overlay-close-btn').click(function(e) {
        e.preventDefault();
        $('.overlay-container').hide();
    });
}*/

// Funcionalidad para los acordeones de la p�gina manuales.html
function accordionControler() {

    var winW = $(window).width();

    $('.panel:first-child').children('.panel_mobile_btn').addClass('panel_active_btn');

    $('.panel_mobile_btn').each(function(){
        $(this).click(function(){
            if($(this).hasClass('panel_active_btn')) {
                $(this).toggleClass('panel_active_btn');
                $(this).siblings().slideToggle();
            }
            else {
                $('.page').hide();
                $(".panel_mobile_btn").removeClass('panel_active_btn');
                $(this).toggleClass('panel_active_btn');
                $(this).siblings().slideToggle();
            }
        });
    });
	


	$(window).resize(function(){

        var winW = $(window).width();

        if (winW > 464) {
            var numItem = $(".panel_mobile_btn.panel_active_btn").parent().index() + 1;
            $('#tab' + numItem).addClass('active');
            $('.panel_mobile_btn').removeClass('panel_active_btn');

            if(!$('.panel_mobile_btn').hasClass('panel_active_btn')) {
                $('#tab1').addClass('active');
                $('#panel1').children('.page').show();
            };

        } else {
            var numItem = $(".tab.active").index() + 1;
            $('#panel' + numItem).children('.panel_mobile_btn').addClass('panel_active_btn');
            $('.tab').removeClass('active');
        }
    });
}

//Funci�n pop-ups
function alertCS(pag, cerrar)
{ 

	var mensaje = '';
	var tiempoCS=500
	var cerrarX = '';
	
	if(cerrar){
		cerrarX ='<div class="cerrarCS"></div>';
	}
	
	var ventanaCS='<div class="oscuroCS" id="oscuroCS"><div id="ventanaCS" class="ventanaCS">'+cerrarX+'<div class="mensajeCS">'+mensaje+'</div></div></div>';
	$('body').append(ventanaCS);
	$('#oscuroCS').css('display','block');
	var altoVentanaCS=$('#ventanaCS').height();
	var anchoVentanaCS=$('#ventanaCS').width();
	
	if(anchoVentanaCS >= $( window ).width()){
		$('#ventanaCS').css({'width':'80%','left':'6%','marginLeft':'auto', 'marginRight':'auto'});
		var anchoVentanaCS=$('#ventanaCS').width();
	}else{
		$('#ventanaCS').css('margin-left',(-1*anchoVentanaCS/2)+'px')
	}

	$('#ventanaCS').css('margin-top',(-1*altoVentanaCS/2)+'px');;
	$('#oscuroCS').animate({opacity:1},tiempoCS);
	
	$('.cerrarCS, .aceptarCS').click(function(e) {
	$(this).parent().parent('.oscuroCS').animate({opacity:0},tiempoCS,'linear',function(){$(this).remove()});
	});
	
	$('body').keypress(function( event ) {
	if ( event.which == 13 ) {
		event.preventDefault();
			$('#oscuroCS').animate({opacity:0},tiempoCS,'linear',function(){$(this).remove()});
		}
	});
		
		 $.ajax({
			 type: "GET",
			 url: pag,
			 dataType: 'html',
			 success: function(data){
				 $('.mensajeCS').html(data);
			 }
		});
        return false;
} 

function setCookie(nameCookie,valueCookie,seconds) {
	var	expires = "";
	if (seconds || (0===seconds)) {
		var date = new Date();
		date.setTime(date.getTime()+(seconds*1000));
		expires = "; expires="+date.toUTCString();
	}		
	document.cookie = nameCookie+"="+valueCookie+expires+"; path=/";
}

