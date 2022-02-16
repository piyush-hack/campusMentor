var postdata = { a: " " };
if (localStorage.getItem("jwt_token")) {
  postRequest(JSON.stringify(postdata), "/user/getUser/", (data) =>
    console.log(myname(data))
  );
}

document.getElementById("reset_site").style.display = "block";

function myname(userdata) {
  // alert("userdata", userdata);
  console.log("userdata", userdata);
  if (userdata[0]["username"]) {
    document.getElementById("login_logout").innerHTML = "LOGOUT";
    document.getElementById("reset_site").style.display = "none";
    document.getElementById("teachprofile").href =
      "/myprofile?tn=" + userdata[0]["username"];
    document.getElementById("myallblogs").href =
      "/userBlog?username=" + userdata[0]["username"];
    document.getElementById("login_logout").onclick = function logout() {
      localStorage.clear();
      window.location.href = "/";
    };

    var username = userdata[0].username.toUpperCase();

    if (userdata[0].status != "approved") {
      document.getElementById("myname").innerHTML =
        `<span style='font-size:25px'><a href="#hero">
        <span>C</span>AMPUS <span>M</span>ENTOR</a></span><br> Welcome's ` +
        username +
        `<br><br><a class="fd_btn big_btn" onclick="$('#center_btn').toggle()" >Verfiy Mail</a>`;
    } else {
      document.getElementById("myname").innerHTML =
        `<span style='font-size:25px'><a href="#hero">
        <span>C</span>AMPUS <span>M</span>ENTOR</a></span><br> Welcome's ` +
        username +
        `<br><br><a class="fd_btn big_btn" href="/qna" >Ask A Doubt</a>`;
      document.getElementsByClassName("con2")[0].innerHTML = "";
    }
  }
}

getRequest("/blog/getAllBlog/", (data) => console.log(mycard(data)));

function mycard(cardData) {
  console.log(cardData);
  if (cardData) {
    var blogcards = document.getElementById("blogCards");
    blogcards.innerHTML = "";
    cardData.data = cardData.data.reverse().slice(0, 6);
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

getRequest("/teachProfile/getAllProfiles/", (data) =>
  console.log(myteachcards(data))
);

function myteachcards(data) {
  console.log("teachdata", data);
  if (data) {
    var allteachcards = document.getElementById("allteachcards");

    allteachcards.innerHTML = "";

    for (x in data["data"]) {
      rating = ["", "", "", "", ""];

      for (let i = 5; i > data["data"][x]["rating"]; i--) {
        rating[i - 1] = "grey";
      }

      console.log(data["data"]);
      allteachcards.innerHTML += `
        <div class="teach_card">
          <div class="img_section">
            <a href="/myprofile?tn=${data["data"][x]["name"]}">
              <img src="${data["data"][x]["profileimg"]}" alt="" srcset="">
            </a>
            <ul class="teach_options">
              <li>
                <i class="fa fa-eye" aria-hidden="true"></i>
                <span>${data["data"][x]["fee"]["feedesc"]}</span>
              </li>
              <li>
                <i class="fa fa-address-book" aria-hidden="true"></i>
                <span>${data["data"][x]["phone"]} , ${data["data"][x]["email"]}</span>
              </li>
              <li>
                <i class="fa fa-info-circle" aria-hidden="true"></i>
                <span>${data["data"][x]["name"]} <br> ${data["data"][x]["position"]} </span>
              </li>
            </ul>
          </div>
          <div class="details">
            <div class="fee">
              | ₹ ${data["data"][x]["fee"]["fees"]} / ${data["data"][x]["fee"]["time"]}
            </div>
            <div class="rating">
              <i class="fa fa-star ${rating[0]}" aria-hidden="true"></i>
              <i class="fa fa-star  ${rating[1]}" aria-hidden="true"></i>
              <i class="fa fa-star  ${rating[2]}" aria-hidden="true"></i>
              <i class="fa fa-star  ${rating[3]}" aria-hidden="true"></i>
              <i class="fa fa-star  ${rating[4]}" aria-hidden="true"></i>
            </div>
          </div>
        </div>
      `;
    }
  }
}
