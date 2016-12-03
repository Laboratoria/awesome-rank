var mockup = '<div class="row">' +
				'<div class="col s12 m12 center-align">' +
					'<img src="{{image}}" class="img-profile circle">' +
					'<h4 class="name">{{name}} {{lastname}}</h4>' +
					'<p class="years">{{years}} años - {{country}}</p>' +
				'</div>' +
			 '</div>';

var cargarPagina = function() {
	$.ajax({
		url:"https://awesome-rank-api.herokuapp.com/api/developers",
		type: "GET",
		success: function(response){
			var params = location.search;
			var pos = params.indexOf("=");
			var data = params.substr(pos + 1);
			$("#students").append(mockup.replace("{{image}}", response.developers[data-1].photoUrl)
						 			   .replace("{{name}}", response.developers[data-1].name)
						 			   .replace("{{lastname}}", response.developers[data-1].lastname)
						 			   .replace("{{years}}", response.developers[data-1].age)
						 			   .replace("{{country}}", response.developers[data-1].campus));
			$("#contenedor").html(templateEstud);
		}
	});

	$(".check").click(marcarPuntaje);
};

$(document).ready(cargarPagina);

var marcarPuntaje = function(){
	$(this).siblings().removeClass("seleccionado");
    $(this).addClass("seleccionado");
    $(this).prevAll().addClass("seleccionado");
}