if (localStorage.getItem("jwt_token")) {
  alert("You are already logged in Sending You to Previous Page");
  window.history.back();
}

$("#signup").click(function () {

  $("#loginForm").hide()
  $("#signupForm").show()
});

function showlogin() {

  document.getElementById("signupForm").style.display = "none"
  // $("#loginForm").show()
  document.getElementById("loginForm").style.display = "block"


};
