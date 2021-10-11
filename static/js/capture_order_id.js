document.getElementById("buy_blog_btn").onclick = function (e) {
  var url = "blog/api/payment/order";
  var amount = document.getElementById("pricing").innerHTML * 100;
  console.log(amount)
  var params = {
    amount: amount,
    currency: "INR",
    receipt: "su001",
    transfers: [
      {
        "account": "acc_HqJxw1WergGdKN",
        "amount": amount,
        "currency": "INR",
        "notes": {
          "branch": "Acme Corp Bangalore North",
          "name": "Piyush"
        },
        "linked_account_notes": [
          "branch"
        ],
        "on_hold": 1,
        "on_hold_until": 1671222870
      }],
    payment_capture: "1",
  };

  var xmlHttp = new XMLHttpRequest();

  xmlHttp.open("POST", url); // false for synchronous request
  xmlHttp.setRequestHeader("Content-type", "application/json");
  xmlHttp.setRequestHeader("x-auth-token", localStorage.getItem("jwt_token"));

  xmlHttp.onreadystatechange = function (res) {
    if (xmlHttp.readyState === 4) {
      res = JSON.parse(xmlHttp.responseText);
      alert(res.sub.id);
      document.getElementById("rzp-text").value = res.sub.id;
      document.getElementById("buy_blog_btn").style.display = "none";
      document.getElementById("rzp-button1").style.display = "block";

    }
  };
  xmlHttp.send(JSON.stringify(params));
};
