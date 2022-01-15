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

function showsub() {
  document.getElementById("submit").style.display = "block";
}

document.getElementById("submit").addEventListener("click", function (event) {
  event.preventDefault();

  if (validateForm() == false) {
    return;
  }
  var t = editorInt();
  var xmlhttp = new XMLHttpRequest(); // new HttpRequest instance
  var theUrl = "/blog/Add";
  var data = {
    coverImage: getValue("coverImage"),
    catagory: "code",
    title: getValue("title"),
    subheading: getValue("subheading"),
    tags: getValue("tags"),
    body: t.getData(),
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
    alert(
      "Please Fill All Required Field With Required Conditions" +
        a +
        b +
        c +
        d +
        e
    );
    return false;
  }
}
