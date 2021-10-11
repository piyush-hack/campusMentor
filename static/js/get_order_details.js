document.getElementById("rzp-button1").onclick = function (e) {
  var options = {
    key: "rzp_test_O7q0EhSlhM8o2B", //Enter your razorpay key
    currency: "INR",
    name: "Razor Tutorial",
    description: "Razor Test Transaction",
    image: "",
    order_id: document.getElementById("rzp-text").value,
    handler: function (response) {
      document.getElementById("order-pay-id").value =
        response.razorpay_payment_id;
      document.getElementById("order-id").value = response.razorpay_order_id;

      document.getElementById("order-sig").value = response.razorpay_signature;
      document.getElementById("buy_blog_btn").style.display = "none";
      document.getElementById("rzp-button1").style.display = "none";
      document.getElementById("verify-button1").style.display = "block";
    },
    theme: {
      color: "#ED1C24",
    },
  };
  var rzp1 = new Razorpay(options);
  rzp1.on("payment.failed", function (response) {
    alert(response.error.code);
    alert(response.error.description);
    alert(response.error.source);
    alert(response.error.step);
    alert(response.error.reason);
    alert(response.error.metadata.order_id);
    alert(response.error.metadata.payment_id);
  });
  rzp1.open();
  e.preventDefault();
};
