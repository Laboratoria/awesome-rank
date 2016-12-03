var template = '<div class="col s12 m12">'+
                    '<ul class="collapsible" data-collapsible="accordion">'+
                       '<li class="active">'+
		                	'<div class="collapsible-header bg-header collapseInside">'+
		                		'{{question}}'+
		                	'</div>'+
		                   	'<div class="collapsible-body">'+
		                   		"<p>{{answer}}</p>"+
                        	'</div></li></ul></div>';


$(document).ready(function(){
  // carousel material
  $('.carousel.carousel-slider').carousel({full_width: true});


	$.get("/preguntas.json", function(response){
		var templateQuestion= "";
		$.each(response.HSE, function(i, estudiante){
			templateQuestion += template.replace("{{question}}", estudiante.pregunta).replace("{{answer}}", estudiante.respuesta);
			console.log(templateQuestion);
		});
		$("#social").html(templateQuestion);
			$(".collapsible").collapsible();
	});
	$.get("/preguntas.json", function(response){
		var templateQuestion= "";
		$.each(response.TECHNICAL, function(i, estudiante){
			templateQuestion += template.replace("{{question}}", estudiante.pregunta).replace("{{answer}}", estudiante.respuesta);
			console.log(templateQuestion);
		});
		$("#technical").html(templateQuestion);
			$(".collapsible").collapsible();
	});
});
