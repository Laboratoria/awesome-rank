var template = '<div class="card contiene col s12 m12">' +
		          '<div class="row margin">' +
		            '<div class="col s4 col m4">' +
		              '<div class="image">' +
		                '<img src="img/girls/paola.jpeg">' +
		              '</div>' +
		            '</div>' +
		            '<div class="col s8 col m8 personal-info">' +
		              '<p class="nomAlum"><span>{{name}} {{lastame}}</span></p>' +
		              '<p class="nomEdad"><span>{{age}}</span></p>' +
		              '<p class="nomSede"><span>{{campus}}</span></p>' +
		            '</div>' +
		          '</div>' +
		          '<div class="row">' +
		            '<div class="col push-s1 col push-m1 col s10 col m10 background-soft">' +
		              '<div class="row">' +
		                ' <div class="col m10 col s10">' +
		                  '<p class="top"><strong>Soft Skills</strong></p>' +
		                '</div>' +
		                '<div class="col m2 col s2">' +
		                  '<p class="number right-align">{{average-hse}}</p>' +
		                '</div>' +
		              '</div>' +
		            '</div>' +
		          '</div>' +
		          '<div class="row">' +
		            '<div class="col push-s1 col push-m1 col s10 col m10 background-soft">' +
		              '<div class="row">' +
		                 '<div class="col m10 col s10">' +
		                  '<p class="top"><strong>Technical Skills</strong></p>' +
		                '</div>' +
		                '<div class="col m2 col s2">' +
		                  '<p class="number right-align">{{average-tech}}</p>' +
		                '</div>' +
		              '</div>' +
		            '</div>' +
		          '</div>' +
		        '</div>';


var loadPage = function() {
	$.ajax({
		url:"https://awesome-rank-api.herokuapp.com/api/ranking",
		type: "GET",
		success: function(response){
			var developer;
			for (var i = 0, len = response.ranking.length; i < len; i += 2) {
				developer = response.ranking[i];
				$("#results").append(template.replace("{{name}}", developer.name)
					                         .replace("{{lastame}}", developer.lastname)
					                         .replace("{{age}}", developer.age)
					                         .replace("{{campus}}", developer.campus)
					                         .replace("{{average-hse}}", developer.average)
					                         .replace("{{average-tech}}", response.ranking[i + 1].average));
			}

		}
	});
};

$(document).ready(loadPage);