

var postdata = { a: " " };
postRequest(JSON.stringify(postdata), "/user/getUser/", (data) =>
  console.log(myname(data))
);

document.getElementById("reset_site").style.display = "block";

function myname(userdata) {
  // alert("userdata", userdata);
  console.log("userdata", userdata);
  if (userdata[0]["username"]) {
    document.getElementById("login_logout").innerHTML = "LOGOUT";
    document.getElementById("reset_site").style.display = "none";
    document.getElementById("teachprofile").href = "/myprofile?tn="+userdata[0]["username"]
    document.getElementById("login_logout").onclick = function logout() {
      localStorage.clear();
      window.location.href = "/";
    };

    var username = userdata[0].username.toUpperCase();

    if (userdata[0].status != "approved") {
      document.getElementById("myname").innerHTML =
        " <span style='font-size:25px'>Hi </span><br>" +
        username +
        `<br><a class="fd_btn big_btn" onclick="openmail(this)" >Verfiy Mail</a>`;
    }else{
      document.getElementById("myname").innerHTML =
      " <span style='font-size:25px'>Hi </span><br>" +
      username;
      document.getElementsByClassName("con2")[0].innerHTML = ""
    }
  }
}

getRequest("/blog/getAllBlog/", (data) => console.log(mycard(data)));

function mycard(cardData) {
  console.log(cardData);
  if (cardData) {
    var blogcards = document.getElementById("blogCards");
    blogcards.innerHTML = "";
    for (x in cardData["data"]) {
      blogcards.innerHTML += `
      <div class="card" style="width: 18rem">
          <div class="card-body">
            <h2 class="card-no h2">${parseInt(x) + 1}</h2>
            <h3 class="card-title h3">${cardData["data"][x]["title"]}</h3>
            <p class="card-text">
               ${cardData["data"][x]["subheading"]}
               <br>
               by ${cardData["data"][x]["username"]}
               <div class = "a_tag">
               ${cardData["data"][x]["tags"]}
               </div>
            </p>
            <a href="/blog?id=${
              cardData["data"][x]["_id"]
            }" class="">Visit Blog</a>
          </div>
       </div>
      `;
    }

    settilt();
  }
}
