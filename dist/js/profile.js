var mockup = '<div class="row">' +
				'<div class="col s12 m12 center-align">' +
					'<img src="{{image}}" class="img-profile circle">' +
					'<h4 class="name">{{name}}</h4>' +
					'<p class="years">{{years}} - {{country}}</p>' +
				'</div>' +
			 '</div>';

var cargarPagina = function() {
	$.get("/info.json", function(response){
		var params = location.search;
		var pos = params.indexOf("=");
		var data = params.substr(pos + 1);
		$("#students").append(mockup.replace("{{image}}", response[data-1].foto)
						 			   .replace("{{name}}", response[data-1].nombre)
						 			   .replace("{{years}}", response[data-1].edad)
						 			   .replace("{{country}}", response[data-1].sede));
	});

	$(".check").click(marcarPuntaje);
};

$(document).ready(cargarPagina);

var marcarPuntaje = function(){
	$(this).siblings().removeClass("seleccionado");
    $(this).addClass("seleccionado");
    $(this).prevAll().addClass("seleccionado");
}