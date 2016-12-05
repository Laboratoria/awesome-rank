var template= '<div class="card contiene col s12 m12">'+
					'<div class="col s5 m3">'+
					   	'<div class="image">'+
					   		'<img src="{{imagen}}">'+
				       	'</div>'+
				    '</div>'+
				    '<div class="col s5 m6">'+
					    '<p class="nomAlum"><span>{{nombre}} {{apellido}}</span></p>'+
					    '<p class="nomEdad"><span>{{edad}} años</span></p>'+
					    '<p class="nomSede"><span>{{sede}}</span></p>'+
					'</div>'+
					'<div class="col s2 m3">'+
						'<div class="vermas pointer" data="{{number}}">'+
					    	'<a id="enlace"><i class="fa fa-plus-circle fa-3x ic-color" aria-hidden="true"></i></a>'+
						'</div>'+
					'</div>'+
			   '</div>';

var plantillaCreditos = '<div class="card-credit center-align">'+
							'<img src="**imagen**" class="circle credit-image">'+
          					'<p class="margin-0">**name**</p>'+
      						'<a href="**github**"><i class="fa fa-github credit-icon fa-lg" aria-hidden="true"></i></a>'+
         	 				'<a href="**linkedin**"><i class="fa fa-linkedin credit-icon fa-lg" aria-hidden="true"></i></a>'+
        				'</div>';

var guardarDirigir= function(){
	var self = $(this).attr("data");
	window.location.href= "perfil.html" + "?data=" + self;
};

var ajaxStudents = function(){
	$.ajax({
		url:"https://awesome-rank-api.herokuapp.com/api/developers",
		type: "GET",
		success: function(response){
			var templateEstud= "";
			$.each(response.developers, function(i, estudiante){
				templateEstud += template
								.replace("{{nombre}}", estudiante.name)
								.replace("{{apellido}}", estudiante.lastname)
								.replace("{{edad}}", estudiante.age)
								.replace("{{sede}}", estudiante.campus)
								.replace("{{number}}", i+1)
	                            .replace("{{imagen}}", estudiante.photoUrl);
	        });
			$("#contenedor").html(templateEstud);
		}
	});
  	$('.button-collapse').sideNav({
      menuWidth: 200,
      edge: 'right',
      closeOnClick: true,
      draggable: true
    });
  $("#contenedor").on("click", ".vermas", guardarDirigir);
}

var ajaxCreditos = function(){
	$.ajax({
		url:"/info.json",
		type: "GET",
		success: function(response){
			var templateCred= "";
			$.each(response, function(i, developer){
				templateCred += plantillaCreditos
								.replace("**imagen**", developer.foto)
								.replace("**name**", developer.nombre)
								.replace("**github**", developer.github)
								.replace("**linkedin**", developer.linkedin);
	        });
			$("#creditoStudent").html(templateCred);
		}
	});
}

var logOut = function() {
	sessionStorage.removeItem("status");
	sessionStorage.removeItem("user");
	window.location.href = "/login.html";
};

var cargaPag = function(){
	ajaxStudents();
	ajaxCreditos();
	$(".btn-logout").click(logOut);
}
$(document).ready(cargaPag);
