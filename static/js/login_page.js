if (localStorage.getItem("jwt_token")) {
  alert("You are already logged in Sending You to Previous Page");
  GoBackWithRefresh();
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

function GoBackWithRefresh(event) {
  if ('referrer' in document) {
      window.location = document.referrer;
      /* OR */
      //location.replace(document.referrer);
  } else {
      window.history.back();
  }
}