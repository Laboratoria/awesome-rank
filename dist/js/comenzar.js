var templateSocial = '<div id="{{id}}">' + 
						'<h5>{{social}}</h5>' +
					'</div>';

var templateQSocial = '<div class="demo">' +
                        '<span class="ratyli check-block" data-ratemax="5">' +
                        	'<span class="lil-check" style="cursor:default;">✓</span>' +
                          '<span><b>{{number}}</b> means:</span>' +
                        '</span>' +
                        '<p>{{answer}}</p>' +
                      '</div>';

var templateTechnical = '<li>' +
                          '<div class="collapsible-header bg-header collapseInside">{{question}}</div>' +
                          '<div class="collapsible-body" id="{{id}}"></div>' +
                        '</li>';

var templateQTechnical = '<div class="question">' +
	                          '<div class="demo">' +
	                            '<span class="ratyli check-block" data-ratemax="5">' +
	                              '<span class="lil-check" style="cursor:default;">✓</span>' +
	                              '<span><b>{{number}}</b> means:</span>' +
	                            '</span>' +
	                            '<p>{{answer}}</p>' +
	                          '</div>' +
	                        '</div>';

var loadPage = function() {
// carousel material
  $('.carousel.carousel-slider').carousel({full_width: true});
  $('.collapsible').collapsible();
  $(".btn-skip").click(userValidation);
  $(".btn-start").click(userValidation);
  social();
  technical();
};

$(document).ready(loadPage);

var social = function() {

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
				$.each(response.questions[i].Answers, function(i, answer) {
					$("#" + question.id).append(templateQSocial.replace("{{answer}}", answer.description)
															   .replace("{{number}}", i + 1));
				});
			});
			$(".collapsible").collapsible();
		}
	});
};

var technical = function() {
	$.ajax({
		url:"https://awesome-rank-api.herokuapp.com/api/questions",
		type: "GET",
		success: function(response){
			$.each(response.questions, function(i, question) {
				if (question.type === "tech") {
					$("#technical").append(templateTechnical.replace("{{question}}", question.description)
															.replace("{{id}}", question.id));
					$.each(response.questions[i].Answers, function(i, answer) {
						$("#" + question.id).append(templateQTechnical.replace("{{answer}}", answer.description)
																	.replace("{{number}}", i + 1));
					});
				}
			});
		$(".collapsible").collapsible();
		}
	});
};

var userValidation = function () {
	var status = Boolean(sessionStorage.getItem("status"));
	if (status) {
		window.location.href = "/students.html";
	} else {
		window.location.href = "/login.html";
	}
};