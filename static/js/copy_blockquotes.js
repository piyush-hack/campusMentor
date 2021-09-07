$(document).ready(function(){
    $("#copystart").click( function()
      {
           setcopyblockquotes();
           $("#copystart").css("background-color" , "grey")

       // hljs.initHighlightingOnLoad(); //function of annotation
      });
});

function setcopyblockquotes() {
  var theory = document.getElementById("body");

  var blockquotes = theory.getElementsByTagName("blockquote");
  for (let i = 0; i < blockquotes.length; i++) {
    // console.log(blockquotes[i].innerHTML);
    blockquotes[i].onclick = function () {
      copyblockquote(blockquotes[i].innerText);
    };
  }
}
function copyblockquote(copyText) {
  /* Copy the text inside the text field */
  navigator.clipboard.writeText(copyText);

  /* Alert the copied text */
  alert("Copied the text: " + copyText);
}
