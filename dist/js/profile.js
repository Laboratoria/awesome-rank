var mockup = '<div class="row profile" data-id="{{id}}">' +
				'<div class="col s12 m12 center-align">' +
					'<img src="{{image}}" class="img-profile circle">' +
					'<h4 class="name">{{name}} {{lastname}}</h4>' +
					'<p>{{title}}</p>' +
					'<p>{{squad}}</p>' +
					'<a target="_blank" href={{link}} class="record">RECORD EN CLASE ▷</a>' +
				'</div>' +
			 '</div>';

var templateSocial = '<div class="question" id="{{id}}">' +
			                  '<h6>{{social}}</h6>' +
			                  '<div class="demo">' +
			                    '<i class="small material-icons">done</i>' +
			                    '<i class="small material-icons">done</i>' +
			                    '<i class="small material-icons">done</i>' +
			                    '<i class="small material-icons">done</i>' +
			                    '<i class="small material-icons">done</i>' +
			                  '</div>' +
			                '</div>';

var templateTechnical = '<div class="question" id="{{id}}">' +
				                  '<h6>{{technical}}</h6>' +
				                  '<div class="demo">' +
				                    '<i class="small material-icons">done</i>' +
				                    '<i class="small material-icons">done</i>' +
				                    '<i class="small material-icons">done</i>' +
				                    '<i class="small material-icons">done</i>' +
				                    '<i class="small material-icons">done</i>' +
				                  '</div>' +
				                '</div>';

var cargarPagina = function() {
	profile();
	scoreSocial();
	scoreTechnical();
	$(".btn-save").click(savePoints);
	$(document).on("click", ".small", marcarPuntaje);
};

$(document).ready(cargarPagina);

var marcarPuntaje = function(){
	$(this).siblings().removeClass("seleccionado");
 	$(this).addClass("seleccionado");
	$(this).prevAll().addClass("seleccionado");
};

var profile = function(){
	$.ajax({
		url:"https://awesome-rank-api.herokuapp.com/api/developers",
		type: "GET",
		success: function(response){
				var params = location.search;
				var pos = params.indexOf("=");
				var data = params.substr(pos + 1);
				$("#students").append(mockup.replace("{{image}}", response.squads[0].Developers[data-1].photoUrl)
											.replace("{{name}}", response.squads[0].Developers[data-1].name)
											.replace("{{lastname}}", response.squads[0].Developers[data-1].lastname)
											.replace("{{title}}", response.squads[0].Developers[data-1].title)
											.replace("{{squad}}", response.squads[0].name));
		}
	});
};

var scoreSocial = function(){
	$.ajax({
		url:"https://awesome-rank-api.herokuapp.com/api/questions",
		type: "GET",
		success: function(response){
			$.each(response.questions, function(i, question) {
				if (question.type === "hse-1") {
					$("#social1").append(templateSocial.replace("{{social}}", question.description)
														.replace("{{id}}", question.id));
				} else if (question.type === "hse-2") {
					$("#social2").append(templateSocial.replace("{{social}}", question.description)
														.replace("{{id}}", question.id));
				} else if (question.type === "hse-3") {
					$("#social3").append(templateSocial.replace("{{social}}", question.description)
														.replace("{{id}}", question.id));
				} else if (question.type === "hse-4") {
					$("#social4").append(templateSocial.replace("{{social}}", question.description)
														.replace("{{id}}", question.id));
				}
			});
		}
	});
};

var scoreTechnical = function(){
	$.ajax({
		url:"https://awesome-rank-api.herokuapp.com/api/questions",
		type: "GET",
		success: function(response){
			$.each(response.questions, function(i, question) {
				if (question.type === "tech") {
					$("#technical").append(templateTechnical.replace("{{technical}}", question.description)
															.replace("{{id}}", question.id));
				}
			});
		}
	});
};

var savePoints = function() {
	$(this).attr("disabled", true);
	var ratings = [];
	var user = JSON.parse(sessionStorage.getItem("user"));
	var userId = user.id;
	var developerId = parseInt($(".profile").attr("data-id"));
	$(".demo").each(function (i, question) {
		var questionId = parseInt($(question).parent().attr("id"));
		var points = $(question).find(".seleccionado").length;
		var rating = {
			UserId: userId,
			DeveloperId: developerId,
			QuestionId: questionId,
			points: points
		};
		ratings.push(rating);
	});
	$.post("https://awesome-rank-api.herokuapp.com/api/ratings", {
		ratings: JSON.stringify(ratings)
	}, function(response) {
		console.log(response);
		swal({
			title: "Awesome Rank",
			text: "Your score has been saved successfully.",
			type: "success",
			confirmButtonColor: "#F9A91A",
			confirmButtonText: "OK",
			closeOnConfirm: false,
			closeOnCancel: false
		}, function () {
			window.location.href = "/estudiantes.html";
		});
		$(".btn-save").removeAttr("disabled");
	});
};
