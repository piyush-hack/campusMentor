const hamburger = document.querySelector('.header .nav-bar .nav-list .hamburger');
const mobile_menu = document.querySelector('.header .nav-bar .nav-list ul');
const menu_item = document.querySelectorAll('.header .nav-bar .nav-list ul li a');
const header = document.querySelector('.header');

hamburger.addEventListener('click', () => {

  con_zIndex = document.getElementsByClassName("con2")[0].style.zIndex ;

  if(con_zIndex == 1030 || con_zIndex == "" ){
    $(".con2").css('z-index', 0);
  }else{
    $(".con2").css('z-index', 1030);

  }


  // $("#nav_ul").toggle();
  hamburger.classList.toggle('active');
  mobile_menu.classList.toggle('active');
});

// document.addEventListener('scroll', () => {
//   var scroll_position = window.scrollY;
//   if (scroll_position > 250) {
//     header.style.backgroundColor = '#29323c';
//   } else {
//     header.style.backgroundColor = 'transparent';
//   }
// });

menu_item.forEach((item) => {
  item.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    mobile_menu.classList.toggle('active');
  });
});