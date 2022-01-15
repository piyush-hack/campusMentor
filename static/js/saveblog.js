document.getElementById("submit").addEventListener("click", function (event) {
  event.preventDefault();

  if (validateForm() == false) {
    return;
  }
  var xmlhttp = new XMLHttpRequest(); // new HttpRequest instance
  var theUrl = "/blog/Add";
  var data = {
    coverImage: getValue("coverImage"),
    catagory: "code",
    title: getValue("title"),
    subheading: getValue("subheading"),
    tags: getValue("tags"),
    body: document.getElementById("my-theory").innerHTML,
  };
  xmlhttp.open("POST", theUrl);
  xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xmlhttp.setRequestHeader("x-auth-token", localStorage.getItem("jwt_token"));
  xmlhttp.onload = function () {
    // do something to response
    console.log(this.responseText);
    alert(this.responseText);
  };
  xmlhttp.send(JSON.stringify(data));
});

function getValue(id) {
  return document.getElementById(id).value;
}

function validateForm() {
  var a = document.forms["Form"]["coverImage"].value;
  var b = document.forms["Form"]["title"].value;
  var c = document.forms["Form"]["subheading"].value;
  var d = document.forms["Form"]["tags"].value;
  var e = document.getElementById("my-theory").innerHTML;

  if (
    (a == null || a == "",
    b == null || b == "" || b.length < 7,
    c == null || c == "" || c.length < 15,
    d == null || d == "",
    e == null || e == "" || e.length < 200)
  ) {
    alert("Please Fill All Required Field With Required Conditions"+a+b+c+d+e);
    return false;
  }
}

function validateFormDirectly() {
  var t = editorInt();
  var a = document.forms["Form"]["coverImage"].value;
  var b = document.forms["Form"]["title"].value;
  var c = document.forms["Form"]["subheading"].value;
  var d = document.forms["Form"]["tags"].value;
  var e = t.getData();

  if (
    (a == null || a == "",
    b == null || b == "" || b.length < 7,
    c == null || c == "" || c.length < 15,
    d == null || d == "",
    e == null || e == "" || e.length < 200)
  ) {
    alert("Please Fill All Required Field With Required Conditions"+a+b+c+d+e);
    return false;
  }
}
