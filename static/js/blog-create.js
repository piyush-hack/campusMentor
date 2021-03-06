if (!localStorage.getItem("jwt_token")) {
  alert("Plz Login First");
  window.location.href = "/login";
}

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

function ondrive() {
  theEditor.data.set(
    theEditor.getData() +
      `&lt;cmiframe src='${
        document.getElementById("uploadlink").value
      }'  width="640" height="480" allow="autoplay" cmiframe&gt;`
  );

  var html = document.getElementById("prevUploads").innerHTML;
  console.log(html);
  if (html.includes(document.getElementById("uploadlink").value) == false) {
    console.log(html, html.search(document.getElementById("uploadlink").value));
    document.getElementById("prevUploads").innerHTML += `<li> ${
      document.getElementById("uploadlink").value
    } </li>`;
  }

  console.log();
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

  return blog;
}

function hidebanner() {
  var timer = setInterval(() => {
    if (document.getElementsByClassName("goog-te-banner-frame")) {
      document.getElementsByClassName("goog-te-banner-frame")[0].style.display =
        "none";
      clearInterval(timer);
    }
  }, 2000);
}

var tries = 0;
var timer = setInterval(() => {
  if (document.getElementsByClassName("goog-te-banner-frame") || tries >= 100) {
    clearInterval(timer);
    if (
      document.getElementsByClassName("goog-te-banner-frame") &&
      document.getElementsByClassName("goog-te-banner-frame")[0]
    ) {
      document.getElementsByClassName("goog-te-banner-frame")[0].style.display =
        "none";
    }

    clearInterval(timer);
  }
  tries++;
}, 1000);

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

$(".tags-input-wrapper input").on("keydown", function () {
  var tags = "";
  $(".tag").each(function () {
    tags += $(this).html().substring(0, $(this).html().indexOf("<a>")) + ",";
  });

  document.getElementById("tags").value = tags;
});
