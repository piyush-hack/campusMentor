

let teachername = get("tn");

getRequest(`/teachProfile/teachProf/${teachername}`, (data) =>
  console.log(profileres(data))
);

function profileres(data) {

    data = data[0]
    console.log(data)

    if(data == undefined){
        window.location.href = "/create_teach_profile"
    }

    let lastname = "";

    if(data["name"].split(" ")[1] == undefined){
        lastname = "";
    }else{
        lastname = data["name"].split(" ")[1]
    }

    seti("username", `${data["name"].split(" ")[0]} <span class="purple" id="lastname">${lastname}</span>`);
    seti("position", data["position"]);
    seti("intro" , data["intro"]);
    seti("phone" , data["phone"]);
    seti("email" , data["email"]);
    seti("addr" , data["address"]);
    seti("city" , data["city"] + " , India");
    seti("pcode" , data["postalcode"]);
    seti("quote", ` "${data["quote"]}" `);
    seti("quoteby" , data["quoteby"]);
    seti("about" , data["about"]);
    seti("belief" , data["belief"]);
    seti("methodcontent" , data["methodcontent"]);
    cli("list" , data["list"]);
    cli("teachsubjects" , data["teachsubjects"])
    cli("explist" , data["explist"])
    cli("edulist" , data["edulist"]);
    cli("prolist" , data["prolist"])
    cli("skills" , data["skills"])
    seti("fee" , data["fee"]["fees"]);
    seti("feetime" , data["fee"]["time"]);
    seti("feedesc" , data["fee"]["feedesc"])



    
}

function cli(id ,lidata){

    if(id == "list" || id == "teachsubjects"){
        let ulcontent = "";
        for (const key in lidata) {
            if (lidata[key].trim() == "" ) {
                continue;
            }
            ulcontent+= `<li>${lidata[key]}</li>`;
        }
        seti(id , ulcontent);
    }


    if(id == "explist" || id == "edulist"){
        let ulcontent = "";
        for (const key in lidata) {  
                    ulcontent+= `                    
                    <li class="section__list-item exp">
                        <div class="left">
                        <div class="name">${lidata[key]["left"]["name"]}</div>
                        <div class="addr">${lidata[key]["left"]["address"]}</div>
                        <div class="duration">${lidata[key]["left"]["duration"]}</div>
                        </div>
                        <div class="right">
                        <div class="name">${lidata[key]["right"]["name"]}</div>
                        <div class="addr">${lidata[key]["right"]["address"]}</div>
                        <div class="duration">${lidata[key]["right"]["duration"]}<div>
                        </div>
                    </li>`
        }
        seti(id , ulcontent);
    }

    if(id == "prolist"){
        let ulcontent = "";
        for (const key in lidata) {  
                    ulcontent+= `                    
                    <li class="section__list-item pro">
                       <div class="name">${lidata[key]["name"]}</div>
                       <div class="text">${lidata[key]["text"]}</div>
                     </li>`
        }
        seti(id , ulcontent);
    }

    if( id == "skills"){
        let ulcontent = "";


        for (const key in lidata) {  

            let element = ["","","","",""];
            for (let i = 0; i < lidata[key]["level"]; i++) {
               element[i] = "checked"
            }

                    ulcontent+= `                    
                    <div class="skills__item">
                            <div class="left">
                                <div class="name">
                                     ${lidata[key]["name"]}
                                </div>
                            </div>
                            <div class="right">
                                <input id="ck1" type="checkbox" ${element[0]} />
                
                                <label for="ck1"></label>
                                <input id="ck2" type="checkbox" ${element[1]} />
                
                                <label for="ck2"></label>
                                <input id="ck3" type="checkbox" ${element[2]} />
                
                                <label for="ck3"></label>
                                <input id="ck4" type="checkbox" ${element[3]} />
                                <label for="ck4"></label>
                                <input id="ck5" type="checkbox" ${element[4]} />
                                <label for="ck5"></label>
                
                            </div>
                        </div>`
        }
        seti(id , ulcontent);
    }



}

function seti(id , value){
    document.getElementById(id).innerHTML = value;
}



function get(name) {
  if (
    (name = new RegExp("[?&]" + encodeURIComponent(name) + "=([^&]*)").exec(
      location.search
    ))
  )
    return decodeURIComponent(name[1]);
}

function downloadimage() {
    //var container = document.getElementById("image-wrap"); //specific element on page
    var container = document.getElementById("main_container");; // full page 
    html2canvas(container, { allowTaint: true }).then(function (canvas) {

        var link = document.createElement("a");
        document.body.appendChild(link);
        link.download = "html_image.jpg";
        link.href = canvas.toDataURL();
        link.target = '_blank';
        link.click();
    });
}