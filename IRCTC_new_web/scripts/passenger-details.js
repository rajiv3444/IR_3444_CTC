console.log("File executing: F:IRCTC_AutoFill_New_websitepassenger-details.js");

developerMode = true;
var _quotaChoiceShortNm = "TQ";
_needAutoupgrade = true;
_bookOnlyIfConfirmBerthAvailable = false;
_mobileNumber = "8000940940";
_food_choice_Veg = "V";
_food_choice_NonVeg = "N";
_need_bedroll = false;
_passergerList = [
  {
    name: "sumit",
    age: "30",
    gender: "M"
  }
];

/************************************************* */

var quota_mappingList = {
  TQ: "TATKAL",
  PT: "PREMIUM TATKAL",
  GN: "GENERAL",
  LD: "LADIES",
  SS: "LOWER BERTH/Sr. CITIZEN",
  HP: "Physically Handicap"
};

function AutoFillPassengerDetail() {
  console.log("Inside AutoFillPassengerDetail()");
  //debugger;
  _IS_PASSENGER_PAGE_DONE = true;
  // if (!window.location.href.match("/psgninput")) {
  //     console.log("THIS IS NOT PASSENGER PAGE (/psgninput)... RETURN");
  //     return;
  // }

  // console.log("PASSENGER PAGE FOUND /psgninput...");
  console.log("FILLING PASSENGER DETAIL...");

  var pass_details_div_all = document.querySelectorAll("app-passenger");

  for (i = 0; i < _passergerList.length; i++) {
    p = _passergerList[i];
    consoleLog("Name=" + p.name + ", age=" + p.age + ", Gender=" + p.gender);

    //CHECK IF TEXTBOXES ARE GENERATED/AVAILABLE FOR ENTERING PASS DETAILS
    if (!pass_details_div_all[i]) {
      console.log(
        "textbox for passenger-" +
          i +
          "-" +
          p.name +
          " is not generated. Clicking on ADD PASSENGER"
      );
      //click add passenger
      var add_pass_links = document.querySelectorAll("a span.prenext");
      var add_pass = add_pass_links[0];
      add_pass.click();
      //pass_fill_detail_timer = setTimeout(fill_detail, 200);
      //return;
    }

    var current_passenger_div = document.querySelectorAll("app-passenger")[i];

    // name
    current_passenger_div
      .querySelector("div.form-group:nth-of-type(1) input")
      .dispatchEvent(new Event("blur"));
    document.querySelectorAll("[formcontrolname=passengerName]")[i].value =
      p.name;
    current_passenger_div
      .querySelector("div.form-group:nth-of-type(1) input")
      .dispatchEvent(new Event("input"));

    // age
    current_passenger_div
      .querySelector("div.form-group:nth-of-type(2) input")
      .dispatchEvent(new Event("blur"));
    document.querySelectorAll("[formcontrolname=passengerAge]")[i].value =
      p.age;
    current_passenger_div
      .querySelector("div.form-group:nth-of-type(2) input")
      .dispatchEvent(new Event("input"));

    // gender
    current_passenger_div
      .querySelector("div.form-group:nth-of-type(3) select")
      .dispatchEvent(new Event("blur"));
    current_passenger_div.querySelector(
      "div.form-group:nth-of-type(3) select"
    ).value = p.gender;
    current_passenger_div
      .querySelector("div.form-group:nth-of-type(3) select")
      .dispatchEvent(new Event("change"));

    // IF AGE FALLS IN SENIOR CITIZON AGE
    // SELECT CONCESESSION TYPE ----- MENDATORY
    // TODO

    if (
      current_passenger_div.querySelector("#srctzn-option") &&
      !current_passenger_div.querySelector("#srctzn-option").disabled
    ) {
      console.log("senior concession detail");
      current_passenger_div
        .querySelector("#srctzn-option")
        .dispatchEvent(new Event("blur"));
      current_passenger_div.querySelector("#srctzn-option").value = 1;
      current_passenger_div
        .querySelector("#srctzn-option")
        .dispatchEvent(new Event("change"));
    }

    //FOOD CHOICE FOR SPECIAL TRAINS --- MENDATORY FIELD
    if (document.querySelectorAll("[formcontrolname=passengerFoodChoice]")[0]) {
      if (
        document.querySelectorAll("[formcontrolname=passengerFoodChoice]")[i]
          .length > 0
      ) {
        // var food_choice = ""
        // if (pass_deets.pass_food == "Veg") {
        //     food_choice = "V";
        // } else if (pass_deets.pass_food == "Non_Veg") {
        //     food_choice = "N";
        // } else if (pass_deets.pass_food == "No_Food") {
        //     food_choice = "D";
        // }

        current_passenger_div
          .querySelector('[formcontrolname="passengerFoodChoice"]')
          .dispatchEvent(new Event("blur"));
        current_passenger_div.querySelector(
          '[formcontrolname="passengerFoodChoice"]'
        ).value = _food_choice_Veg;
        current_passenger_div
          .querySelector('[formcontrolname="passengerFoodChoice"]')
          .dispatchEvent(new Event("change"));
      }
    }

    //bedroll CHOICE FOR SPECIAL TRAINS --- MENDATORY FIELD
    // if ($(current_passenger_div).find('[formcontrolname="passengerBedrollChoice"]').length > 0 && _need_bedroll) {
    //     current_passenger_div.querySelector('[formcontrolname="passengerBedrollChoice"]').click();
    // }
  }

  //fillOtherDetailsPassengerPage();
  var timer_fillOtherDetailsPassengerPage = setTimeout(
    fillOtherDetailsPassengerPage,
    100
  );
  var timer_foucs_pass_page_captcha = setTimeout(foucs_pass_page_captcha, 500);
  //foucs_pass_page_captcha();
  ////document.getElementById('addPassengerForm:mobileNo').value = _mobileNumber;
  //document.querySelectorAll('[type=submit]')[1].click();
}

function fillOtherDetailsPassengerPage() {
  // travel insurance option -- mendatory field
  if (document.getElementById("travelInsuranceOptedYes")) {
    document.getElementById("travelInsuranceOptedYes").click();
  }

  var bookincond_map = {
    3: "None",
    6: "Book, only if all berths are allotted in same coach",
    4: "Book, only if at least 1 lower berth is allotted",
    5: "Book, only if 2 lower berths are allotted"
  };

  // select checkbox for auto upgrade
  if (
    document.querySelectorAll("#autoUpgradation").length > 0 &&
    document.querySelectorAll("#autoUpgradation")[0].checked
  ) {
    if (!_needAutoupgrade) {
      document.querySelectorAll("#autoUpgradation+label")[0].click();
    }
  } else {
    if (
      document.querySelectorAll("#autoUpgradation+label").length > 0 &&
      _needAutoupgrade
    ) {
      document.querySelectorAll("#autoUpgradation+label")[0].click();
    }
  }

  /*
      // select checkbox to book only if getting confirm birth
      if (document.querySelectorAll("#confirmberths").length > 0 && document.querySelectorAll("#confirmberths")[0].checked) {
          if (!_bookOnlyIfConfirmBerthAvailable) {
              document.querySelectorAll("#confirmberths+label")[0].click();
          }
      } else {
          if (document.querySelectorAll("#confirmberths+label").length > 0 && _bookOnlyIfConfirmBerthAvailable) {
              document.querySelectorAll("#confirmberths+label")[0].click();
          }
      }
      */
}

var captcha_timer_id = guidGenerator();

var captcha_seconds = 0;
var captcha_timer = "";

// focus the capthcha of passenger page
function foucs_pass_page_captcha() {
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
    //document.getElementById().text
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

// REVIEW BOOKING  PAGE
function booking_review_page_handle() {
  console.log("inside booking_review_page_handle()");
  _IS_REVIEW_BOOKING_PAGE_DONE = true;

  // if (!$("app-availability-summary span:icontains(Availability Status)").length > 0) {
  //     //current_state_being_processed = "";
  //     return;
  // } else {
  //     if (!$("app-availability-summary span:icontains(Availability Status)~span:icontains(available)").length) {
  //         //$.prompt("Tickets not available! First click 'OK' below. Then click on 'Continue Booking' to continue with booking");
  //         console.log('--------- CONFIRM TICKET NOT AVAILABLE ----------');
  //         return;
  //     }
  // }

  // if ( $(".passenger_details button[type='submit']:contains(Continue Booking)").length > 0) {
  //     $(".passenger_details button[type='submit']:contains(Continue Booking)")[0].click();
  // } else {
  //     //current_state_being_processed = "";
  // }

  if (document.querySelector(".passenger_details button[type='submit']")) {
    if (
      document.querySelector(".passenger_details button[type='submit']")
        .textContent == "Continue Booking"
    ) {
      document
        .querySelector(".passenger_details button[type='submit']")
        .click();
    }
  }
}

function selectPaymentModeCreditDebitHdfc() {
  /** temppppppppppppp */
  // return;
  //document.getElementById('ui-tabpanel-9-label').click();

  Array.from(document.querySelectorAll("[role=tab]"))
    .find(el => el.textContent === "Payment Gateway / Credit Card / Debit Card")
    .click();

  // var tabList = document.querySelectorAll('[role=tab]');
  // for(var tab in tabList)
  // {
  //     if (tab.textContent == 'Payment Gateway / Credit Card / Debit Card')
  //     {
  //         tab.click();
  //     }
  // }

  document.getElementById("credit_115").click();

  Array.from(document.querySelectorAll("button"))
    .find(el => el.textContent === "Make Payment")
    .click();

  _IS_PAYMENT_OPTION_PAGE_DONE = true;
}

// Razor pay peyment mode
function selectPaymentModeRazorPay() {
  Array.from(document.querySelectorAll("[role=tab]"))
    .find(el => el.textContent === "Multiple Payment Service")
    .click();

  // var tabList = document.querySelectorAll('[role=tab]');
  // for(var tab in tabList)
  // {
  //     if (tab.textContent == 'Payment Gateway / Credit Card / Debit Card')
  //     {
  //         tab.click();
  //     }
  // }

  document.getElementById("credit_105").click();

  Array.from(document.querySelectorAll("button"))
    .find(el => el.textContent === "Make Payment")
    .click();

  _IS_PAYMENT_OPTION_PAGE_DONE = true;
}

function consoleLog(content) {
  if (developerMode) {
    //console.debug(new Date() + ": " + content);
    console.debug(content);
  }
}

function SelectQuota() {
  if (!isPreferredQuota_selected()) {
    //if not
    //select quota from dropdown
    if (document.querySelector(".search_div p-dropdown label")) {
      document.querySelector(".search_div p-dropdown label").click();
    }

    if (
      document.querySelector(".search_div p-dropdown .ui-dropdown-items") !=
      null
    ) {
      var preferred_quota_name = quota_mappingList[_quotaChoiceShortNm];
      var dopdown_quota_itemArray = document.querySelectorAll(
        ".search_div p-dropdown .ui-dropdown-items li span"
      );
      if (dopdown_quota_itemArray && dopdown_quota_itemArray.length > 0) {
        for (var i = 0; i < dopdown_quota_itemArray.length; i++) {
          //var quota_li_text_content = "";
          //quota_li_text_content = quotaListArray[i].innerText;
          if (dopdown_quota_itemArray[i].innerText == preferred_quota_name) {
            //select the quota
            dopdown_quota_itemArray[i].click();
            _IS_QUOTA_DROPDOWN_SELECTION_DONE = true;
            break;
          }
        }
      }
    }
  } else {
    _IS_QUOTA_DROPDOWN_SELECTION_DONE = true;
  }
}

function isPreferredQuota_selected() {
  var preferred_quota_name = quota_mappingList[_quotaChoiceShortNm];
  //quota_name = quota_mappingList[quota];
  console.log("user quota choice: ", preferred_quota_name);
  if (document.querySelector(".search_div p-dropdown label")) {
    var dropdown_selected_quota_name = document.querySelector(
      ".search_div p-dropdown label"
    ).innerText;
    console.log("current seleced quota", dropdown_selected_quota_name);
    return preferred_quota_name == dropdown_selected_quota_name;
  } else {
    return false;
  }
}

//resetAllFlags();
//clearAllTimers();
