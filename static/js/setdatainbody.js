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

  var stickySidebar = $(".edco").offset().top;

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

let theEditor;

ClassicEditor.create(document.querySelector("#contentDetails"), {
  ckfinder: {
    uploadUrl:
      "/ckfinder/core/connector/php/connector.php?command=QuickUpload&type=Files&responseType=json",
  },
  mediaEmbed: {
    previewsInData: true,
  },
})
  .then((editor) => {
    theEditor = editor;
  })
  .catch((error) => {
    console.error(error);
  });

function getDataFromTheEditor() {
  return theEditor.getData();
}

setTimeout(function () {
  document
    .getElementsByClassName("ck-editor__editable_inline")[0]
    .setAttribute("spellcheck", "false");

  document.getElementsByClassName("ck-file-dialog-button")[0].style.display =
    "none";
  document.getElementsByClassName("ck ck-dropdown")[2].style.display = "none";
  document.getElementsByClassName(
    "theorytag"
  )[0].innerHTML += `&nbsp;&nbsp <span data-container="body" data-toggle="popover" data-placement="top"
   title="<h3>How To Insert Image And Iframe </h3>" data-html="true"
   data-content=" <b>Img</b> : To insert Image Just Copy And Paste Image or use campus_mentor custom tag 'cmimg' as <br> <b><xmt>◀cmimg src='imgsrc_here' cmimg▶</xmt></b> 
   <br><br>
   <b>Iframe</b> : Use campus_mentor custom tag <br> <b>◀cmiframe src='src_here' cmiframe▶</b>
   <br><br>
   <b>Inside these tags you can use any property of img and iframe tag of html</b>"
   >
   <i class="fa fa-info-circle" aria-hidden="true"></i></span>`;
  $(function () {
    $('[data-toggle="popover"]').popover();
  });
}, 1000);

function addclass() {
  document.getElementsByClassName(
    "ck-editor__editable_inline"
  )[0].style.minHeight = "500px";
}
setInterval(() => {
  var blog = getDataFromTheEditor();

  blog = changeTagsInblog(blog);

  document.getElementById("my-theory").innerHTML = blog;

  var theory = document.getElementById("my-theory");

  var blockquotes = theory.getElementsByTagName("blockquote");
  for (let i = 0; i < blockquotes.length; i++) {
    // console.log(blockquotes[i].innerHTML);
    blockquotes[i].contentEditable = "true";
    blockquotes[i].onclick = function () {
      copyblockquote(blockquotes[i].innerText);
    };
  }
}, 5000);

function showsub() {
  document.getElementById("submit").style.display = "block";
}

function copyblockquote(copyText) {
  /* Copy the text inside the text field */
  navigator.clipboard.writeText(copyText);

  /* Alert the copied text */
  alert("Copied the text: " + copyText);
}

function changeTagsInblog(blog) {
  //cmimg

  blog = blog.replace(/&lt;cmimg/g, "<img");
  blog = blog.replace(/&nbsp;cmimg&gt;/g, ">");
  blog = blog.replace(/cmimg&gt;/g, ">");

  //cmiframe

  blog = blog.replace(/&lt;cmiframe/g, "<iframe");
  blog = blog.replace(/&nbsp;cmiframe&gt;/g, "></iframe>");
  blog = blog.replace(/cmiframe&gt;/g, "></iframe>");

  //cmscript

  blog = blog.replace(/&lt;cmscript/g, "<script");
  blog = blog.replace(/&nbsp;cmscript&gt;/g, "></script>");
  blog = blog.replace(/cmscript&gt;/g, "></script>");
  return blog;
}

function textareabody(blog) {
  //cmimg

  blog = blog.replace(/<img/g, "&lt;cmimg");
  // blog = blog.replace(/&nbsp;cmimg&gt;/g, ">");
  blog = blog.replace(/cmimg&gt;/g, ">");

  //cmiframe

  blog = blog.replace(/<iframe/g, "&lt;cmiframe");
  blog = blog.replace(/ ><\/iframe>/g, "&nbsp;cmiframe&gt;");
  blog = blog.replace(/><\/iframe>/g, "&nbsp;cmiframe&gt;");

  //cmscript

  blog = blog.replace(/<script/g, "&lt;cmscript");
  blog = blog.replace(/ ><\/script>/g, "&nbsp;cmscript&gt;");
  blog = blog.replace(/><\/script>/g, "cmscript&gt;");

  return blog;
}
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
    blog = textareabody(blog);

    theEditor.data.set(blog);
    const source = document.querySelector(".source");
    const editor = document.querySelector(".ck-editor__main");
    const source_toggle = document.createElement("button");
    source_toggle.textContent = "Source mode";
    source_toggle.classList.add("source-toggle");
    source_toggle.setAttribute("aria-pressed", "false");
    source_toggle.addEventListener("click", function () {
      if (source_toggle.getAttribute("aria-pressed") === "false") {
        source_toggle.setAttribute("aria-pressed", "true");
        source.value = theEditor.getData();
        editor.style.display = "none";
        source.style.display = "block";
      } else {
        source_toggle.setAttribute("aria-pressed", "false");
        theEditor.setData(source.value);
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

  var blog = getDataFromTheEditor();

  blog = changeTagsInblog(blog);

  var postdata = { id: blog_id, body: blog };
  postRequest(JSON.stringify(postdata), "/blog/edit", (data) => editDone(data));
});

function editDone(data) {
  console.log(data);
  alert(data[Object.keys(data)[0]]);
}
