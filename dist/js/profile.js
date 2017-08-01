var mockup =	'<div class="row profile" data-id="{{id}}">' +
					'<div class="col s12 m12 center-align">' +
						'<img src="{{image}}" class="img-profile circle">' +
						'<h5 class="name">{{name}} {{lastname}}</h5>' +
						'<p>{{title}}</p>' +
						'<p>{{squad}}</p>' +
						'<a target="_blank" href={{link}} class="record">VIEW HISTORIC PROFILE ▷</a>' +
					'</div>' +
 				'</div>';

var templateSocial =	'<div class="question" id="{{id}}">' +
	                  		'<h6>{{social}}</h6>' +
	                  		'<div class="demo">' +
													'<div class="container">' +
														'<div class="row">' +
				                    	'<i class="material-icons star medium col s2">star</i>' +
				                    	'<i class="material-icons star medium col s2">star</i>' +
				                    	'<i class="material-icons star medium col s2">star</i>' +
				                    	'<i class="material-icons star medium col s2">star</i>' +
				                    	'<i class="material-icons star medium col s2">star</i>' +
		                  			'</div>' +
													'</div>' +
												'</div>' +
	                	'</div>';

var templateTechnical =	'<div class="question" id="{{id}}">' +
		                  		'<h6>{{technical}}</h6>' +
		                  		'<div class="demo">' +
														'<div class="container">' +
															'<div class="row">' +
					                    	'<i class="material-icons star medium col s2">star</i>' +
					                    	'<i class="material-icons star medium col s2">star</i>' +
					                    	'<i class="material-icons star medium col s2">star</i>' +
					                    	'<i class="material-icons star medium col s2">star</i>' +
					                    	'<i class="material-icons star medium col s2">star</i>' +
			                  			'</div>' +
														'</div>' +
													'</div>' +
		                  		'</div>' +
			                	'</div>';

var questions = [];

var loadPag = function() {
	profile();
	getQuestions();
	$('.modal').modal();
	$(".btn-save").click(savePoints);
	$(document).on("click", ".star", marcarPuntaje);
	$(document).on("click", ".info", showSkillDetail);
	$(".skill").collapsible({
		onOpen: function (e) {
			var initialPosition = parseInt(e.offset().top);
			$('html, body').animate({
			    scrollTop: initialPosition
			}, 400);
		}
	});
};

$(document).ready(loadPag);

var marcarPuntaje = function(){
	$(this).siblings().removeClass("seleccionado");
 	$(this).addClass("seleccionado");
	$(this).prevAll().addClass("seleccionado");
};

var profile = function(){
	var user = JSON.parse(sessionStorage.getItem('user'));
	var filter = {
		campusId: user.CampusId,
		userId: user.id
	};
	$.ajax({
		url:"https://awesome-rank-api-test/api/developers",
		type: "GET",
		data: filter,
		success: function(response){
			var params = location.search;

			var posDevXo = params.indexOf("=");
			var posDevXf = params.indexOf("&");
			var devId = params.substring(posDevXo +1 , posDevXf);

			var stringSquad = params.substr(posDevXf + 1);
			var posSquadXo = stringSquad.indexOf("=");
			var squadId = stringSquad.substring(posSquadXo + 1);

			$.each(response.squads, function(i, squad){
				if(squad.id == squadId) {
					$.each(squad.Developers, function(j, developer){
						if(developer.id == devId) {
							if(developer.photoUrl == null){
								developer.photoUrl = "../img/developers/usercoder.png"
							}

							if (developer.title === 'UX Designer') {
								$(".tech-skills").hide();
							} else {
								$(".uxd-skills").hide();
							}

							$("#students").append(mockup.replace("{{image}}", developer.photoUrl)
														.replace("{{name}}", developer.name)
														.replace("{{lastname}}", developer.lastname)
														.replace("{{title}}", developer.title)
														.replace("{{squad}}", squad.name)
														.replace("{{link}}", developer.captainLink)
														.replace("{{id}}", developer.id));
						}
					});
				}
			});
		}
	});
};

var getQuestions = function(){
	$.ajax({
		url:"https://awesome-rank-api-test/api/questions",
		type: "GET",
		success: function(response){
			$.each(response.questions, function(i, question) {
				if (question.type === "tech") {
					$("#technical").append(templateTechnical.replace("{{technical}}", question.title)
															.replace("{{id}}", question.id));
				} else if (question.type === "uxd") {
					$("#design").append(templateTechnical.replace("{{technical}}", question.title)
															.replace("{{id}}", question.id));
				} else {
					if (question.type === "hse-1") {
						$("#social1").append(templateSocial.replace("{{social}}", question.title)
															.replace("{{id}}", question.id));
					} else if (question.type === "hse-2") {
						$("#social2").append(templateSocial.replace("{{social}}", question.title)
															.replace("{{id}}", question.id));
					} else if (question.type === "hse-3") {
						$("#social3").append(templateSocial.replace("{{social}}", question.title)
															.replace("{{id}}", question.id));
					} else if (question.type === "hse-4") {
						$("#social4").append(templateSocial.replace("{{social}}", question.title)
															.replace("{{id}}", question.id));
					}
				}
			});
		}
	});
};

var savePoints = function() {
	$(this).attr("disabled", true);
	var ratings = [];
	var user = JSON.parse(sessionStorage.getItem("user"));
	console.log(user);
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
	$.post("https://awesome-rank-api-test/api/ratings", {
		ratings: JSON.stringify(ratings)
	}, function(response) {
		console.log(response);
		swal({
			title: "Awesome Rank",
			text: "Your score has been sent successfully.",
			type: "success",
			confirmButtonColor: "#F9A91A",
			confirmButtonText: "OK",
			closeOnConfirm: false,
			closeOnCancel: false
		},function () {
			window.location.href = "/students.html";
		});
		$(".btn-save").removeAttr("disabled");
	});
};

var showSkillDetail = function () {
	var id = $(this).parents(".question").attr("id");
	var skill = questions.find(function (question) {
		return question.id == id;
	});
	$("#skill-title").text(skill.title);
	$("#skill-description").text(skill.description);
};
