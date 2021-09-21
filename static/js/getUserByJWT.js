function postRequest(data, url, callback) {
  var xmlhttp = new XMLHttpRequest(); // new HttpRequest instance
  var theUrl = url;
  var sendata = JSON.parse(data);
  xmlhttp.open("POST", theUrl);
  xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xmlhttp.setRequestHeader("x-auth-token", localStorage.getItem("jwt_token"));
  xmlhttp.onload = function () {
    // do something to response
    // alert(this.responseText);
    callback(JSON.parse(this.responseText));
  };
  xmlhttp.send(JSON.stringify(sendata));
}

function getRequest(url, callback) {
  theurl = url;
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      // do something to response
      // alert(this.responseText);
      callback(JSON.parse(this.responseText));
    }
  };
  xhttp.open("GET", theurl, true);
  xhttp.setRequestHeader("x-auth-token", localStorage.getItem("jwt_token"));

  xhttp.send();
}
