function verfiymail() {
  var postdata = { password : document.getElementById("mailverfiypassword").value };
  postRequest(JSON.stringify(postdata), "/user/getVerifyMail", (data) =>
    sendalert(data)
  );
}

function sendalert(data){
  console.log(data)
  if(data[0]){
    alert( JSON.stringify(data[0].msg));
  }else{
    alert(data.msg)
  }
}

function openmail(vm){
    vm.style.display = "none";
    document.getElementsByClassName("con2")[0].style.display = "block";

}