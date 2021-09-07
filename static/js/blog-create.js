let theEditor;

// EditorClass.create({
//   toolbar: ["bold", "italic"],
//   mediaEmbed: {
//     previewsInData: true,
//   },
// })
//   .then("hgmgh")
//   .catch("...");

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
  document.getElementsByClassName(
    "ck-rounded-corners ck-editor__editable_inline"
  )[0].style.minHeight = "500px";
  document.getElementsByClassName(
    "ck-rounded-corners ck-editor__editable_inline"
  )[0].onclick = function () {
    addclass();
  };

  document
    .getElementsByClassName("ck-editor__editable_inline")[0]
    .setAttribute("spellcheck", "false");
}, 1000);

function addclass() {
  document.getElementsByClassName(
    "ck-editor__editable_inline"
  )[0].style.minHeight = "500px";
}

setInterval(() => {
  var blog = getDataFromTheEditor();
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
