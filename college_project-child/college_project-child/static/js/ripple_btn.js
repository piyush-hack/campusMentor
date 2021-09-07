const btn = document.querySelector(".ripple_btn");

btn.onmousemove = function (e){

    // const x = e.pageX - btn.offsetLeft -260 ;
    // const y = e.pageY - btn.offsetTop -90;

    const x = btn.offsetLeft ;
    const y = btn.offsetTop;

    // const x = e.clientX  ; 
    // const y = e.clientY  ;

    btn.style.setProperty('--x',  x + 'px');
    btn.style.setProperty('--y',  y + 'px');

}