console.log('train-list page loaded');


var quotas_map = {
    "TQ": "TATKAL",
    "PT": "PREMIUM TATKAL",
    "GN": "GENERAL",
    "LD": "LADIES",
    "SS": "LOWER BERTH/Sr. CITIZEN",
    "HP": "Physically Handicap"
};

var quota_click_timer = "";
var current_state_being_processed = "";
var timer_checkForTrainListPage;
//timer_checkForTrainListPage = setInterval(checkForTrainListPage, 500);

checkForTrainListPage();


function checkForTrainListPage() {
    console.log('inside checkForTrainListPage()');

    if (window.location.href.match("/train-list")) {
        console.log('PAGE FOUND; train-list');
        clearInterval(timer_checkForTrainListPage);

        if (current_state_being_processed != "train_list") {
            // if (!is_user_logged_in()) {
            //     current_state_being_processed = "login_fill_state";
            //     // document.querySelectorAll(".h_main_div .h_head1 a")[0].click();
            //     click_login_button();
            //     // console.log("login click return");
            //     page_state_handler_timer = setTimeout(page_state_handler, 1000);
            //     return;
            // }
            //start processing this state
            current_state_being_processed = "train_list";
            //        train_list_page_handle();

            if (!is_quota_selected()) {
                console.log("quota is not selected calling select quota");
                select_quota();
                return;
            } else {
                console.log("quota already selected");
                if (quota_click_timer) {
                    clearTimeout(quota_click_timer);
                }
            }

            select_quota();
            return;
        } else {
            // console.log("current state is train-list so ignored calling state");
        }
    } else {
        console.log('PAGE NOT FOUND; train-list');
        timer_checkForTrainListPage = setInterval(checkForTrainListPage, 500);
    }
}


function select_quota() {
    if (document.querySelector(".search_div p-dropdown label")) {
        document.querySelector(".search_div p-dropdown label").click();
    } else {
        current_state_being_processed = "";
        return;
    }
    if (document.querySelector(".search_div p-dropdown .ui-dropdown-items") != null) {
        //drop down available find and click the quota
        console.log("calling click quota");
        click_quota();
    } else {
        quota_click_timer = setTimeout(wait_for_quota_drop_down_and_click_quota, 1000);
    }
}

function wait_for_quota_drop_down_and_click_quota() {
    console.log("wait for quota click");
    if (quota_click_timer) {
        clearTimeout(quota_click_timer);
    }
    if (document.querySelector(".search_div p-dropdown .ui-dropdown-items") != null) {
        //drop down available find and click the quota
        click_quota();
    } else {
        quota_click_timer = setTimeout(wait_for_quota_drop_down_and_click_quota, 1000);
    }
}

function click_quota() {
    quota_name = quotas_map[_quotaChoiceShortNm];
    var a = document.querySelectorAll(".search_div p-dropdown .ui-dropdown-items li span");
    var quota_selected = false;
    for (var i = 0; i < a.length; i++) {
        var text_content = "";
        text_content = a[i].innerText;
        if (text_content == quota_name) {
            //select the quota 
            a[i].click();
            quota_selected = true;
            break;
        }
    }
    if (quota_selected) {
        console.log("quota selected");
        current_state_being_processed = "";
    } else {
        // quota not available or selector changed handle it 
        console.log("quota not available");
    }
}

function is_quota_selected() {
    var quota = quotas_map[_quotaChoiceShortNm];
    quota_name = quotas_map[quota];
    console.log("user selected quota", quota_name);
    if (document.querySelector(".search_div p-dropdown label")) {
        var quota_selected = document.querySelector(".search_div p-dropdown label").innerText;
        console.log("current quota", quota_selected);
        return quota_name == quota_selected;
    } else {
        return false;
    }

}