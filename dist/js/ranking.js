var template =	'<div>'+
					'<div class="row s-m">'+
						'<div class="col s4 m4">'+
							'<div class="image-profile">'+
	            		'<img src="{{image}}">'+
	          		'</div>'+
						'</div>'+
						'<div class="col s8 m8">'+
							'<div class="data">'+
    							'<h5>#{{position}}</h5>'+
    							'<h6>{{name}} {{lastname}}</h6>'+
    							'<p>{{title}}</p>'+
    							'<p>{{squad}}</p>'+
							'</div>'+
						'</div>'+
					'</div>'+
					'<div class="row s-m">'+
						'<div class="col s6 m6">'+
							'<div class="rank-point left">'+
								'<div class="div-points">{{average-tech}}</div>'+
								'<p>Technical Skills</p>'+
							'</div>'+
						'</div>'+
						'<div class="col s6 m6">'+
							'<div class="rank-point right">'+
								'<div class="div-points">{{average-hse}}</div>'+
								'<p>Soft Skills</p>'+
							'</div>'+
						'</div>'+
					'</div>'+
				'</div>';

var loadPage = function() {
	$.ajax({
		url:"https://awesome-rank-api.herokuapp.com/api/ranking",
		type: "GET",
		success: function(response){
			var developer;
			for (var i = 0, len = response.ranking[0].length; i < len; i ++) {
				developer = response.ranking[0][i];
				$("#results").append(template.replace(/{{name}}/g, developer.name)
											 	.replace("{{position}}", i+1)
					                        	.replace(/{{lastname}}/g, developer.lastname)
					                        	.replace("{{image}}", developer.photoUrl)
					                        	.replace("{{title}}", developer.title)
					                        	.replace("{{squad}}", developer.squad)
					                        	.replace("{{average-tech}}", Number(developer.avgtech.toFixed(2)))
					                        	.replace("{{average-hse}}", Number(developer.avghse).toFixed(2)));
			}
		}
	});
};

$(document).ready(loadPage);