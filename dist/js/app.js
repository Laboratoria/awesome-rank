var template= '<div class="card contiene col s12 m12">'+
					'<div class="col s5 m3">'+
					   	'<div class="image">'+
					   		'<img src="{{imagen}}">'+
				       	'</div>'+
				    '</div>'+
				    '<div class="col s5 m6">'+
					    '<p class="nomAlum"><span>{{nombre}}</span></p>'+
					    '<p class="nomEdad"><span>{{edad}}</span></p>'+
					    '<p class="nomSede"><span>{{sede}}</span></p>'+
					'</div>'+
					'<div class="col s2 m3">'+
						'<div class="vermas pointer" data="{{number}}">'+
					    	'<a id="enlace"><i class="fa fa-plus-circle fa-3x ic-color" aria-hidden="true"></i></a>'+
						'</div>'+
					'</div>'+
			   '</div>';

var guardarDirigir= function(){
	var self = $(this).attr("data");
	window.location.href= "perfil.html" + "?data=" + self;
};

var menu= function(){
	$("#menu").animate({width:'toggle'},350);
	$(".absolute").show();
};

var desaparecerMenu= function(){
	$("#menu").animate({width:'toggle'},350);
	$(".absolute").hide();
};

$(document).ready(function(){
	$.get("/info.json", function(response){
		var templateEstud= "";
		$.each(response, function(i, estudiante){
			templateEstud += template
							.replace("{{nombre}}", estudiante.nombre)
							.replace("{{edad}}", estudiante.edad)
							.replace("{{nacionalidad}}", estudiante.nacionalidad)
							.replace("{{sede}}", estudiante.sede)
							.replace("{{number}}", i+1)
                            .replace("{{imagen}}", estudiante.foto);
        });
		$("#contenedor").html(templateEstud);
	});
	$("#contenedor").on("click", ".vermas", guardarDirigir);
	$(".absolute").click(desaparecerMenu);
	$(".nav-wrapper i").click(menu);
});
