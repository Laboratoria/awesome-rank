var loadPage = function() {
	var status = sessionStorage.getItem("status") == null ? false : sessionStorage.getItem("status");
	if(status) {
		window.location.href ="/students.html";
	}
	$("#go").click(validate);
};

$(document).ready(loadPage);

var showMessage = function(){
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
	var id = $("#name").val();
	var pass = $("#password").val();

	if (name > 0 && password > 0) {
		$.post("http://awesome-rank-api.herokuapp.com/api/login", {username: id, password: pass}, function(datos, status,xhr) {
			sessionStorage.setItem("status", datos.success ? 1 : 0);
			sessionStorage.setItem("user", JSON.stringify(datos.user));
			if(datos.success === true) {
				window.location.href = "students.html";
			} else {
				showMessage();
			}
		});
	} else {
		showMessage();
	}
};