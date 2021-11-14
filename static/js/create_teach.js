var postdata = { a: " " };
postRequest(JSON.stringify(postdata), "/user/getUser/", (data) =>
  console.log(myname(data))
);

function myname(userdata) {
  // alert("userdata", userdata);
  console.log("userdata", userdata);
  if(userdata["message"] == 'jwt malformed'){
    window.location.href = "/login"
    return
  }
  if (userdata[0]["username"]) {
    let lastname = "";

    if(userdata[0]["username"].split(" ")[1] == undefined){
        lastname = "";
    }else{
        lastname = userdata[0]["username"].split(" ")[1]
    }

    seti("username", `${userdata[0]["username"].split(" ")[0]} <span class="purple" id="lastname">${lastname}</span>`);
  }else{
  }
}

function seti(id , value){
  document.getElementById(id).innerHTML = value;
}

$(document).ready(function () {
  $("input").attr("maxlength", "60");
});

var add = document.getElementById("addElem");

function addli(listid, inputclass) {
  if (document.querySelectorAll(`#${listid} li`).length >= 6) {
    alert("Only 6 Can Be Added");
    return;
  }

  var list = document.getElementById(listid);
  var newInput = document.createElement("li");
  newInput.innerHTML = `<input type="text" class="${inputclass}">`;
  list.appendChild(newInput);
}

function addexpli(listid, liclass) {
  if (document.querySelectorAll(`#${listid} li`).length >= 6) {
    alert("Only 6 Can Be Added");
    return;
  }

  var list = document.getElementById(listid);
  var newInput = document.createElement("li");
  newInput.setAttribute("class", `section__list-item ${liclass} `);
  newInput.innerHTML = `<div class="left exp">
        <div class="name"><input type="text" placeholder="NAME" class="iname"></div>
        <div class="addr"><input type="text" placeholder="ADDRESS" class="iaddress"></div>
        <div class="duration"><input type="text" placeholder="Jan 2011 - Feb 2015" class="iduration"></div></div>
    <div class="right">
        <div class="name"><input type="text" placeholder="NAME" class="iname"></div>
        <div class="addr"><input type="text" placeholder="ADDRESS" class="iaddress"></div>
        <div class="duration"><input type="text" placeholder="Jan 2011 - Feb 2015" class="iduration"></div>
    </div>`;
  list.appendChild(newInput);
}

function addeproli(listid, liclass) {
  if (document.querySelectorAll(`#${listid} li`).length >= 6) {
    alert("Only 6 Can Be Added");
    return;
  }

  var list = document.getElementById(listid);
  var newInput = document.createElement("li");
  newInput.setAttribute("class", `section__list-item ${liclass} `);
  newInput.innerHTML = `<div class="name"><input type="text" placeholder="TITLE" style="font-weight: bold;" maxlength="20" class="iname"></div>
  <div class="text"><textarea name="" cols="80" rows="4" maxlength="250" placeholder="Project Description" class="itext"></textarea></div>`;
  list.appendChild(newInput);
}

function addskilli(listid) {
  if (document.querySelectorAll(`#${listid} .skills__item`).length >= 6) {
    alert("Only 6 Can Be Added");
    return;
  }

  var list = document.getElementById(listid);
  var newInput = document.createElement("div");
  newInput.setAttribute("class", `skills__item skill`);
  newInput.innerHTML = `<div class="left">
            <div class="name"><input type="text" class="skillname"><input type="number" max="5" onkeyup="if(this.value > 5){ this.value = null; alert('Score Out Of 5 Only')}" class="skillscore" placeholder="Rate Skills From 5"></div>
        </div>`;
  list.appendChild(newInput);
}

async function submitform() {
  let position = vli("position");
  let imgsrc = vli("profimgsrc");
  let intro = vli("intro");
  let phone = vli("phone");
  let email = vli("email");
  let address = vli("address");
  let city = vli("city");
  let postalcode = vli("postalcode");
  let quote = vli("quote");
  let quoteby = vli("quoteby");
  let about = vli("about");
  let belief = vli("belief");
  let methodcontent = vli("methodcontent");
  var list = await iva(
    document.getElementById("list").getElementsByTagName("li"),
    "beliefs",
    0
  );
  var teachsubjects = await iva(
    document.getElementById("teachsubjects").getElementsByTagName("li"),
    "teachsubjects",
    0
  );

  var explist = await iva(
    document.getElementById("explist").getElementsByTagName("li"),
    "exp",
    1
  );

  var edulist = await iva(
    document.getElementById("edulist").getElementsByTagName("li"),
    "edu",
    1
  );

  var prolist = await iva(
    document.getElementById("prolist").getElementsByTagName("li"),
    "pro",
    2
  );

  var skills = await iva(
    document.getElementById("skills").getElementsByClassName("skill"),
    "skill",
    3
  );

  var fee = {
    fees: vli("fees"),
    time: vli("feetime"),
    feedesc: vli("feedesc"),
  };

  data = {
    position: position,
    profileimg : imgsrc,
    intro: intro,
    phone: phone,
    email: email,
    address: address,
    city: city,
    postalcode: postalcode,
    quote: quote,
    quoteby: quoteby,
    about : about,
    belief: belief,
    methodcontent: methodcontent,
    list: list,
    teachsubjects: teachsubjects,
    explist: explist,
    edulist: edulist,
    prolist: prolist,
    skills: skills,
    fee: fee,
  };
  data = JSON.stringify(data);

  url = "/teachProfile/Add";

  const num1 = Math.floor(Math.random() * 15 + 1);
  const num2 = Math.floor(Math.random() * 15 + 1);
  let sol = prompt(
    `Please Enter Sum Of ${num1} + ${num2} To Confirm . 
  You Cannot Edit Your Resume After Saving Plz Check Again If Everything Is Alright:`,
    `0`
  );
  if (sol == null || sol.trim() == "") {
    text = "User cancelled the prompt.";
  } else if(sol == (num1 + num2)){
    await postRequest(data, url, (data) => console.log(profileres(data)));
  }else{
      alert(sol)
  }

  
}

function profileres(param) { 

    if(param["err"]){
        let errs = "";
        if(param["err"]["errors"]){
            for (const key in param["err"]["errors"]) {
                errs += param["err"]["errors"][key]["message"] + "\n";
            }
            alert(errs);
            
            return errs;
        }
    }

    if(param["msg"]){
        alert(param["msg"])
    }
 }

function vli(id) {
  var invalue = document.getElementById(id).value;
  console.log(escapeHTML(invalue));
  return escapeHTML(invalue);
}

async function iva(liarr, icn, cond) {
  let output = {};

  if (cond == 0) {
    let i = 0;

    for (const element of liarr) {
      output[`${icn}${i}`] = escapeHTML(element.querySelector(`.${icn}`).value);
      i++;
    }
  } else if (cond == 1) {
    let i = 0;

    for (const element of liarr) {
      output[`${icn}${i}`] = {};
      output[`${icn}${i}`]["left"] = {};
      output[`${icn}${i}`]["right"] = {};

      output[`${icn}${i}`]["left"]["name"] = escapeHTML(
        element
          .querySelector(".left")
          .querySelector(".name")
          .querySelector(".iname").value
      );
      output[`${icn}${i}`]["left"]["address"] = escapeHTML(
        element
          .querySelector(".left")
          .querySelector(".addr")
          .querySelector(".iaddress").value
      );
      output[`${icn}${i}`]["left"]["duration"] = escapeHTML(
        element
          .querySelector(".left")
          .querySelector(".duration")
          .querySelector(".iduration").value
      );
      output[`${icn}${i}`]["right"]["name"] = escapeHTML(
        element
          .querySelector(".right")
          .querySelector(".name")
          .querySelector(".iname").value
      );
      output[`${icn}${i}`]["right"]["address"] = escapeHTML(
        element
          .querySelector(".right")
          .querySelector(".addr")
          .querySelector(".iaddress").value
      );
      output[`${icn}${i}`]["right"]["duration"] = escapeHTML(
        element
          .querySelector(".right")
          .querySelector(".duration")
          .querySelector(".iduration").value
      );

      i++;
    }
  } else if (cond == 2) {
    let i = 0;

    for (const element of liarr) {
      output[`${icn}${i}`] = {};

      output[`${icn}${i}`]["name"] = element
        .querySelector(".name")
        .querySelector(".iname").value;
      output[`${icn}${i}`]["text"] = element
        .querySelector(".text")
        .querySelector(".itext").value;

      i++;
    }
  } else if (cond == 3) {
    let i = 0;

    for (const element of liarr) {
      output[`${icn}${i}`] = {};

      output[`${icn}${i}`]["name"] = element
        .querySelector(".left")
        .querySelector(".name")
        .querySelector(".skillname").value;
      output[`${icn}${i}`]["level"] = element
        .querySelector(".left")
        .querySelector(".name")
        .querySelector(".skillscore").value;

      i++;
    }
  }

//   console.log("lirequired(output)",lirequired(output));
  return output;
}

function lirequired(params) {
    let firstValue = Object.values(params)[0];


    // console.log("firstvalue value" , Object.values(firstValue)[0])

    if(firstValue == null || firstValue == ""){
        console.log(Object.keys(params)[0] , "is null")
        return "null";
    }

    
    if(Object.values(firstValue)[0]){
        lirequired(firstValue);
    }

    return params

}

var escapeChars = {
  "¢": "cent",
  "£": "pound",
  "¥": "yen",
  "€": "euro",
  "©": "copy",
  "®": "reg",
  "<": "lt",
  ">": "gt",
  '"': "quot",
  "&": "amp",
  "'": "#39",
};

var regexString = "[";
for (var key in escapeChars) {
  regexString += key;
}
regexString += "]";

var regex = new RegExp(regexString, "g");

function escapeHTML(str) {
  return str.replace(regex, function (m) {
    return "&" + escapeChars[m] + ";";
  });
}

// alert(escapeHTML(`<div class="clear"></div>`));
