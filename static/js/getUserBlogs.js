let queryusername = document.getElementById("thishandler").getAttribute("data");
console.log("queryusername", queryusername,);
url = "/blog/UserBlog/"+ queryusername;
getRequest(url, (data) => console.log(usercard(data)));

function usercard(cardData) {
  console.log("cardData" , cardData);
  if (cardData) {
    var blogcards = document.getElementById("blogCards");
    blogcards.innerHTML = "";
    cardData.reverse();
    for (x in cardData) {
      blogcards.innerHTML += `
      <div class="card" style="width: 18rem">
          <div class="card-body">
            <h2 class="card-no h2">${parseInt(x) + 1}</h2>
            <h3 class="card-title h3">${cardData[x]["title"]}</h3>
            <p class="card-text">
               ${cardData[x]["subheading"]}
               <br>
               by ${cardData[x]["username"]}
               <div class = "a_tag">
               ${cardData[x]["tags"]}
               </div>
            </p>
            <a href="/blog?id=${
              cardData[x]["_id"]
            }" class="">Visit Blog</a>
          </div>
       </div>
      `;
    }

    settilt();
  }else{
      alert("bujdujfd")
  }

  return "completed"
}

function get(name) {
  if (
    (name = new RegExp("[?&]" + encodeURIComponent(name) + "=([^&]*)").exec(
      location.search
    ))
  )
    return decodeURIComponent(name[1]);
}
