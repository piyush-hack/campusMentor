$(document).ready(function () {
  var $slider = $("nav .slider"),
    width = $("nav ul li").width;
  $slider.width(width);
});

var isactivated = get("x");
console.log(isactivated);

if (!isactivated) {
  isactivated = "ra";
}

$(`.${isactivated}`).addClass("isactive isactivated");
console.log("here");

$(window)
  .resize(function () {
    var $slider = $("nav .slider"),
      width = $("nav ul li").width,
      $isActive = $("nav ul li.isactivated"),
      isX = $isActive.position().left,
      isW = $isActive.width();
    $slider.css({ left: isX, width: isW });

    $slider.width(width);
    $("nav ul li").each(function () {
      var x = $(this).position().left,
        w = $(this).width();
      $(this).on({
        mouseenter: function () {
          $slider.css({ left: x, width: w });
          $("nav ul li").removeClass("isactive");
          $(this).addClass("isactive");
        },
        mouseleave: function () {
          $slider.css({ left: isX, width: isW });
          $("nav ul li").removeClass("isactive");
        },
      });
    });
  })
  .resize();

$("nav ul li").on("click", function () {
  $("nav ul li").removeClass("isactivated");
  $(this).addClass("isactivated");
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
document.querySelector(".loadcover").style.display = "block";

$.ajax({
  url: "/qa/posts",
  type: "get",
  data: {
    page: 1,
    limit: 100,
  },
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
    setBody(data);
  },
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

$(".savequs").on("click", function (e) {
  e.preventDefault();
  var data = $(".askquestion")
    .serializeArray()
    .reduce(function (obj, item) {
      obj[item.name] = item.value;
      return obj;
    }, {});

  var tags = [];
  $(".tag").each(function () {
    tags.push($(this).html().substring(0, $(this).html().indexOf("<a>")));
  });
  data.tags = tags;
  data.content = changeToContent(theEditor.getData());
  if (data.content == "err") {
    return;
  }

  console.log(data);
  document.querySelector(".loadcover").style.display = "block";

  $.ajax({
    url: "/qa/add",
    type: "post",
    data: data,
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
    },
  });
});

function changeToContent(blog) {
  //cmimg

  if (blog.length < 200) {
    alert("Add min 200 words in Content");
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

function ani(op0, trd, curr, str) {
  $(`.${op0}`).addClass("op0");
  $(`.${trd}`).addClass("trd");
  var add = "Open All Questions";
  if (str == "ans") {
    add = "Answer";
  }
  $("#" + curr).html(add);
  $(".mc").scrollTop($(".mc").scrollTop() + 20);

  document.getElementById(curr).onclick = function () {
    remove_ani(op0, trd, curr, str);
  };
}

function remove_ani(op0, trd, curr, str) {
  $(`.${op0}`).removeClass("op0");
  $(`.${trd}`).removeClass("trd");

  var add = "ASK A QUESTION";
  if (str == "ans") {
    add = "Answer";
  }

  $("#" + curr).html(add);

  document.getElementById(curr).onclick = function () {
    ani(op0, trd, curr, str);
  };
}

function setBody(data) {


  for (let i = data.length - 2; i >= 0; i--) {
    const element = data[i];
    console.log(element);
    var upvotestate = "";
    if (element.likes.includes(data[data.length - 1])) {
      upvotestate = "disabled";
    }

    var downvotestate = "";
    if (element.dislikes.includes(data[data.length - 1])) {
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
                <button class="upvote v" ${upvotestate}><i class="fa fa-sort-asc" aria-hidden="true"></i>
                </button>
                <div class="count">${element.likes.length - element.likes.length}</div>
                <button class="downvote v" ${downvotestate}><i class="fa fa-sort-desc" aria-hidden="true"></i>
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
                <a class="sa" href="/qa/answer/${encodeURIComponent(element.title)}">View</a>
            </div>
        </div>
    </div>
    <hr>`;

    $(".mc").html($(".mc").html() + body);
  }

  $(".upvote").on("click", function () {
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

  $(".downvote").on("click", function () {
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

  document.querySelector(".loadcover").style.display = "none";

}

//------------------------------------------tags input field------------------------------------
(function () {
  "use strict";

  // Plugin Constructor
  var TagsInput = function (opts) {
    this.options = Object.assign(TagsInput.defaults, opts);
    this.init();
  };

  // Initialize the plugin
  TagsInput.prototype.init = function (opts) {
    this.options = opts ? Object.assign(this.options, opts) : this.options;

    if (this.initialized) this.destroy();

    if (
      !(this.orignal_input = document.getElementById(this.options.selector))
    ) {
      console.error(
        "tags-input couldn't find an element with the specified ID"
      );
      return this;
    }

    this.arr = [];
    this.wrapper = document.createElement("div");
    this.input = document.createElement("input");
    init(this);
    initEvents(this);

    this.initialized = true;
    return this;
  };

  // Add Tags
  TagsInput.prototype.addTag = function (string) {
    if (this.anyErrors(string)) return;

    this.arr.push(string);
    var tagInput = this;

    var tag = document.createElement("span");
    tag.className = this.options.tagClass;
    tag.innerText = string;

    var closeIcon = document.createElement("a");
    closeIcon.innerHTML = "&times;";

    // delete the tag when icon is clicked
    closeIcon.addEventListener("click", function (e) {
      e.preventDefault();
      var tag = this.parentNode;

      for (var i = 0; i < tagInput.wrapper.childNodes.length; i++) {
        if (tagInput.wrapper.childNodes[i] == tag) tagInput.deleteTag(tag, i);
      }
    });

    tag.appendChild(closeIcon);
    this.wrapper.insertBefore(tag, this.input);
    this.orignal_input.value = this.arr.join(",");

    return this;
  };

  // Delete Tags
  TagsInput.prototype.deleteTag = function (tag, i) {
    tag.remove();
    this.arr.splice(i, 1);
    this.orignal_input.value = this.arr.join(",");
    return this;
  };

  // Make sure input string have no error with the plugin
  TagsInput.prototype.anyErrors = function (string) {
    if (this.options.max != null && this.arr.length >= this.options.max) {
      console.log("max tags limit reached");
      alert("max tags limit reached");
      return true;
    }

    if (!this.options.duplicate && this.arr.indexOf(string) != -1) {
      console.log('duplicate found " ' + string + ' " ');
      alert('duplicate found " ' + string + ' " ');
      return true;
    }

    return false;
  };

  // Add tags programmatically
  TagsInput.prototype.addData = function (array) {
    var plugin = this;

    array.forEach(function (string) {
      plugin.addTag(string);
    });
    return this;
  };

  // Get the Input String
  TagsInput.prototype.getInputString = function () {
    return this.arr.join(",");
  };

  // destroy the plugin
  TagsInput.prototype.destroy = function () {
    this.orignal_input.removeAttribute("hidden");

    delete this.orignal_input;
    var self = this;

    Object.keys(this).forEach(function (key) {
      if (self[key] instanceof HTMLElement) self[key].remove();

      if (key != "options") delete self[key];
    });

    this.initialized = false;
  };

  // Private function to initialize the tag input plugin
  function init(tags) {
    tags.wrapper.append(tags.input);
    tags.wrapper.classList.add(tags.options.wrapperClass);
    tags.orignal_input.setAttribute("hidden", "true");
    tags.orignal_input.parentNode.insertBefore(
      tags.wrapper,
      tags.orignal_input
    );
  }

  // initialize the Events
  function initEvents(tags) {
    tags.wrapper.addEventListener("click", function () {
      tags.input.focus();
    });

    tags.input.addEventListener("keydown", function (e) {
      var str = tags.input.value.trim();

      if (!!~[9, 13, 188].indexOf(e.keyCode)) {
        e.preventDefault();
        tags.input.value = "";
        if (str != "") tags.addTag(str);
      }
    });
  }

  // Set All the Default Values
  TagsInput.defaults = {
    selector: "",
    wrapperClass: "tags-input-wrapper",
    tagClass: "tag",
    max: null,
    duplicate: false,
  };

  window.TagsInput = TagsInput;
})();

var tagInput1 = new TagsInput({
  selector: "tag-input1",
  duplicate: false,
  max: 10,
});
// tagInput1.addData(["PHP", "JavaScript", "CSS"]);

//------------------------------------------tags input field end------------------------------------
