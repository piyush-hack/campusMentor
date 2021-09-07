if (screen.width > 500) {
    VanillaTilt.init(document.querySelectorAll(".card"), {
      max: 25,
      speed: 400,
      glare: true,
      "max-glare": 1,
    });

    //It also supports NodeList
    VanillaTilt.init(document.querySelectorAll(".cardt"));
  }