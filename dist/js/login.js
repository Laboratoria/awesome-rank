var loadPage = function() {
	$("#go").click(validate);
};

$(document).ready(loadPage);

var validate = function() {
	var name = $("#name").val().trim().length;
	var password = $("#password").val().trim().length;
	if (name > 0 && password > 0) {
		window.location.href = "estudiantes.html";
	} else {
			swal({
				title: "",
				text: "Username or password invalid",
			  type: "error",
			  confirmButtonColor: "#F9A91A",
			  confirmButtonText: "OK",
			  closeOnConfirm: false,
			  closeOnCancel: false
			});
	}
};