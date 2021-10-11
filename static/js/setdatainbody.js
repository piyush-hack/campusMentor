function setdatainbody(doc_data) {
  document.title = doc_data["title"].toUpperCase();
  $("#content_title").html(doc_data["title"]);
  $("#subheading").html(doc_data["subheading"]);
  $("#date").html(doc_data["date"].slice(0, 10));
  $("#t_likes").html(doc_data["likes"]);
  $("#t_comments").html(doc_data["Comment"]);
  var tagarr = doc_data["tags"][0].split(",");

  for (let i = 0; i < tagarr.length; i++) {
    document.getElementById("tags").innerHTML +=
      "<span class='a_tag'>" + tagarr[i] + "</span>";
  }

  if (doc_data["price"] > 0) {
    document.getElementById("body").innerHTML = doc_data["body"].slice(
      0,
      doc_data["body"].length / 10
    );

    document.getElementById("modal-body").innerHTML = `Buy This Blog For Always At Rupess <span id="pricing">${doc_data["price"]}</span>`;


    var x = `<div style="width:70vw;min-height:70vh;filter: blur(5px);font-size:16px">
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam dignissim sagittis risus, sit amet consequat eros laoreet at. Donec a ligula ac velit varius pulvinar. Cras aliquam tellus non nisi molestie, vel scelerisque sapien vestibulum. Morbi metus ex, volutpat a blandit at, dictum ut turpis. Pellentesque turpis turpis, elementum vel quam in, dapibus scelerisque sem. Duis suscipit laoreet rhoncus. Vestibulum urna arcu, pellentesque vel sodales rhoncus, imperdiet ut sem. Aenean sit amet leo eget justo tincidunt rhoncus vitae vitae felis. Donec eu consectetur ante, nec convallis nisl. In dictum sem non lacus sodales ultrices. Aenean viverra, nulla at sagittis venenatis, est metus finibus tortor, porttitor tempus risus nisl pharetra lectus. Curabitur magna nulla, interdum sit amet mi sit amet, molestie suscipit lorem. Maecenas id lorem mauris. Donec accumsan urna sed diam rhoncus interdum. Quisque imperdiet malesuada purus, quis ultrices lacus consectetur et.

    Proin fringilla ex felis, ac fringilla odio interdum eu. Fusce at dolor a libero ultrices bibendum. Vivamus ut dictum augue, vitae condimentum augue. Ut euismod, nisi eu lobortis commodo, mauris sapien elementum lacus, ac maximus justo eros nec purus. Ut massa enim, euismod non venenatis nec, lobortis quis purus. Donec mollis, sem et iaculis tincidunt, ex est suscipit lorem, sit amet varius ligula lorem nec neque. Maecenas venenatis ex sapien, ac auctor enim rhoncus vel. Sed ut elementum felis. Donec iaculis pretium massa in rutrum. Curabitur tristique tellus condimentum est ultricies, vel faucibus urna laoreet. Quisque nec arcu eget orci varius blandit ac aliquet nunc.
    
    Vivamus sed metus eget neque pellentesque ullamcorper. Cras tempor dictum ex ut egestas. Aliquam eu odio dapibus nulla interdum pharetra id sed ipsum. Aenean in nisi vel mauris molestie mollis sit amet ac lectus. Donec mauris urna, commodo eget pharetra ac, convallis quis tellus. Cras mattis aliquam maximus. Pellentesque ac dolor nec ex volutpat tincidunt ac nec urna.
    
    Nulla odio lectus, tincidunt ac pretium sed, commodo vitae nisi. Aliquam semper felis eu quam pulvinar, vitae cursus justo interdum. Integer convallis lorem erat, et rhoncus nulla dapibus vel. Donec semper eleifend ligula et facilisis. Integer scelerisque risus quis commodo gravida. Mauris suscipit quis nisi in dignissim. Nunc faucibus condimentum lorem vel efficitur. Nullam condimentum lorem eget turpis rutrum fermentum. Cras interdum justo ut eros volutpat, nec scelerisque magna sodales. Phasellus eget quam non ante ultricies scelerisque. Phasellus leo urna, interdum nec leo a, hendrerit convallis felis. In finibus justo massa, eget euismod libero sagittis at. Vivamus maximus iaculis egestas. Nam imperdiet ipsum rhoncus nunc cursus varius. Etiam vehicula tortor nec tortor mattis commodo.
    
    Etiam et libero sodales, dictum tellus eget, iaculis turpis. Proin orci tortor, sagittis vitae massa at, bibendum suscipit lectus. Nullam finibus rhoncus lacus, nec tincidunt ligula feugiat vitae. Etiam semper odio ac nisl cursus dapibus. Morbi condimentum, libero vitae fermentum pharetra, nunc est aliquam neque, sit amet convallis eros lacus nec orci. Phasellus at metus finibus, tincidunt sapien vel, congue justo. Sed sed finibus tellus. In placerat maximus est ac elementum. Pellentesque blandit sem ex, in aliquam justo facilisis at. Donec scelerisque fermentum egestas. Nulla facilisi. Curabitur non iaculis lacus, commodo pellentesque odio. Maecenas vulputate arcu velit, vitae ultricies sem ultrices nec.
    </div>`
    document.getElementById("body").innerHTML += x + x + x;
  } else {
    document.getElementById("price-modal").innerHTML = "";

    document.getElementById("body").innerHTML = doc_data["body"];
  }

  document.getElementById("load").style.display = "none";
  document.getElementById("mainContainer").style.display = "block";
}
