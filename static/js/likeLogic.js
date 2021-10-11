
function like(){

    blog_id = get("id")
    var postdata = { id : blog_id };
    postRequest(JSON.stringify(postdata), "/blog/like", (data) =>
      likeDone(data)
    );
}

function dislike(){

    blog_id = get("id")
    var postdata = { id : blog_id };
    postRequest(JSON.stringify(postdata), "/blog/dislike", (data) =>
      likeDone(data)
    );
}

function likeDone(data){
    // alert(JSON.stringify(data));
    if(data == "liked"){
        $(".heart").addClass("is-active");
        $("#like").on("click", function(){ dislike(); });
    }

    if(data == "disliked"){
        $(".heart").removeClass("is-active");
        $("#like").on("click", function(){ like(); });
    }
}


function get(name) {
    if (
      (name = new RegExp("[?&]" + encodeURIComponent(name) + "=([^&]*)").exec(
        location.search
      ))
    )
      return decodeURIComponent(name[1]);
  }