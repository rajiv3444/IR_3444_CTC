var psngr_index = 0;
_passergerList = [
  {
    name: "SUMIT",
    age: "30",
    gender: "M"
  }
  //, { name: 'kUNDAN dEVI', age: '61', gender: 'F' }
  //,{name: 'daksha', age: '44', gender:'F'}
  //,{name: 'Himani', age: '21', gender:'F'}
];

p = _passergerList[psngr_index];
console.log(p.name);
console.log(p.age);
console.log(p.gender);

var pass_details_div_all = document.querySelectorAll("app-passenger");
var passenger_detail_div = document.querySelectorAll("app-passenger")[
  psngr_index
];

// name
passenger_detail_div
  .querySelector("div.form-group:nth-of-type(1) input")
  .dispatchEvent(new Event("blur"));
//$(passenger_detail_div).find("div.form-group:nth-of-type(1) input").prop("value","FIRST KUMAR";
document.querySelectorAll("[formcontrolname=passengerName]")[0].value = p.name;
passenger_detail_div
  .querySelector("div.form-group:nth-of-type(1) input")
  .dispatchEvent(new Event("input"));

// age
passenger_detail_div
  .querySelector("div.form-group:nth-of-type(2) input")
  .dispatchEvent(new Event("blur"));
//$(passenger_detail_div).find("div.form-group:nth-of-type(2) input").prop("value",pass_deets.pass_age);
document.querySelectorAll("[formcontrolname=passengerAge]")[0].value = p.age;
passenger_detail_div
  .querySelector("div.form-group:nth-of-type(2) input")
  .dispatchEvent(new Event("input"));

// gender
passenger_detail_div
  .querySelector("div.form-group:nth-of-type(3) select")
  .dispatchEvent(new Event("blur"));
passenger_detail_div.querySelector(
  "div.form-group:nth-of-type(3) select"
).value = p.gender;
passenger_detail_div
  .querySelector("div.form-group:nth-of-type(3) select")
  .dispatchEvent(new Event("change"));

// focus captha
foucs_pass_page_captcha();

// click button to proceed

function guidGenerator() {
  var S4 = function() {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  };
  return (
    S4() +
    S4() +
    "-" +
    S4() +
    "-" +
    S4() +
    "-" +
    S4() +
    "-" +
    S4() +
    S4() +
    S4()
  );
}

function foucs_pass_page_captcha() {
  var captcha_timer_id = guidGenerator();
  var captcha_seconds = 0;

  if (document.querySelector(".passengerDivSep  #captcha")) {
    $(
      '<div id="' +
        captcha_timer_id +
        '" style="background-color: #000; width: 36px; color: white; font-size: 20px;">00</div><div style="background-color: #000; width: 100%; color: white; font-size: 20px;">Type captcha and click Next after 10 seconds</div><br>'
    ).insertBefore($("#captcha").parent());
  } else if (document.querySelector("#ShowNLPCaptcha")) {
    $(
      '<div id="' +
        captcha_timer_id +
        '" style="background-color: #000; width: 36px; color: white; font-size: 20px;">00</div><div style="background-color: #000; width: 100%; color: white; font-size: 20px;">Type captcha and click Next after 10 seconds</div><br>'
    ).insertBefore($("#ShowNLPCaptcha").parent());
  }

  captcha_timer = setInterval(function() {
    if (!window.location.href.match("/psgninput")) {
      captcha_seconds = 0;
      clearInterval(captcha_timer);
    }
    captcha_seconds = captcha_seconds + 1;
    $("#" + captcha_timer_id).text(captcha_seconds);
  }, 1000);

  if (document.querySelector(".passengerDivSep  #captcha")) {
    console.log("focused on normal captcha");
    document.querySelector(".passengerDivSep  #captcha").focus();
  } else if (document.querySelector("#nlpAnswer")) {
    console.log("focused on nlp nlpAnswer");
    var pos_to_scroll = $("#" + captcha_timer_id).offset().top;
    console.log("scroll to pos", pos_to_scroll);
    window.scrollTo(0, pos_to_scroll - 200);
    document.querySelector("#nlpAnswer").focus();
  } else if (document.querySelector("#ShowNLPCaptcha")) {
    console.log("captcha not found");
    var pos_to_scroll = $("#ShowNLPCaptcha").offset().top;
    window.scrollTo(0, pos_to_scroll);
  } else {
    console.log("no captcha found");
  }

  //check_security_question();
}
