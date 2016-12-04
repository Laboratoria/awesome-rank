var loadPage = function() {
	$("#go").click(validate);
	if(Boolean(status) === true){
		window.location.href ="/estudiantes.html";
	}
};

var status= localStorage.getItem("status");

$(document).ready(loadPage);


var alert= function(){
	swal({
		title: "",
		text: "Username or password invalid",
	  type: "error",
	  confirmButtonColor: "#F9A91A",
	  confirmButtonText: "OK",
	  closeOnConfirm: false,
	  closeOnCancel: false
	});
};

var validate = function() {
	var name = $("#name").val().trim().length;
	var password = $("#password").val().trim().length;
	var id= $("#name").val();
	var pass= $("#password").val();

	if (name > 0 && password > 0) {
		$.post("http://awesome-rank-api.herokuapp.com/api/login", {username: id, password: pass}, function(datos, status,xhr){
			localStorage.setItem("status", datos.success);
			if(datos.success === true){
				window.location.href = "estudiantes.html";
			}else{
				alert();
			}
		})
	}else {
		alert()
	}
};