if(localStorage.getItem("jwt_token")){
  alert("You are already logged in Sending You to Previous Page")
  window.history.back();
}

$("#signup").click(function () {
    $("#loginForm").addClass("hide_slow");

    // $("#signupForm").show("slow");
    setTimeout(function () {
      $(".container").animate({ height: "500px" });
      $("#signupForm").addClass("show_slow");
    }, 500);
    setTimeout(function () {
      // $(".container").animate({position: "relative"});

      $("#signupForm").css("position", "relative");
    }, 2000);
  });

  $("#login").click(function () {
    $(".container").animate({ height: "400px" });

    $("#signupForm").removeClass("show_slow");
    $("#signupForm").css("position", "absolute");

    $("#signupForm").hide("slow");
    // Animation complete.
    $("#loginForm").removeClass("hide_slow");
  });