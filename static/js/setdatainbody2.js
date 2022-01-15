var username = "null";

function setdatainbody(doc_data) {
  console.log(doc_data);

  if (localStorage.getItem("jwt_token")) {
    document.getElementById("like").onclick = function () {
      like();
    };

    var xmlhttp = new XMLHttpRequest(); // new HttpRequest instance
    var theUrl = "/user/getUser/";
    var sendata = { fff: "ddd" };
    xmlhttp.open("POST", theUrl);
    xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xmlhttp.setRequestHeader("x-auth-token", localStorage.getItem("jwt_token"));
    xmlhttp.onload = function () {
      // do something to response
      console.log(this.responseText);
      username = JSON.parse(xmlhttp.responseText)[0]["username"];
      // alert("respone" + username + "=---" + doc_data["likes"]);
      if (doc_data["likes"].includes(username)) {
        $(".heart").addClass("is-active");
        document.getElementById("like").onclick = function () {
          dislike();
        };
      }

      if (doc_data["username"] != username) {
        document.getElementById("editcontent").innerHTML = "";
      }
    };
    xmlhttp.send(JSON.stringify(sendata));
  } else {
    document.getElementById("like").onclick = function () {
      window.location.href = "/login";
    };
  }
  document.title = doc_data["title"].toUpperCase();
  $("#content_title").html(doc_data["title"]);
  $("#subheading").html(doc_data["subheading"]);
  $("#date").html(doc_data["date"].slice(0, 10));
  document.getElementById("blogvisit").href =
    "/userBlog/" + doc_data["username"];
  $("#t_comments").html(doc_data["Comment"]);
  var tagarr = doc_data["tags"][0].split(",");

  for (let i = 0; i < tagarr.length; i++) {
    document.getElementById("tags").innerHTML +=
      "<span class='a_tag'>" + tagarr[i] + "</span>";
  }

  if (doc_data["price"] > 0) {
    document.getElementById("body").innerHTML = doc_data["body"].slice(
      0,
      doc_data["body"].length / 10
    );

    document.getElementById(
      "modal-body"
    ).innerHTML = `Buy This Blog For Always At Rupess <span id="pricing">${doc_data["price"]}</span>`;

    var x = `<div style="width:70vw;min-height:70vh;filter: blur(5px);font-size:16px">
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam dignissim sagittis risus, sit amet consequat eros laoreet at. Donec a ligula ac velit varius pulvinar. Cras aliquam tellus non nisi molestie, vel scelerisque sapien vestibulum. Morbi metus ex, volutpat a blandit at, dictum ut turpis. Pellentesque turpis turpis, elementum vel quam in, dapibus scelerisque sem. Duis suscipit laoreet rhoncus. Vestibulum urna arcu, pellentesque vel sodales rhoncus, imperdiet ut sem. Aenean sit amet leo eget justo tincidunt rhoncus vitae vitae felis. Donec eu consectetur ante, nec convallis nisl. In dictum sem non lacus sodales ultrices. Aenean viverra, nulla at sagittis venenatis, est metus finibus tortor, porttitor tempus risus nisl pharetra lectus. Curabitur magna nulla, interdum sit amet mi sit amet, molestie suscipit lorem. Maecenas id lorem mauris. Donec accumsan urna sed diam rhoncus interdum. Quisque imperdiet malesuada purus, quis ultrices lacus consectetur et.

    Proin fringilla ex felis, ac fringilla odio interdum eu. Fusce at dolor a libero ultrices bibendum. Vivamus ut dictum augue, vitae condimentum augue. Ut euismod, nisi eu lobortis commodo, mauris sapien elementum lacus, ac maximus justo eros nec purus. Ut massa enim, euismod non venenatis nec, lobortis quis purus. Donec mollis, sem et iaculis tincidunt, ex est suscipit lorem, sit amet varius ligula lorem nec neque. Maecenas venenatis ex sapien, ac auctor enim rhoncus vel. Sed ut elementum felis. Donec iaculis pretium massa in rutrum. Curabitur tristique tellus condimentum est ultricies, vel faucibus urna laoreet. Quisque nec arcu eget orci varius blandit ac aliquet nunc.
    
    Vivamus sed metus eget neque pellentesque ullamcorper. Cras tempor dictum ex ut egestas. Aliquam eu odio dapibus nulla interdum pharetra id sed ipsum. Aenean in nisi vel mauris molestie mollis sit amet ac lectus. Donec mauris urna, commodo eget pharetra ac, convallis quis tellus. Cras mattis aliquam maximus. Pellentesque ac dolor nec ex volutpat tincidunt ac nec urna.
    
    Nulla odio lectus, tincidunt ac pretium sed, commodo vitae nisi. Aliquam semper felis eu quam pulvinar, vitae cursus justo interdum. Integer convallis lorem erat, et rhoncus nulla dapibus vel. Donec semper eleifend ligula et facilisis. Integer scelerisque risus quis commodo gravida. Mauris suscipit quis nisi in dignissim. Nunc faucibus condimentum lorem vel efficitur. Nullam condimentum lorem eget turpis rutrum fermentum. Cras interdum justo ut eros volutpat, nec scelerisque magna sodales. Phasellus eget quam non ante ultricies scelerisque. Phasellus leo urna, interdum nec leo a, hendrerit convallis felis. In finibus justo massa, eget euismod libero sagittis at. Vivamus maximus iaculis egestas. Nam imperdiet ipsum rhoncus nunc cursus varius. Etiam vehicula tortor nec tortor mattis commodo.
    
    Etiam et libero sodales, dictum tellus eget, iaculis turpis. Proin orci tortor, sagittis vitae massa at, bibendum suscipit lectus. Nullam finibus rhoncus lacus, nec tincidunt ligula feugiat vitae. Etiam semper odio ac nisl cursus dapibus. Morbi condimentum, libero vitae fermentum pharetra, nunc est aliquam neque, sit amet convallis eros lacus nec orci. Phasellus at metus finibus, tincidunt sapien vel, congue justo. Sed sed finibus tellus. In placerat maximus est ac elementum. Pellentesque blandit sem ex, in aliquam justo facilisis at. Donec scelerisque fermentum egestas. Nulla facilisi. Curabitur non iaculis lacus, commodo pellentesque odio. Maecenas vulputate arcu velit, vitae ultricies sem ultrices nec.
    </div>`;
    document.getElementById("body").innerHTML += x + x + x;
  } else {
    document.getElementById("price-modal").innerHTML = "";

    document.getElementById("body").innerHTML = doc_data["body"];
  }
  // document.getElementsByTagName("blockquote").contentEditable = "true";
  var blockquotes = document.getElementsByTagName("blockquote");
  for (let i = 0; i < blockquotes.length; i++) {
    blockquotes[i].contentEditable = "true";
  }
  hljs.initHighlightingOnLoad();
  $("blockquote").each(function (i, block) {
    hljs.highlightBlock(block);
  });

  $(".hljs-comment").css("color" , "white")

  document.getElementById("load").style.display = "none";
  document.getElementById("mainContainer").style.display = "block";

  var stickySidebar = $(".edco").offset().top - 300;

  $(window).scroll(function () {
    if ($(window).scrollTop() > stickySidebar) {
      $("#blogging").addClass("affix");
    } else {
      $("#blogging").removeClass("affix");
    }
  });
}

// window.onload = function () {
//   setTimeout(function () {
//     var fbframe =
//       document.getElementsByTagName("iframe")[
//         document.getElementsByTagName("iframe").length - 2
//       ];

//     console.log(fbframe);
//     try {
//       fbframe.setAttribute("id", "fbframe");
//     } catch (error) {
//       console.log("err", error);
//     }

//     setTimeout(function () {
//       try {
//         let myiFrame = document.getElementById("fbframe");
//         let doc = myiFrame.contentDocument;
//         let doc2 = (myiFrame.contentWindow || myiFrame.contentDocument);
//         // if (doc2.document){
//         //   doc2 = doc2.document;
//         // }
//         console.log(doc , doc2);
//         doc2.body.style.backgroundColor = "red";
//         doc2.body.innerHTML =
//         doc2.body.innerHTML +
//           "<style>/******* Put your styles here *******</style>";
//       } catch (error) {
//         console.log("append err", error);
//       }
//     }, 2000);
//   }, 2000);
// };

var putext = 0;
document.getElementById("newedit").addEventListener("click", function () {
  var x = document.getElementById("editcontent1");
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }

  if (putext == 0) {
    var blog = document.getElementById("body").innerHTML;
    // blog = textareabody(blog);

    var t = editorInt()
    t.data.set(blog);
    const source = document.querySelector(".source");
    const editor = document.querySelector(".ck-editor__main");
    const source_toggle = document.createElement("button");
    source_toggle.textContent = "Source mode";
    source_toggle.classList.add("source-toggle");
    source_toggle.setAttribute("aria-pressed", "false");
    source_toggle.addEventListener("click", function () {
      if (source_toggle.getAttribute("aria-pressed") === "false") {
        source_toggle.setAttribute("aria-pressed", "true");
        source.value = t.getData();
        editor.style.display = "none";
        source.style.display = "block";
      } else {
        source_toggle.setAttribute("aria-pressed", "false");
        t.setData(source.value);
        editor.style.display = "block";
        source.style.display = "none";
      }
    });
    const editor_toolbar = document.querySelector(".ck-toolbar");
    editor_toolbar.appendChild(source_toggle);
  }
  putext++;
});

document.getElementById("savedit").addEventListener("click", function () {
  blog_id = get("id");
  var t = editorInt()
  var blog = t.getData();

//   blog = changeTagsInblog(blog);

  var postdata = { id: blog_id, body: blog };
  postRequest(JSON.stringify(postdata), "/blog/edit", (data) => editDone(data));
});

function editDone(data) {
  console.log(data);
  alert(data[Object.keys(data)[0]]);
}

document.querySelector("#preview-data-action").addEventListener("click", () => {
    var t = editorInt();
    const e = [...document.querySelectorAll("link")].find((t) =>
        t.href.endsWith("assets/styles.css")
      ),
      n = [...document.querySelectorAll("link")].find((t) =>
        t.href.endsWith("snippet.css")
      ),
      i = document.querySelector("#preview-data-container"),
      ss =
        `<!DOCTYPE html>
        <html>
        <head>
        <meta charset="utf-8"><title>${document.title}</title>
        <link rel="stylesheet" href="${e.href}" type="text/css">
        <link rel="stylesheet" href="${n.href}" type="text/css">
        <style>\n\t\t\t\t\t\tbody {\n\t\t\t\t\t\t\tpadding: 20px;\n\t\t\t\t\t\t}\n\t\t\t\t\t\t.formatted p img {\n\t\t\t\t\t\t\tdisplay: inline;\n\t\t\t\t\t\t\tmargin: 0;\n\t\t\t\t\t\t}\n\t\t\t\t\t</style>
        </head>
        <body class="formatted ck-content">` +
        t.getData() +
        "</body></html>";
    s = `
  <!doctype html>
  <html lang="en">
  
  <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
      <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
      <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
      
      <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.16.0/umd/popper.min.js"></script>
      <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
      <link rel="stylesheet" href="../static/css/blog.css">
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
      <link rel="stylesheet" href="../static/css/front_page.css" />
      <link rel="stylesheet" href="../static/css/code.css">
      <link rel="stylesheet" href="../static/css/loader.css">
      <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/highlight.js/9.15.6/styles/monokai-sublime.min.css" />
  
      <script src="//cdnjs.cloudflare.com/ajax/libs/highlight.js/9.15.6/highlight.min.js"></script>
      
  
      <title>Campus Mentor Blog</title>
      <style>\n\t\t\t\t\t\tbody {\n\t\t\t\t\t\t\tpadding: 20px;\n\t\t\t\t\t\t}\n\t\t\t\t\t\t.formatted p img {\n\t\t\t\t\t\t\tdisplay: inline;\n\t\t\t\t\t\t\tmargin: 0;\n\t\t\t\t\t\t}\n\t\t\t\t\t</style>
  
  </head>
  
  <body>
  
  
      <div class="mt-5" id="body">
      ${t.getData()}</div>
  
  </body>
  
  </html>`;
    i.contentWindow.document.open(),
      i.contentWindow.document.write(s),
      i.contentWindow.document.close();
  });