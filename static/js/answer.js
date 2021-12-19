let bodyData = JSON.parse($("#answerscript").attr("data"));

console.log(bodyData);
document.querySelector(".loadcover").style.display = "block";

$.ajax({
  url: "/user/",
  type: "post",

  headers: {
    "x-auth-token": localStorage.getItem("jwt_token"),
  },
  dataType: "json",
  success: function (data) {
    console.info(data);

    if (data.err) {
      alert(data.err.message);
      return;
    }

    bodyData.currUser = data.username;
    $("#currUser").val(bodyData.currUser);
    setBody(bodyData);
  },
});

$(document).ready(function () {
  var $slider = $("nav .slider"),
    width = $("nav ul li").width;
  $slider.width(width);
});

$(".counter").each(function () {
  var $this = $(this),
    countTo = $this.attr("data-count");

  $({ countNum: $this.text() }).animate(
    {
      countNum: countTo,
    },

    {
      duration: countTo * 100,
      easing: "linear",
      step: function () {
        $this.text(Math.floor(this.countNum));
      },
      complete: function () {
        $this.text(this.countNum);
        //alert('finished');
      },
    }
  );
});

$(".trigger").on("click", function () {
  if ($(this).hasClass("show")) {
    $(".leftmc .pageinfo").css("transform", "translateX(300px)");
    $(this).removeClass("show");
    $(this).addClass("hide");
    $(this).children("i").removeClass("fa-bars");
    $(this).children("i").addClass("fa-times");
  } else {
    $(".leftmc .pageinfo").css("transform", "translateX(-300px)");
    $(this).removeClass("hide");
    $(this).addClass("show");
    $(this).children("i").removeClass("fa-times");
    $(this).children("i").addClass("fa-bars");
  }
});

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

setTimeout(function () {
  document
    .getElementsByClassName("ck-editor__editable_inline")[0]
    .setAttribute("spellcheck", "false");

  document.getElementsByClassName("ck-file-dialog-button")[0].style.display =
    "none";
  document.getElementsByClassName("ck ck-dropdown")[2].style.display = "none";
}, 1000);

$(".savereply").on("click", function (e) {
  e.preventDefault();
  var data = {};
  data.reply = $(".replyquestion")
    .serializeArray()
    .reduce(function (obj, item) {
      obj[item.name] = item.value;
      return obj;
    }, {});
  data.title = bodyData.title;
  data.reply.time = new Date();
  data.reply.likes = [" "];
  data.reply.dislikes = [" "];

  data.reply.contentDetails = changeToContent(theEditor.getData());
  if (data.reply.contentDetails == "err") {
    return;
  }

  console.log(data);
  document.querySelector(".loadcover").style.display = "block";

  $.ajax({
    url: "/qa/addReply",
    type: "post",
    data: data,
    headers: {
      "x-auth-token": localStorage.getItem("jwt_token"),
    },
    dataType: "json",
    success: function (response) {
      console.info(response);
      document.querySelector(".loadcover").style.display = "none";
      if (response.err) {
        alert(response.err.message);
        return;
      }
      alert("success");
    },
  });
});

function changeToContent(blog) {
  //cmimg

  if (blog.length < 20) {
    alert("Add min 20 words in Content");
    return "err";
  }

  blog = blog.replace(/&lt;cmimg/g, "<img");
  blog = blog.replace(/&nbsp;cmimg&gt;/g, ">");
  blog = blog.replace(/cmimg&gt;/g, ">");

  //cmiframe

  blog = blog.replace(/&lt;cmiframe/g, "<iframe");
  blog = blog.replace(/&nbsp;cmiframe&gt;/g, "></iframe>");
  blog = blog.replace(/cmiframe&gt;/g, "></iframe>");

  return blog;
}

function get(name) {
  if (
    (name = new RegExp("[?&]" + encodeURIComponent(name) + "=([^&]*)").exec(
      location.search
    ))
  )
    return decodeURIComponent(name[1]);
}

function ani(op0, trd, curr) {
  $(`.${op0}`).addClass("op0");
  $(`.${trd}`).addClass("trd");
  $("#" + curr).html("Later");
  document.getElementById(curr).onclick = function () {
    remove_ani(op0, trd, curr);
  };
}

function remove_ani(op0, trd, curr) {
  $(`.${op0}`).removeClass("op0");
  $(`.${trd}`).removeClass("trd");
  $("#" + curr).html("Answer");

  document.getElementById(curr).onclick = function () {
    ani(op0, trd, curr);
  };
}

function setBody(data) {
  const element = data;
  console.log(element);
  var upvotestate = "";
  if (element.likes.includes(data.currUser)) {
    upvotestate = "disabled";
  }

  var downvotestate = "";
  if (element.dislikes.includes(data.currUser)) {
    downvotestate = "disabled";
  }

  var tagdivhtml = "";
  for (let i = 0; i < element.tags.length; i++) {
    const tag = element.tags[i];
    var taga = `<a class="dh" href="">${tag}</a>`;

    tagdivhtml += taga;
  }

  var content = "";
  var body = `<div class="qa_container">
        <div class="col1">
            <div class="userimg"><img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8dXNlciUyMHByb2ZpbGV8ZW58MHx8MHx8&w=1000&q=80" alt="" srcset=""></i>
            </div>
            <div class="vote">
                <input type="hidden" class="qnaId" value="${element._id}">
                <button class="ansup upvote v" ${upvotestate}><i class="fa fa-sort-asc" aria-hidden="true"></i>
                </button>
                <div class="count">${
                  element.likes.length - element.dislikes.length
                }</div>
                <button class="ansdown downvote v" ${downvotestate}><i class="fa fa-sort-desc" aria-hidden="true"></i>
                </button>
            </div>
        </div>
        <div class="col2">
            <div class="infobar cdw">
                <div class="name">${element.username}</div>
                <div class="status">Answered</div>
                <div class="date">Asked : ${element.date}</div>
            </div>
            <div class="heading">
              ${element.title}

            </div>
            <br>
            <div class="details">
              ${element.body}
            </div>
            <div class="tags">
                ${tagdivhtml}
            </div>
            <div class="reply cdw">
                <a class=" na dh"><i class="fa fa-comments-o" aria-hidden="true"></i> 4 Answers</a>
                <a class=" views dh"> <i class="fa fa-eye" aria-hidden="true"></i>
                    | 904 views</a>
                <a class="sa" id="sa" href="#replyquestion" onclick="ani('mcc' , 'replyquestion' , this.id , 'ans')">Answer</a>
            </div>
        </div>
    </div>
    <hr>`;

  $(".mc").html($(".mc").html() + body);

  console.log(element.Replies);
  element.Replies = element.Replies.sort(function (a, b) {
    return (
      parseFloat(b.likes.length) -
      parseFloat(b.dislikes.length) -
      parseFloat(a.likes.length) -
      parseFloat(b.dislikes.length)
    );
  });
  console.log(element.Replies);
  for (let i = 0; i < element.Replies.length; i++) {
    const Reply1 = element.Replies[i];

    var replyupvotestate = "";
    if (Reply1.likes.includes(data.currUser)) {
      replyupvotestate = "disabled";
    }

    var replydownvotestate = "";
    if (Reply1.dislikes.includes(data.currUser)) {
      replydownvotestate = "disabled";
    }
    var repliesBody = `<div class="qa_container">
    <div class="col1">
        <div class="userimg"><img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8dXNlciUyMHByb2ZpbGV8ZW58MHx8MHx8&w=1000&q=80" alt="" srcset=""></i>
        </div>
        <div class="vote">
            <input type="hidden" class="qnaId" value="${Reply1.time}">

            <button class="replyup upvote v" ${replyupvotestate}><i class="fa fa-sort-asc" aria-hidden="true"></i>
            </button>
            <div class="count">${
              Reply1.likes.length - Reply1.dislikes.length
            }</div>
            <button class="replydown downvote v" ${replydownvotestate}><i class="fa fa-sort-desc" aria-hidden="true"></i>
            </button>
        </div>
    </div>
    <div class="col2">
        <div class="infobar cdw">
            <div class="name">${Reply1.user}</div>
            <div class="date">${Reply1.time}</div>
        </div>
        <br>
        <div class="details">
          ${Reply1.contentDetails}
        </div>
    </div>
  </div>
    <hr>`;

    $(".mc").html($(".mc").html() + repliesBody);
  }

  $(".ansup").on("click", function () {
    document.querySelector(".loadcover").style.display = "block";

    let x = $(this).parent().children(".count");
    let y = $(this).parent().children(".upvote");
    let z = $(this).parent().children(".downvote");
    let qnaId = $(this).parent().children(".qnaId").val();
    if (!y.is(":disabled")) {
      $.ajax({
        url: "/qa/like",
        type: "post",
        data: {
          id: qnaId,
        },
        headers: {
          "x-auth-token": localStorage.getItem("jwt_token"),
        },
        dataType: "json",
        success: function (data) {
          console.info(data);
          document.querySelector(".loadcover").style.display = "none";
          if (data.err) {
            alert(data.err.message);
            return;
          }
          alert("success");
          x.html(parseInt(x.html()) + 1);
          y.prop("disabled", true);
          z.prop("disabled", false);
        },
      });
    } else {
      alert("Already upvoted");
    }
  });

  $(".ansdown").on("click", function () {
    document.querySelector(".loadcover").style.display = "block";

    let x = $(this).parent().children(".count");
    let y = $(this).parent().children(".upvote");
    let z = $(this).parent().children(".downvote");
    let qnaId = $(this).parent().children(".qnaId").val();
    console.log(qnaId);
    if (!z.is(":disabled")) {
      $.ajax({
        url: "/qa/dislike",
        type: "post",
        data: {
          id: qnaId,
        },
        headers: {
          "x-auth-token": localStorage.getItem("jwt_token"),
        },
        dataType: "json",
        success: function (data) {
          console.info(data);
          document.querySelector(".loadcover").style.display = "none";
          if (data.err) {
            alert(data.err.message);
            return;
          }
          alert("success");
          x.html(parseInt(x.html()) - 1);
          z.prop("disabled", true);
          y.prop("disabled", false);
        },
      });
    } else {
      alert("Already downvoted");
    }
  });

  $(".replyup").on("click", function () {
    document.querySelector(".loadcover").style.display = "block";

    let x = $(this).parent().children(".count");
    let y = $(this).parent().children(".upvote");
    let z = $(this).parent().children(".downvote");
    let qnaId = $(this).parent().children(".qnaId").val();
    if (!y.is(":disabled")) {
      $.ajax({
        url: "/qa/likereply",
        type: "post",
        data: {
          id: bodyData.title,
          replyid: qnaId,
        },
        headers: {
          "x-auth-token": localStorage.getItem("jwt_token"),
        },
        dataType: "json",
        success: function (data) {
          console.info(data);
          document.querySelector(".loadcover").style.display = "none";
          if (data.err) {
            alert(data.err.message);
            return;
          }
          alert("success");
          x.html(parseInt(x.html()) + 1);
          y.prop("disabled", true);
          z.prop("disabled", false);
        },
      });
    } else {
      alert("Already upvoted");
    }
  });

  $(".replydown").on("click", function () {
    document.querySelector(".loadcover").style.display = "block";

    let x = $(this).parent().children(".count");
    let y = $(this).parent().children(".upvote");
    let z = $(this).parent().children(".downvote");
    let qnaId = $(this).parent().children(".qnaId").val();
    console.log(qnaId);
    if (!z.is(":disabled")) {
      $.ajax({
        url: "/qa/dislikereply",
        type: "post",
        data: {
          id: bodyData.title,
          replyid: qnaId,
        },
        headers: {
          "x-auth-token": localStorage.getItem("jwt_token"),
        },
        dataType: "json",
        success: function (data) {
          console.info(data);
          document.querySelector(".loadcover").style.display = "none";
          if (data.err) {
            alert(data.err.message);
            return;
          }
          alert("success");
          x.html(parseInt(x.html()) - 1);
          z.prop("disabled", true);
          y.prop("disabled", false);
        },
      });
    } else {
      alert("Already downvoted");
    }
  });
  document.querySelector(".loadcover").style.display = "none";
}
