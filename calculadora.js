

function rangeSliders (conv_correo,
					   conv_musica,
					   conv_web,
					   conv_post,
					   conv_chat,
					   conv_app,
					   
					   max_correo,
					   max_musica,
					   max_web,
					   max_post,
					   max_chat,
					   max_app,
					   
					   uni_correos,
					   uni_canciones,
					   uni_horas,
					   uni_posts,
					   uni_chats,
					   uni_apps
					   ) {   

    function refreshSwatch() {
        var correo = $( "#correos" ).slider("value"),
            musica = $( "#horas-musica" ).slider( "value" ),
            web = $( "#horas-web" ).slider( "value" ),
            post = $( "#posts" ).slider( "value" )
            chat = $( "#horas-chat" ).slider( "value" )
            app = $( "#apps" ).slider( "value" );
        var correos = correo * conv_correo,
            musicas = musica * conv_musica,
            webs = web * conv_web,
            posts = post * conv_post,
            chat = chat * conv_chat,
            apps = app * conv_app;        
        var currentMegas = correos + musicas + webs + posts + chat + apps;
        var currentGigas = currentMegas / 1000;
        var totalMegas = (conv_correo*max_correo) + (conv_musica*max_musica) + (conv_web*max_web) + (conv_post*max_post) + (conv_chat*max_chat) + (conv_app*max_app);
        var totalGigas =  totalMegas / 1000;
        var currentPorcentaje = currentGigas * 100 / totalGigas;
		
        if (currentGigas.toString().split(".").length>1) {        
             currentGigas = currentGigas.toString().split(".")[0] + '.' + currentGigas.toString().split(".")[1].substring(0,2);
        }	
	
        $( "#swatch" ).css( "height", currentPorcentaje + '%' );
        $( ".medidor span" ).html(currentGigas + ' GB');
        $( ".benef_desp_Calculadora_top_num" ).html(currentGigas + " GB");
        $( ".medidor span" ).css( "bottom", currentPorcentaje + '%' );
    }   

    $('#correos').slider({ 
        max: max_correo,
        min: 0,
        value: 0,
        // step: 90,
        orientation: "horizontal",
        animate: true,
        range: "min",
        slide: function(e,ui) {
            $(this).siblings('.currentval').html(ui.value+' '+uni_correos);
        },
        change: refreshSwatch
        
    });
    $('#horas-musica').slider({ 
        max: max_musica,
        min: 0,
        value: 0,
        // step: 6,
        orientation: "horizontal",
        animate: true,
        range: "min",
        slide: function(e,ui) {
            $(this).siblings('.currentval').html(ui.value+' '+uni_canciones);
        },
        change: refreshSwatch
    });
    $('#horas-web').slider({ 
        max: max_web,
        min: 0,
        value: 0,
        // step: 100,
        orientation: "horizontal",
        animate: true,
        range: "min",
        slide: function(e,ui) {
            $(this).siblings('.currentval').html(ui.value+' '+uni_horas);
        },
        change: refreshSwatch
    });
    $('#posts').slider({ 
        max: max_post,
        min: 0,
        value: 0,
        // step: 400,
        orientation: "horizontal",
        animate: true,
        range: "min",
        slide: function(e,ui) {
            $(this).siblings('.currentval').html(ui.value+' '+uni_posts);
        },
        change: refreshSwatch
    });
    $('#horas-chat').slider({ 
        max: max_chat,
        min: 0,
        value: 0,
        // step: 10,
        orientation: "horizontal",
        animate: true,
        range: "min",
        slide: function(e,ui) {
            $(this).siblings('.currentval').html(ui.value+' '+uni_chats);
        },
        change: refreshSwatch
    });
    $('#apps').slider({ 
        max: max_app,
        min: 0,
        value: 0,
        // step: 30,
        orientation: "horizontal",
        animate: true,
        range: "min",
        slide: function(e,ui) {
            $(this).siblings('.currentval').html(ui.value+' '+uni_apps);
        },
        change: refreshSwatch
    });

    refreshSwatch();

}