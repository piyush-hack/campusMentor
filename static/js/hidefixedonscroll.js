window.onscroll = function (e) {
  con_pos = document.getElementsByClassName("con2")[0].style.position;
  if (window.scrollY > 200) {
    if (con_pos == "fixed") {
      $(".con2").css("margin-top", window.scrollY);
      $(".con2").css("position", "relative");
    }
  } else {

    $(".con2").css("margin-top", '0px');

    $(".con2").css("position", "fixed");
  }
};

// $("#toogle_nav").click(function () {
//   $(".alloptions").toggle(1000);
// });
