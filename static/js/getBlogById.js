var xmlhttp = new XMLHttpRequest(); // new HttpRequest instance
var theUrl = "/blog/IdBlog/" + get("id");

xmlhttp.onreadystatechange = function () {
  if (this.readyState == 4 && this.status == 200) {
    // Typical action to be performed when the document is ready:
    // document.getElementById("demo").innerHTML = xmlhttp.responseText;
    console.log( JSON.parse(xmlhttp.responseText));

    var doc_data = JSON.parse(xmlhttp.responseText);

    setdatainbody(doc_data);

    // setcopyblockquotes();
  }
};
xmlhttp.open("GET", theUrl, true);
xmlhttp.send();

function get(name){
    if(name=(new RegExp('[?&]'+encodeURIComponent(name)+'=([^&]*)')).exec(location.search))
       return decodeURIComponent(name[1]);
 }
