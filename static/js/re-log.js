document.getElementById("sign_up").addEventListener("click", function (event) {
  event.preventDefault();

  var data = {
    username: document.getElementById("username").value,
    email: document.getElementById("email").value,
    password: document.getElementById("password").value,
    confpassword: document.getElementById("confpassword").value,
  };

  post_re("/user/register", data);
});

document.getElementById("login").addEventListener("click", function (event) {
  event.preventDefault();

  var data = {
    username: document.getElementById("loginusername").value,
    password: document.getElementById("loginpassword").value,
  };

  post_re("/user/login", data);
});
function post_re(url, data) {
  var xmlhttp = new XMLHttpRequest(); // new HttpRequest instance
  var theUrl = url;
  var sendata = data;
  xmlhttp.open("POST", theUrl);
  xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  //   xmlhttp.setRequestHeader(
  //     "x-auth-token",
  //     "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTM0ZTZjNGQ2NTNiYzRmYjgxNDA3MDMiLCJyb2xsIjoiYmFzaWMiLCJpYXQiOjE2MzA4NTY5MDB9.pagmdaTZY07toF3DfSFa-Ol6_qLbRnvPieE_U5wb1oo"
  //   );
  xmlhttp.onload = function () {
    // do something to response
    alert( JSON.parse(this.responseText).msg);
    rresponse = this.responseText;
    registerd(this.responseText);
  };
  xmlhttp.send(JSON.stringify(sendata));
}

function registerd(re_response) {
  console.log("re_response : ", re_response);
  re_response = JSON.parse(re_response);
  console.log("re_response parsed : ", re_response);

  msg = re_response.msg;

  if (re_response.token != undefined) {
    token = re_response.token;
    if (typeof Storage !== "undefined") {
      // Store
      localStorage.setItem("jwt_token", token);
      // Retrieve
      console.log(
        "local storage token is : ",
        localStorage.getItem("jwt_token")
      );
      window.history.back().reload();
    } else {
      alert("Sorry, your browser does not support Web Storage...");
    }
  }
}
