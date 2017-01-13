var template=	'<div class="card contiene col s12 m12" data-squad-id={{idSquad}}>'+
					'<div class="col s4 m4">'+
			   			'<div class="image">'+
			   				'<img src="{{image}}" alt="Imagen-Alumna">'+
		       			'</div>'+
		    		'</div>'+
		    		'<div class="col s6 m6">'+
			    		'<p class="nomAlum"><span>{{nombre}} {{apellido}}</span></p>'+
			    		'<p class="nomEdad"><span>{{title}}</span></p>'+
			    		'<p class="nomSede"><span>{{squad}}</span></p>'+
					'</div>'+
					'<div class="col s2 m2">'+
						'<div class="vermas pointer" data-developer-id="{{idStudent}}">'+
		    				'<a id="enlace"><i class="fa fa-plus-circle fa-3x ic-color" aria-hidden="true"></i></a>'+
						'</div>'+
					'</div>'+
	   			'</div>';

var plantillaCreditos = '<div class="card-credit center-align">'+
							'<img src="**imagen**" class="circle credit-image">'+
								'<p class="margin-0">**name**</p>'+
								'<a href="**github**"><i class="fa fa-github credit-icon fa-lg" aria-hidden="true" target="_blank"></i></a>'+
 								'<a href="**linkedin**"><i class="fa fa-linkedin credit-icon fa-lg" aria-hidden="true" target="_blank"></i></a>'+
						'</div>';

var guardarDirigir= function(){
	var self = $(this).attr("data-developer-id");
	var idSq = $(this).parents().eq(1).attr("data-squad-id");
	window.location.href= "profile.html" + "?developer=" + self + "&squad=" + idSq;
};

var ajaxStudents = function(){
	var user = JSON.parse(sessionStorage.getItem('user'));
	var filter = {
		campusId: user.CampusId
	};
	$.ajax({
		url:"https://awesome-rank-api.herokuapp.com/api/developers",
		data: filter,
		type: "GET",
		success: function(response){
			var templateStudent= "";
			$.each(response.squads, function(i, squads){
				$.each(squads.Developers, function(j, developer){
					if(developer.photoUrl == null){
						developer.photoUrl = "../img/developers/usercoder.png"
					}
					templateStudent += template
											.replace("{{image}}", developer.photoUrl)
											.replace("{{nombre}}", developer.name)
											.replace("{{apellido}}", developer.lastname)
											.replace("{{title}}", developer.title)
											.replace("{{squad}}", squads.name)
											.replace("{{idSquad}}", squads.id)
											.replace("{{idStudent}}", developer.id);
				});			
			});
			$("#contenedor").html(templateStudent);
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
