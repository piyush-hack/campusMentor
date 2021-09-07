function setdatainbody(doc_data){

    document.title = doc_data["title"].toUpperCase();
    $("#content_title").html(doc_data["title"]);
    $("#subheading").html(doc_data["subheading"]);
    $("#date").html(doc_data["date"].slice(0,10));
    $("#t_likes").html(doc_data["likes"]);
    $("#t_comments").html(doc_data["Comment"]);
    var tagarr = doc_data["tags"][0].split(",");

    for (let i = 0; i < tagarr.length; i++) {
        document.getElementById("tags").innerHTML += "<span class='a_tag'>"+tagarr[i] + "</span>";
        
    }

    document.getElementById("body").innerHTML = doc_data["body"];


}