document.getElementById("verify-button1").onclick = function (e) {
  var url = "blog/api/payment/verify";
  var params = {
    razorpay_order_id: document.getElementById("order-id").value,
    razorpay_payment_id: document.getElementById("order-pay-id").value,
    razorpay_signature: document.getElementById("order-sig").value,
    blog_id : get("id"),
  };
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.onreadystatechange = function (res) {
    if (xmlHttp.readyState === 4) {
      alert(xmlHttp.responseText);
    }
  };
  xmlHttp.open("POST", url); // false for synchronous request
  xmlHttp.setRequestHeader("Content-type", "application/json");
  xmlHttp.setRequestHeader("x-auth-token", localStorage.getItem("jwt_token"));
  xmlHttp.send(JSON.stringify(params));
};

function get(name){
  if(name=(new RegExp('[?&]'+encodeURIComponent(name)+'=([^&]*)')).exec(location.search))
     return decodeURIComponent(name[1]);
}

