var xmlhttp = new XMLHttpRequest(); // new HttpRequest instance
var theUrl = "/blog/IdBlog/" + get("id");
if(!localStorage.getItem("jwt_token")){
  window.location.href = "/login";
  die("You need to login first");
}
xmlhttp.onreadystatechange = function () {
  if (this.readyState == 4 && this.status == 200) {
    // Typical action to be performed when the document is ready:
    // document.getElementById("demo").innerHTML = xmlhttp.responseText;


    var doc_data = JSON.parse(xmlhttp.responseText);

    if(doc_data.verifymailerr){
      alert(doc_data.verifymailerr);
      window.location.href = "/"
    }else{
      setdatainbody(doc_data);
    }

    // setcopyblockquotes();
  }
};
xmlhttp.open("GET", theUrl, true);
xmlhttp.setRequestHeader("x-auth-token", localStorage.getItem("jwt_token"));

xmlhttp.send();

function get(name){
    if(name=(new RegExp('[?&]'+encodeURIComponent(name)+'=([^&]*)')).exec(location.search))
       return decodeURIComponent(name[1]);
 }
