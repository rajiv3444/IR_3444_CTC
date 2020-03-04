console.log("loaded..CS_newPage...file");
var ttt;
ttt = setInterval(new_ng_site_automation, 1000);
//new_ng_site_automation();

var quotas_map = {
	"TQ": "TATKAL",
	"PT": "PREMIUM TATKAL",
	"GN": "GENERAL",
	"LD": "LADIES",
	"SS": "LOWER BERTH/Sr. CITIZEN",
	"HP": "Physically Handicap"
};

function new_ng_site_automation() {
	console.log("method: new_ng_site_automation()");

	var ticketDetails = new Array();

	var passenger_details = new Array();

	var child_details = [];
	/*
		chrome.storage.sync.get('bookticket', function (data) {
			if (data['bookticket'] > 0) {
				var counter = data['bookticket'];
				var keys = ["tkt_" + counter];
				chrome.storage.sync.get(keys, function (stored_data) {
					ticketDetails = JSON.parse(stored_data["tkt_" + counter]);
					for (var i = 1; i <= 6; i++) {
						if ("pass" + i in ticketDetails) {
							passenger_details.push(ticketDetails["pass" + i]);
						}
					}

					if ("child1" in ticketDetails) {
						if (ticketDetails["child1"].child1_name && ticketDetails["child1"].child1_gender != " " && ticketDetails["child1"].child1_age > -1) {
							var child_deets = {};
							child_deets.child_name = ticketDetails["child1"].child1_name;
							child_deets.child_gender = ticketDetails["child1"].child1_gender;
							child_deets.child_age = ticketDetails["child1"].child1_age;
							child_details.push(child_deets);
						}
					}

					if ("child2" in ticketDetails) {
						if (ticketDetails["child2"].child2_name && ticketDetails["child2"].child2_gender != " " && ticketDetails["child2"].child2_age > -1) {
							var child_deets = {};
							child_deets.child_name = ticketDetails["child2"].child2_name;
							child_deets.child_gender = ticketDetails["child2"].child2_gender;
							child_deets.child_age = ticketDetails["child2"].child2_age;
							child_details.push(child_deets);
						}
					}

				});
			}
		});
	*/
	function close_twoyears_overlay() {
		if (document.querySelector(".twoyears-overlay-bg") != null && document.querySelector(".twoyears-overlay-bg").style.display == "block") {
			document.querySelector(".twoyears-close-btn") && document.querySelector(".twoyears-close-btn").click()
		}
	}

	function is_user_logged_in() {
		// $(".menu-list.header-icon-menu:eq(8) a:eq(0)").length>0 && $.trim($(".menu-list.header-icon-menu:eq(8) a:eq(0)").text()) == "MY ACCOUNT"
		// return document.querySelectorAll(".h_main_div .h_head1 a")[0] && $.trim(document.querySelectorAll(".h_main_div .h_head1 a")[0].textContent) != "LOGIN";
		return document.querySelectorAll(".h_main_div .h_head1 a")[0] && $.trim(document.querySelectorAll(".h_main_div .h_head1 a")[0].textContent.toUpperCase()) == "LOGOUT";
	}

	function is_login_dialog_open() {
		return $("p-dialog#login_header_disable>div").css("display") == "block";
	}

	function fill_login_details() {
		if (ticketDetails['user_login']) {
			if (document.querySelector("app-login input#userId")) {
				document.querySelector("app-login input#userId").value = ticketDetails['user_login'];
				document.querySelector("app-login input#userId").dispatchEvent(new Event("input"));

			}

			var user_pass = ticketDetails["user_pass"];
			var isEncrypted = ticketDetails["data_encrypted"];
			if (isEncrypted) {
				user_pass = CryptoJS.AES.decrypt(user_pass, "TatkalNowPass").toString(CryptoJS.enc.Utf8);
				if (document.querySelector("app-login input#pwd")) {
					document.querySelector("app-login input#pwd").value = user_pass;
					document.querySelector("app-login input#pwd").dispatchEvent(new Event("input"));
				}

				if (document.querySelector("app-login input#captcha")) {
					document.querySelector("app-login input#captcha").focus();
				} else if (document.querySelector("#nlpAnswer")) {
					document.querySelector("#nlpAnswer").focus();
				} else {
					console.log("captcha not found");
				}

			}
			console.log("login details filled");
		} else {
			console.log("details not found");
		}

	}

	function train_search_page_handle() {
		console.log("in train search page handle");
		if (document.querySelector("app-jp-input #origin input")) {
			document.querySelector("app-jp-input #origin input").dispatchEvent(new Event("focus"), {
				bubbles: true
			});
			document.querySelector("app-jp-input #origin input").dispatchEvent(new Event("keydown"), {
				bubbles: true
			});
			document.querySelector("app-jp-input #origin input").dispatchEvent(new Event("keyup"), {
				bubbles: true
			});
			var e = ticketDetails['boarding_station'];
			$("app-jp-input #origin input").prop("value", e);
			document.querySelector("app-jp-input #origin input").dispatchEvent(new Event("blur"), {
				bubbles: true
			});
			document.querySelector("app-jp-input #origin input").dispatchEvent(new Event("input"), {
				bubbles: true
			});
		}

		if (document.querySelector("app-jp-input #destination input")) {
			document.querySelector("app-jp-input #destination input").dispatchEvent(new Event("focus"), {
				bubbles: true
			});
			document.querySelector("app-jp-input #destination input").dispatchEvent(new Event("keydown"), {
				bubbles: true
			});
			document.querySelector("app-jp-input #destination input").dispatchEvent(new Event("keyup"), {
				bubbles: true
			});
			var d = ticketDetails['dest_station'];
			$("app-jp-input #destination input").prop("value", d);
			document.querySelector("app-jp-input #destination input").dispatchEvent(new Event("blur"), {
				bubbles: true
			});
			document.querySelector("app-jp-input #destination input").dispatchEvent(new Event("input"), {
				bubbles: true
			});
		}

		var dd = ticketDetails['travel_date'].split("/");
		dd[0] = ('0' + dd[0]).slice(-2);
		dd[1] = ('0' + dd[1]).slice(-2);
		var m_names = new Array("January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December");

		var date = parseInt(dd[0]);
		var month = m_names[parseInt(dd[1]) - 1];
		var year = dd[2];
		select_date_in_calendar(date, month, year);

		// current_state_being_processed = "";
	}

	function select_date_in_calendar(udate, month, year) {
		console.log(udate, month, year)
		var m_names = new Array("January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December");

		function find_and_select_date() {
			console.log("in find and selec date")
			if (date_select_timer) {
				clearTimeout(date_select_timer);
			}

			var month_idx = m_names.indexOf(month);

			var curr_month = document.querySelector("p-calendar .ui-datepicker-title .ui-datepicker-month").innerText;
			curr_month = $.trim(curr_month);

			curr_month_idx = m_names.indexOf(curr_month);

			var curr_year = document.querySelector("p-calendar .ui-datepicker-title .ui-datepicker-year").innerText;
			curr_year = $.trim(curr_year);

			console.log(month_idx);
			console.log(curr_month);
			console.log(curr_year);
			console.log(curr_month_idx)

			if (curr_year == year) {
				// select correct month
				console.log("year matches");
				if (curr_month_idx == month_idx) {
					// find and click date
					console.log("month matches");
					var date_elems = $("p-calendar .ui-datepicker-calendar td:contains('" + udate + "')");

					for (var i = 0; i < date_elems.length; i++) {
						var curr_date_elem = date_elems[i];
						if (curr_date_elem.innerText == udate) {
							console.log("found mathcing dates");
							if ($(curr_date_elem).hasClass("ui-state-disabled")) {
								continue;
							} else {
								//clicking date here
								//do form click here or other follow up logic
								console.log("clicking date")
								curr_date_elem.querySelector("a").click();

								//clicking form submit
								document.querySelector("app-jp-input .search_btn").click();

								break;
							}

						}
					}

				} else if (curr_month_idx < month_idx) {
					document.querySelector("p-calendar .ui-datepicker-next").click();
					date_select_timer = setTimeout(find_and_select_date, 300);
				} else if (curr_month_idx > month_idx) {
					document.querySelector("p-calendar .ui-datepicker-prev").click();
					date_select_timer = setTimeout(find_and_select_date, 300);
				}

			} else if (parseInt(curr_year) < parseInt(year)) {
				//click right
				document.querySelector("p-calendar .ui-datepicker-next").click();
				date_select_timer = setTimeout(find_and_select_date, 300);

			} else if (parseInt(curr_year) > parseInt(year)) {
				//click left
				document.querySelector("p-calendar .ui-datepicker-prev").click();
				date_select_timer = setTimeout(find_and_select_date, 300);
			}
		}

		if (document.querySelector("app-jp-input p-calendar input")) {
			document.querySelector("app-jp-input p-calendar input").dispatchEvent(new Event("focus"), {
				bubbles: true
			});
			document.querySelector("app-jp-input p-calendar input").dispatchEvent(new Event("keydown"), {
				bubbles: true
			});
			document.querySelector("app-jp-input p-calendar input").dispatchEvent(new Event("keyup"), {
				bubbles: true
			});
			find_and_select_date();
		}

	}

	var quota_click_timer = "";
	var num_pass_click_timer = "";
	var book_now_click_timer = "";
	var date_select_timer = "";

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
		var quota = ticketDetails["book_quota"];
		if (quota == "CK") {
			quota = "TQ";
		}
		quota_name = quotas_map[quota];
		var a = document.querySelectorAll(".search_div p-dropdown .ui-dropdown-items li span");
		var quota_selected = false;
		for (var i = 0; i < a.length; i++) {
			var text_content = "";
			text_content = a[i].innerText;
			console.log(text_content);
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
		var quota = ticketDetails["book_quota"];
		if (quota == "CK") {
			quota = "TQ";
		}
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

	function is_num_passenger_selected() {
		var num_passenger_selected = document.querySelector("#numberOfPassengers label").innerText;
		return num_passenger_selected == passenger_details.length;
	}

	function select_num_passengers() {
		document.querySelector("#numberOfPassengers label").click();
		if (document.querySelectorAll("#numberOfPassengers .ui-dropdown-items li") != null) {
			console.log("calling CLICK num pass");
			click_num_pass();
		} else {
			num_pass_click_timer = setTimeout(wait_for_numpass_drop_down_and_click_numpass, 1000);
		}
	}

	function wait_for_numpass_drop_down_and_click_numpass() {
		console.log("wait for numpass click");
		if (num_pass_click_timer) {
			clearTimeout(num_pass_click_timer);
		}
		if (document.querySelector("#numberOfPassengers .ui-dropdown-items li") != null) {
			//drop down available find and click the quota
			click_num_pass();
		} else {
			num_pass_click_timer = setTimeout(wait_for_numpass_drop_down_and_click_numpass, 1000);
		}
	}

	function click_num_pass() {
		var a = document.querySelectorAll("#numberOfPassengers .ui-dropdown-items li");
		var num_pass_selected = false;
		for (var i = 0; i < a.length; i++) {
			if (a[i].innerText == passenger_details.length) {
				a[i].click();
				num_pass_selected = true;
				break;
			}
		}
		if (num_pass_selected) {
			console.log("num_pass selected");
			current_state_being_processed = "";
		} else {
			console.log("num_pass not available");
		}
	}

	function find_and_book_train() {
		var train_name_divs = document.querySelectorAll("app-train-avl-enq .train_avl_enq_box>div>div:nth-of-type(1)");
		var train_number = $.trim(ticketDetails["train_number"].split(":")[0]);
		var berth_class = ticketDetails['berth_class'];
		var req_train_index = "";
		var train_index_avail = false;

		for (var i = 0; i < train_name_divs.length; i++) {
			console.log(i);
			var current_train_name_el = document.querySelectorAll("app-train-avl-enq .train_avl_enq_box>div>div:nth-of-type(1)>div:nth-of-type(1) div")[i];
			console.log(current_train_name_el);
			var current_train_number_text = current_train_name_el.innerText;
			var current_train_number = "";
			console.log(current_train_number_text);
			if (current_train_number_text) {
				current_train_number_text = $.trim(current_train_number_text);
				if (current_train_number_text.match(/\(\d+\)/g).length > 0) {
					current_train_number = current_train_number_text.match(/\(\d+\)/g)[0].replace(/[\s\(\)]/g, "");
				} else {
					console.log("could not find current train number");
				}
			}
			if (current_train_number == train_number) {
				console.log("breaking found train index");
				req_train_index = i;
				train_index_avail = true;
				break;
			}
		}

		if (!train_index_avail) {
			//page is not loaded fully
			if (!train_index_avail) {
				// current_state_being_processed = "";
				console.log("something is not good, train not found rechecking");
				$.prompt('The selected train is not available on the selected date. Please check if the data entered is correct.');
				return;

			} else {
				console.log(req_train_index, "train index seems like 0");
			}
		}

		console.log(req_train_index);

		console.log(!req_train_index);

		var berth_selector = document.querySelectorAll("app-train-avl-enq .train_avl_enq_box>div>div:nth-of-type(3)>div:nth-of-type(1) select")[req_train_index];
		var all_berth_options = berth_selector.querySelectorAll("option");
		var berth_not_found = true;
		console.log("logging berth option");
		console.log(all_berth_options);
		for (var j = 0; j < all_berth_options.length; j++) {
			console.log("in berth options selector")
			console.log(all_berth_options[j], berth_class);
			if (all_berth_options[j].value.match(berth_class)) {
				//select this berth
				console.log("matching bert found");
				berth_not_found = false;
				berth_selector.value = all_berth_options[j].value;
				berth_selector.dispatchEvent(new Event("change"));
				break;
			}
		}

		if (berth_not_found) {
			$.prompt('The selected berth \'' + berth_class + '\' is not available in the chosen train. Please check if the data entered is correct.');
			return;
		}

		var check_availability_button = document.querySelectorAll("app-train-avl-enq")[req_train_index].querySelector("button#check-availability");
		if (check_availability_button != null) {
			console.log("availablity button clicked");
			check_availability_button.click();
		} else {
			// button got clicked early div is open
			if (document.querySelectorAll("app-train-avl-enq")[req_train_index].querySelector("a#check-availability")) {
				//seems like already got clicked;
				console.log("availablity button already got clicked not clicking now");
			} else {
				//button is not there or page is not loaded fully
				current_state_being_processed = "";
				return;
			}
		}

		find_and_click_book_now(req_train_index);
	}

	function find_and_click_book_now(req_train_elem_index) {

		var dd = ticketDetails['travel_date'].split("/");
		dd[0] = ('0' + dd[0]).slice(-2);
		dd[1] = ('0' + dd[1]).slice(-2);
		var m_names = new Array("Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec");
		var book_date_in_page_format = dd[0] + " " + m_names[parseInt(dd[1]) - 1] + " " + dd[2];

		function click_book_now() {

			if (!window.location.href.match("/train-list")) {
				clearTimeout(book_now_click_timer);
				return;
			}

			if (book_now_click_timer) {
				clearTimeout(book_now_click_timer);
			}
			var train_info_elem = document.querySelectorAll("app-train-avl-enq")[req_train_elem_index];
			var book_now_elements = train_info_elem.querySelectorAll("p-panel td");
			var book_button_index = "";
			var click_book_now_button = false;
			if (book_now_elements.length > 0) {
				//check and click here
				for (var i = 0; i < book_now_elements.length; i++) {
					var current_el = book_now_elements[i];
					var date_ele = current_el.querySelector("div>div:nth-of-type(1) span");
					var current_el_date = $.trim(date_ele.innerText);
					if (current_el_date == book_date_in_page_format) {
						//check book now button
						console.log("found matching dates");
						var book_now_button_elem = current_el.querySelector("div>div:nth-of-type(3)");
						if (book_now_button_elem.style.visibility == "visible") {
							book_button_index = i;
							click_book_now_button = true;
						}
						console.log("found visible button")
						break;
					} else {
						console.log("dates does not match");
						console.log(current_el_date);
						console.log(book_date_in_page_format);
					}
				}

				if (click_book_now_button) {
					console.log("clicked book now");
					book_now_elements[book_button_index].querySelector("div>div:nth-of-type(3) button").click();
					chrome.storage.sync.set({
						"last_automation_time": new Date().getTime()
					});
				} else {
					console.log("not clicked book now");
					check_and_click_refresh_button(req_train_elem_index);
					book_now_click_timer = setTimeout(click_book_now, 1000);
				}

			} else {
				check_and_click_refresh_button(req_train_elem_index);
				book_now_click_timer = setTimeout(click_book_now, 1000);
			}

		}

		function check_and_click_refresh_button(train_index) {
			console.log("refresh button clicked");
			var page_time = $(".h_head1 span:eq(0)").text();
			var hours = page_time.split("[")[1].split(":")[0];
			var mins = page_time.split("[")[1].split(":")[1];
			var click_refresh = false;
			if (hours == "10" || hours == "11") {
				if (mins == "00" || mins == "0") {
					click_refresh = true;
				}
			}
			if (click_refresh) {
				if ($(".my-loading").length > 0) {
					// seems like page is loading or already refreshed
				} else {
					// hit refresh here
					var train_elem = document.querySelectorAll("app-train-avl-enq")[train_index]
					if (train_elem) {
						if (train_elem.querySelector("a#check-availability")) {
							train_elem.querySelector("a#check-availability").click();
						}
					}
				}
			}

		}
		click_book_now();
	}

	function train_list_page_handle() {
		//select quota here
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

		// if (!is_num_passenger_selected()) {
		// 	console.log("num_pass is not selected calling select num_pass");
		// 	select_num_passengers();
		// 	return;
		// } else {
		// 	console.log("num_pass already selected");
		// 	if (num_pass_click_timer) {
		// 		clearTimeout(num_pass_click_timer);
		// 	}
		// }

		find_and_book_train();

		//check availablity

		//click book now

	}

	var pass_fill_detail_timer = "";

	function fill_passenger_details() {
		var passenger_idx_to_fill = 0;

		function fill_detail() {
			console.log("New....fill_detail()");
			if (pass_fill_detail_timer) {
				clearTimeout(pass_fill_detail_timer);
			}

			var pass_details_div_all = document.querySelectorAll("app-passenger");
			if (pass_details_div_all[passenger_idx_to_fill]) {
				// fill it here
				var pass_deets = passenger_details[passenger_idx_to_fill];
				var passenger_detail_div = document.querySelectorAll("app-passenger")[passenger_idx_to_fill];

				passenger_detail_div.querySelector("div.form-group:nth-of-type(1) input").dispatchEvent(new Event("blur"));
				$(passenger_detail_div).find("div.form-group:nth-of-type(1) input").prop("value", pass_deets.pass_name);
				passenger_detail_div.querySelector("div.form-group:nth-of-type(1) input").dispatchEvent(new Event("input"));

				passenger_detail_div.querySelector("div.form-group:nth-of-type(2) input").dispatchEvent(new Event("blur"));
				$(passenger_detail_div).find("div.form-group:nth-of-type(2) input").prop("value", pass_deets.pass_age);
				passenger_detail_div.querySelector("div.form-group:nth-of-type(2) input").dispatchEvent(new Event("input"));

				passenger_detail_div.querySelector("div.form-group:nth-of-type(3) select").dispatchEvent(new Event("blur"));
				passenger_detail_div.querySelector("div.form-group:nth-of-type(3) select").value = pass_deets.pass_gender
				passenger_detail_div.querySelector("div.form-group:nth-of-type(3) select").dispatchEvent(new Event("change"));

				if (pass_deets.pass_berth == " " || pass_deets.pass_berth == "  ") {
					pass_deets.pass_berth = "";
				}
				if (pass_deets.pass_berth != "") {
					passenger_detail_div.querySelector("div.form-group:nth-of-type(4) select").dispatchEvent(new Event("blur"));
					passenger_detail_div.querySelector("div.form-group:nth-of-type(4) select").value = pass_deets.pass_berth
					passenger_detail_div.querySelector("div.form-group:nth-of-type(4) select").dispatchEvent(new Event("change"));
				}

				if ($(passenger_detail_div).find('[formcontrolname="passengerFoodChoice"]').length > 0) {
					var food_choice = ""
					if (pass_deets.pass_food == "Veg") {
						food_choice = "V";
					} else if (pass_deets.pass_food == "Non_Veg") {
						food_choice = "N";
					} else if (pass_deets.pass_food == "No_Food") {
						food_choice = "D";
					}

					passenger_detail_div.querySelector('[formcontrolname="passengerFoodChoice"]').dispatchEvent(new Event("blur"));
					passenger_detail_div.querySelector('[formcontrolname="passengerFoodChoice"]').value = food_choice;
					passenger_detail_div.querySelector('[formcontrolname="passengerFoodChoice"]').dispatchEvent(new Event("change"));
				}

				if ($(passenger_detail_div).find('[formcontrolname="passengerBedrollChoice"]').length > 0 && pass_deets.pass_bedroll == "on") {
					passenger_detail_div.querySelector('[formcontrolname="passengerBedrollChoice"]').click();
				}

				if (passenger_detail_div.querySelector("#srctzn-option") && !passenger_detail_div.querySelector("#srctzn-option").disabled) {
					console.log("filled senior concession detail");
					passenger_detail_div.querySelector('#srctzn-option').dispatchEvent(new Event("blur"));
					passenger_detail_div.querySelector('#srctzn-option').value = parseInt(pass_deets.pass_senior);
					passenger_detail_div.querySelector('#srctzn-option').dispatchEvent(new Event("change"));
				} else {
					console.log("did not fill senior concession detail")

				}

				if (pass_deets.pass_opt_berth == "off") {
					if (passenger_detail_div.querySelector("[formcontrolname='childBerthFlag']")) {
						// check box is there fill it
						passenger_detail_div.querySelector("[formcontrolname='childBerthFlag']").click();
						if ($(".ui-dialog:contains('No berth will be allotted for child and half of the adult fare will be charged') button").length >= 1) {
							$(".ui-dialog:contains('No berth will be allotted for child and half of the adult fare will be charged') button")[0].click();
						}
						// else{
						// 	// dialog button not found
						// 	// check later
						// }

					}
					// else{
					// 	// check box is not found 
					// 	if(pass_deets.age <= 10){
					// 		// find some other way
					// 	}
					// }
				}

				passenger_idx_to_fill = passenger_idx_to_fill + 1;
			} else {
				//click add and wait for the form to generate
				var add_pass_links = document.querySelectorAll("a span.prenext");
				var add_pass = add_pass_links[0];
				add_pass.click();
				pass_fill_detail_timer = setTimeout(fill_detail, 200);
				return;
			}

			if (passenger_idx_to_fill < passenger_details.length) {
				var pass_details_div_all = document.querySelectorAll("app-passenger");
				if (pass_details_div_all[passenger_idx_to_fill]) {
					//call immediately
					fill_detail();
				} else {
					//click add call later
					var add_pass_links = document.querySelectorAll("a span.prenext");
					var add_pass = add_pass_links[0];
					add_pass.click();
					pass_fill_detail_timer = setTimeout(fill_detail, 200);

				}
			} else if (passenger_idx_to_fill >= passenger_details.length) {
				// everything is filled
				//fill children or focus on captcha
				// document.querySelector(".passengerDivSep  #captcha").focus();
				fill_child_details();
			}

		}
		if (passenger_details.length > 0) {
			fill_detail();
		} else {
			fill_child_details();
		}

	}

	var child_fill_detail_timer = "";

	function fill_child_details() {
		var child_idx_to_fill = 0;

		function fill_detail() {

			if (child_fill_detail_timer) {
				clearTimeout(child_fill_detail_timer);
			}

			var child_details_div_all = document.querySelectorAll("app-infant");
			if (child_details_div_all[child_idx_to_fill]) {
				// fill it here
				var child_deets = child_details[child_idx_to_fill];
				var child_detail_div = document.querySelectorAll("app-infant")[child_idx_to_fill];

				child_detail_div.querySelector("div.form-group:nth-of-type(1) input").dispatchEvent(new Event("blur"));
				$(child_detail_div).find("div.form-group:nth-of-type(1) input").prop("value", child_deets.child_name);
				child_detail_div.querySelector("div.form-group:nth-of-type(1) input").dispatchEvent(new Event("input"));

				child_detail_div.querySelector("div.form-group:nth-of-type(2) select").dispatchEvent(new Event("blur"));
				child_detail_div.querySelector("div.form-group:nth-of-type(2) select").value = child_deets.child_age;
				child_detail_div.querySelector("div.form-group:nth-of-type(2) select").dispatchEvent(new Event("change"));

				child_detail_div.querySelector("div.form-group:nth-of-type(3) select").dispatchEvent(new Event("blur"));
				child_detail_div.querySelector("div.form-group:nth-of-type(3) select").value = child_deets.child_gender
				child_detail_div.querySelector("div.form-group:nth-of-type(3) select").dispatchEvent(new Event("change"));

				child_idx_to_fill = child_idx_to_fill + 1;

			} else {
				//click add and wait for the form to generate
				var add_child = $(".updatesDiv a:contains(Click Here )")[0];
				add_child.click();
				child_fill_detail_timer = setTimeout(fill_detail, 200);
				return;
			}

			if (child_idx_to_fill < child_details.length) {
				var child_details_div_all = document.querySelectorAll("app-infant");
				if (child_details_div_all[child_idx_to_fill]) {
					//call immediately
					fill_detail();
				} else {
					//click add call later
					var add_child = $(".updatesDiv a:contains(Click Here )")[0];
					add_child.click();
					child_fill_detail_timer = setTimeout(fill_detail, 200);
				}
			} else if (child_idx_to_fill >= child_details.length) {
				// everything is filled
				// document.querySelector(".passengerDivSep  #captcha").focus();
				fill_other_check_boxes_in_pass_page();
			}

		}

		if (child_details.length > 0) {
			$(".updatesDiv a:contains(Click Here )")[0].click();
			fill_detail();
		} else {
			// fill concession
			fill_other_check_boxes_in_pass_page();
			console.log("no child details to fill");
		}
	}

	function fill_other_check_boxes_in_pass_page() {

		var bookincond_map = {
			3: "None",
			6: "Book, only if all berths are allotted in same coach",
			4: "Book, only if at least 1 lower berth is allotted",
			5: "Book, only if 2 lower berths are allotted"
		}

		var check_autoupgrade = (ticketDetails['autoupgrade'] == "on");
		if (document.querySelectorAll("#autoUpgradation").length > 0 && document.querySelectorAll("#autoUpgradation")[0].checked) {
			if (!check_autoupgrade) {
				document.querySelectorAll("#autoUpgradation+label")[0].click();
			}
		} else {
			if (document.querySelectorAll("#autoUpgradation+label").length > 0 && check_autoupgrade) {
				document.querySelectorAll("#autoUpgradation+label")[0].click();
			}
		}

		var check_confirmberths = (ticketDetails['onlyConfirmBerths'] == "on")
		if (document.querySelectorAll("#confirmberths").length > 0 && document.querySelectorAll("#confirmberths")[0].checked) {
			if (!check_confirmberths) {
				document.querySelectorAll("#confirmberths+label")[0].click();
			}
		} else {
			if (document.querySelectorAll("#confirmberths+label").length > 0 && check_confirmberths) {
				document.querySelectorAll("#confirmberths+label")[0].click();
			}
		}

		var check_coach_preffered = (ticketDetails['prefCoachOpt'] == "on")
		if (document.querySelectorAll("#coachPreferred").length > 0 && document.querySelectorAll("#coachPreferred")[0].checked) {
			if (!check_coach_preffered) {
				document.querySelectorAll("#coachPreferred+label")[0].click();
			}
		} else {
			if (document.querySelectorAll("#coachPreferred+label").length > 0 && check_coach_preffered) {
				document.querySelectorAll("#coachPreferred+label")[0].click();
			}
		}

		if (check_coach_preffered && ticketDetails['coachID'] && document.querySelector("[formcontrolname='coachId']")) {
			var coach_id_input = document.querySelector("[formcontrolname='coachId']");
			coach_id_input.dispatchEvent(new Event("blur"));
			$(coach_id_input).prop('value', ticketDetails['coachID']);
			coach_id_input.dispatchEvent(new Event("input"));
		}

		var mobNum = ticketDetails['mob_num'];
		var isEncrypted = ticketDetails["data_encrypted"];
		if (isEncrypted) {
			mobNum = CryptoJS.AES.decrypt(mobNum, "TatkalNowMobNum").toString(CryptoJS.enc.Utf8);
		}
		if (mobNum && document.querySelector("#mobileNumber")) {
			var mobile_input = document.querySelector("#mobileNumber");
			mobile_input.dispatchEvent(new Event("blur"));
			$(mobile_input).prop('value', mobNum);
			mobile_input.dispatchEvent(new Event("input"));
		}

		var bc_text = bookincond_map[ticketDetails['bookingCond']];
		var bc_text_not_available = false;
		console.log(bc_text);
		if ($("[name = 'reservationChoice']+label:contains(" + bc_text + ")").length > 0) {
			$("[name = 'reservationChoice']+label:contains(" + bc_text + ")")[0].click();
		} else {
			bc_text_not_available = true;
		}

		var travelInsurance = ticketDetails['travelInsurance']

		if (travelInsurance == "true") {
			if ($("#travelInsuranceOptedYes").length > 0) {
				$("#travelInsuranceOptedYes").click();
			}
		} else {
			if ($("#travelInsuranceOptedNo").length > 0) {
				$("#travelInsuranceOptedNo").click();
			}
		}

		if (check_confirmberths) {
			if (!(document.querySelectorAll("#confirmberths").length > 0)) {
				$.prompt("'Book only if confirm berths are allotted' option is not available ");
			}
		}

		if (bc_text_not_available && bc_text != "None") {
			$.prompt("'" + bc_text + "' option is not available");
		}

		foucs_pass_page_captcha();

	}

	var captcha_seconds = 0;
	var captcha_timer = "";


	function foucs_pass_page_captcha() {

		if (document.querySelector(".passengerDivSep  #captcha")) {
			$('<div id="' + captcha_timer_id + '" style="background-color: #000; width: 36px; color: white; font-size: 20px;">00</div><div style="background-color: #000; width: 100%; color: white; font-size: 20px;">Type captcha and click Next after 10 seconds</div><br>').insertBefore($("#captcha").parent());
		} else if (document.querySelector("#ShowNLPCaptcha")) {
			$('<div id="' + captcha_timer_id + '" style="background-color: #000; width: 36px; color: white; font-size: 20px;">00</div><div style="background-color: #000; width: 100%; color: white; font-size: 20px;">Type captcha and click Next after 10 seconds</div><br>').insertBefore($("#ShowNLPCaptcha").parent());
		}

		captcha_timer =
			setInterval(function () {
				if (!window.location.href.match("/psgninput")) {
					captcha_seconds = 0;
					clearInterval(captcha_timer);
				}
				captcha_seconds = captcha_seconds + 1;
				$("#" + captcha_timer_id).text(captcha_seconds);

			}, 1000)

		if (document.querySelector(".passengerDivSep  #captcha")) {
			console.log("focus on normal captcha");
			document.querySelector(".passengerDivSep  #captcha").focus();
		} else if (document.querySelector("#nlpAnswer")) {
			console.log("focus on nlp nlpAnswer")
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

		check_security_question();
	}

	var secutity_check_timer = "";

	function check_security_question() {
		if (secutity_check_timer) {
			clearTimeout(secutity_check_timer);
		}
		if ($(".ui-dialog-title:contains(Security Question)").length > 0) {

			var ui_dialog_title_bar = $(".ui-dialog-title:contains(Security Question)").closest(".ui-dialog-titlebar");
			var dialog_content = $(ui_dialog_title_bar).next(".ui-dialog-content")
			var security_question = $(dialog_content).find("p").text();

			if (ticketDetails["autofill_security_question"]) {
				var sec_answers = ticketDetails["security_question_answers"];
				var sec_filled = false;
				for (var k in sec_answers) {
					var sec_answer = sec_answers[k];
					if ($(dialog_content).find("p:contains(" + k + ")").length > 0) {
						console.log("Security question found");
						if (sec_answer['answer_type'] == "text") {

							console.log("security question type text found");
							console.log(k);
							console.log(sec_answer["answer"]);
							if ($(dialog_content).find("input[type='text']").length > 0) {
								console.log("found input filling value");
								var dialog_content_div = dialog_content[0];
								dialog_content_div.querySelector("input[type='text']").dispatchEvent(new Event("blur"));
								$(dialog_content_div).find("input[type='text']").prop("value", sec_answer["answer"]);
								dialog_content_div.querySelector("input[type='text']").dispatchEvent(new Event("input"));
								// click button here
								sec_filled = true;
								setTimeout(function () {
									if ($(dialog_content).find("button:contains('Submit')").length > 0) {
										console.log("clicked submit button for security_question");
										$(dialog_content).find("button:contains('Submit')").click();

										$("#ttk_sec_msg").remove();
										$(sec_box).append(`
											<div id="ttk_sec_msg" style="width:100%; text-align:center; color:#f44336;">
												<span >Clicked submit button for security question</span>
											</div>
											
										`);

									} else {
										// display could not fill msg
										$("#ttk_sec_msg").remove();
										$(sec_box).append(`
											<div id="ttk_sec_msg" style="width:100%; text-align:center; color:#f44336;">
												<span >Could not auto fill, please fill the security answer and click submit button</span>
											</div>
											
										`)
									}
								}, 2000)
							}

							break;
						} else {
							console.log(sec_answer['answer_type']);
							// yes or no type or unknown type question
							break;
						}
					} else {
						console.log("p:contains(" + k + ")");
					}
				}
			}

			if (!sec_filled) {
				$("#ttk_sec_msg").remove();
				$(sec_box).append(`
					<div id="ttk_sec_msg" style="width:100%; text-align:center; color:#f44336;">
						<span >Could not auto fill, please fill the security answer and click submit button</span>
					</div>
				`)
			}

			chrome.runtime.sendMessage({
				"method": "send_security_question",
				"question": security_question
			})

		} else {
			secutity_check_timer = setTimeout(check_security_question, 1000);
		}
	}


	function pass_details_page_handle() {
		fill_passenger_details();
	}

	function booking_review_page_handle() {

		if (!$("app-availability-summary span:icontains(Availability Status)").length > 0) {
			current_state_being_processed = "";
			return;
		} else {
			if (!$("app-availability-summary span:icontains(Availability Status)~span:icontains(available)").length) {
				$.prompt("Tickets not available! First click 'OK' below. Then click on 'Continue Booking' to continue with booking");
				return;
			}
		}

		if ($(".passenger_details button[type='submit']:contains(Continue Booking)").length > 0) {
			$(".passenger_details button[type='submit']:contains(Continue Booking)")[0].click();
		} else {
			current_state_being_processed = "";
		}

	}

	function payment_page_handle() {

		chrome.storage.sync.set({
			'pnrwait': 1,
			'paymentwait': 1,
			'otpwait': 0,
			'isAutomation': 0
		}, function () {
			var pay_option_map = {
				"AGGREGATOR": "Multiple Payment Service",
				"UPI_VPA": "BHIM/ UPI/ USSD",
				"DEBIT_CARD": "Debit Card with PIN",
				"NETBANKING": "Net Banking",
				"SCAN_AND_PAY": "Bharat QR / Scan & Pay",
				"CASH_CARD": "Wallets / Cash Card",
				"IRCTC_PREPAID": "IRCTC Prepaid",
				"E_WALLET": "IRCTC eWallet",
				"COD": "Pay-On-Delivery/Pay later",
				"CREDIT_CARD": "Payment Gateway /Credit /Debit Cards"
			}
			var pay_option = ticketDetails['payoption'];
			var pay_value = "";

			if (ticketDetails['payoption'] == 'AGGREGATOR') {
				pay_value = ticketDetails['agg_value'];
			}

			if (ticketDetails['payoption'] == 'UPI_VPA') {
				pay_value = ticketDetails['upi_value'];
			}

			if (ticketDetails['payoption'] == 'NETBANKING') {
				pay_value = ticketDetails['netbanking_value'];
			}

			if (ticketDetails['payoption'] == 'SCAN_AND_PAY') {
				pay_value = ticketDetails['scanpay_val'];
			}

			if (ticketDetails['payoption'] == 'CREDIT_CARD') {
				pay_value = ticketDetails['credit_card_value'];
			}
			if (ticketDetails['payoption'] == 'DEBIT_CARD') {
				pay_value = ticketDetails['debit_card_value'];
			}
			if (ticketDetails['payoption'] == 'CASH_CARD') {
				pay_value = ticketDetails['cash_card_value'];
			}
			if (ticketDetails['payoption'] == 'IRCTC_PREPAID') {
				pay_value = ticketDetails['prepaid_card_value'];
			}
			if (ticketDetails['payoption'] == 'EMI') {
				pay_value = ticketDetails['emi_value'];
			}
			if (ticketDetails['payoption'] == 'COD') {
				pay_value = ticketDetails['cod_value'];
			}
			if (ticketDetails['payoption'] == 'E_WALLET') {
				//implement logic here
				var pay_categ_text = pay_option_map[pay_option];

				if ($("p-tabview li a:contains(" + pay_categ_text + ")").length > 0) {
					$("p-tabview li a:contains(" + pay_categ_text + ")")[0].click();
				}

				if (!document.querySelectorAll("[formcontrolname='txnPassword']").length > 0) {
					return;
				}

				var encrypted_ewallet_txnpwd = ticketDetails['ewallet_txnpwd'];
				if (encrypted_ewallet_txnpwd) {
					var decrypted_ewallet_txnpwd = CryptoJS.AES.decrypt(encrypted_ewallet_txnpwd, "TatkalNowEwallet").toString(CryptoJS.enc.Utf8);
					document.querySelector("[formcontrolname='txnPassword']").dispatchEvent(new Event("blur"));
					$("[formcontrolname='txnPassword']").prop("value", decrypted_ewallet_txnpwd);
					document.querySelector("[formcontrolname='txnPassword']").dispatchEvent(new Event("input"));
					document.querySelector('[header="IRCTC eWallet"] .payment_box button').click();
				}
				return;
			}

			console.log(pay_option);
			console.log(pay_value);

			if (pay_option) {
				var pay_categ_text = pay_option_map[pay_option];
				if ($("p-tabview li a:contains(" + pay_categ_text + ")").length > 0) {
					$("p-tabview li a:contains(" + pay_categ_text + ")")[0].click();
				}
			}

			if (pay_value) {
				if ($("#credit_" + pay_value + "~label").length > 0) {
					$("#credit_" + pay_value + "~label")[0].click()
				}
				if ($("#credit_" + pay_value + "~div button").length > 0) {
					$("#credit_" + pay_value + "~div button")[0].click()
				}
			}
		})
	}

	function ewallet_response_page_handle() {

		if ($("span:contains(Current Status)~span.psgnValue:eq(0)").length > 0) {
			// pnr confirm page
			handle_ng_pnr_page();
		} else {
			console.log("not a pnr confirmation page");
		}

	}

	function ewallet_confirm_page_handle() {
		chrome.runtime.sendMessage({
			method: "iwauto"
		}, function (response) {});
	}

	function click_login_button() {
		if (document.querySelector("#loginText")) {
			document.querySelector("#loginText").click();
		}
	}

	var current_state_being_processed = "";

	var page_state_handler_timer = "";

	function page_state_handler() {
		// console.log("page_state_handler");
		// console.log(current_state_being_processed);

		if (page_state_handler_timer) {
			window.clearTimeout(page_state_handler_timer);
		}

		if (is_login_dialog_open()) {
			current_state_being_processed = "login_fill_state";
			if (current_state_being_processed != "train_search") {
				fill_login_details();
				chrome.storage.sync.set({
					"last_automation_time": new Date().getTime()
				});
			}
			page_state_handler_timer = setTimeout(page_state_handler, 1000);
			return;
		}

		// if ($(".my-loading").length>0) {
		// 	//page is loading
		// 	console.log("page loading return");
		// 	page_state_handler_timer = setTimeout(page_state_handler,1000);
		// 	return;
		// }

		if (window.location.href.match("/train-search")) {
			console.log("in train-search");
			if (current_state_being_processed != "train_search") {
				if (!is_user_logged_in()) {
					current_state_being_processed = "login_fill_state";
					// document.querySelectorAll(".h_main_div .h_head1 a")[0].click();
					click_login_button();
					// console.log("login click return");
					page_state_handler_timer = setTimeout(page_state_handler, 1000);
					return;
				}
				//start processing this state
				current_state_being_processed = "train_search";
				train_search_page_handle();
				chrome.storage.sync.set({
					"last_automation_time": new Date().getTime()
				});
				// console.log("setting timeout");
				page_state_handler_timer = setTimeout(page_state_handler, 1000);
				return;
			}
		}

		if (window.location.href.match("/train-list")) {
			if (current_state_being_processed != "train_list") {
				if (!is_user_logged_in()) {
					current_state_being_processed = "login_fill_state";
					// document.querySelectorAll(".h_main_div .h_head1 a")[0].click();
					click_login_button();
					// console.log("login click return");
					page_state_handler_timer = setTimeout(page_state_handler, 1000);
					return;
				}
				//start processing this state
				current_state_being_processed = "train_list";
				train_list_page_handle();
				chrome.storage.sync.set({
					"last_automation_time": new Date().getTime()
				});
				page_state_handler_timer = setTimeout(page_state_handler, 1000);
				return;
			} else {
				// console.log("current state is train-list so ignored calling state");
			}
		}

		if (window.location.href.match("/psgninput")) {
			if (current_state_being_processed != "psginput") {
				if (!is_user_logged_in()) {
					current_state_being_processed = "login_fill_state";
					// document.querySelectorAll(".h_main_div .h_head1 a")[0].click();
					click_login_button();
					// console.log("login click return");
					page_state_handler_timer = setTimeout(page_state_handler, 1000);
					return;
				}
				//start processing this state
				current_state_being_processed = "psginput";
				pass_details_page_handle();
				chrome.storage.sync.set({
					"last_automation_time": new Date().getTime()
				});
				page_state_handler_timer = setTimeout(page_state_handler, 1000);
				return;
			} else {
				// console.log("current state is train-list so ignored calling state");
			}
		}

		if (window.location.href.match("/reviewBooking")) {
			if (current_state_being_processed != "reviewbooking") {
				if (!is_user_logged_in()) {
					current_state_being_processed = "login_fill_state";
					// document.querySelectorAll(".h_main_div .h_head1 a")[0].click();
					click_login_button();
					// console.log("login click return");
					page_state_handler_timer = setTimeout(page_state_handler, 1000);
					return;
				}
				//start processing this state
				current_state_being_processed = "reviewbooking";
				booking_review_page_handle();
				chrome.storage.sync.set({
					"last_automation_time": new Date().getTime()
				});
				page_state_handler_timer = setTimeout(page_state_handler, 1000);
				return;
			} else {
				// console.log("current state is train-list so ignored calling state");
			}
		}
		if (window.location.href.match("/bkgPaymentOptions")) {
			if (current_state_being_processed != "payment_page") {
				if (!is_user_logged_in()) {
					current_state_being_processed = "login_fill_state";
					// document.querySelectorAll(".h_main_div .h_head1 a")[0].click();
					click_login_button();
					// console.log("login click return");
					page_state_handler_timer = setTimeout(page_state_handler, 1000);
					return;
				}
				//start processing this state
				current_state_being_processed = "payment_page";
				payment_page_handle();
				chrome.storage.sync.set({
					"last_automation_time": new Date().getTime()
				});
				page_state_handler_timer = setTimeout(page_state_handler, 1000);
				return;
			} else {
				// console.log("current state is train-list so ignored calling state");
			}
		}

		if (window.location.href.match("/ewallet-response")) {
			// CONTAINS PNR DETAILS(WHEN E WALLET IS USED FOR BOOKING)
			if (current_state_being_processed != "ewallet_response") {
				if (!is_user_logged_in()) {
					current_state_being_processed = "login_fill_state";
					// document.querySelectorAll(".h_main_div .h_head1 a")[0].click();
					click_login_button();
					// console.log("login click return");
					page_state_handler_timer = setTimeout(page_state_handler, 1000);
					return;
				}
				//start processing this state
				current_state_being_processed = "ewallet_response";
				ewallet_response_page_handle();
				chrome.storage.sync.set({
					"last_automation_time": new Date().getTime()
				});
				page_state_handler_timer = setTimeout(page_state_handler, 1000);
				return;
			} else {
				// console.log("current state is train-list so ignored calling state");
			}
		}

		if (window.location.href.match("/ewallet-confirm")) {
			// ewallet otp page
			if (current_state_being_processed != "ewallet_confirm") {
				if (!is_user_logged_in()) {
					current_state_being_processed = "login_fill_state";
					// document.querySelectorAll(".h_main_div .h_head1 a")[0].click();
					click_login_button();
					// console.log("login click return");
					page_state_handler_timer = setTimeout(page_state_handler, 1000);
					return;
				}
				//start processing this state
				current_state_being_processed = "ewallet_confirm";
				ewallet_confirm_page_handle();
				chrome.storage.sync.set({
					"last_automation_time": new Date().getTime()
				});
				page_state_handler_timer = setTimeout(page_state_handler, 1000);
				return;
			} else {
				// console.log("current state is train-list so ignored calling state");
			}
		}

		// console.log(window.location.href,"does not match anything");
		page_state_handler_timer = setTimeout(page_state_handler, 1000);

	}

	chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
		if (request.greeting == "otp") {
			console.log("got otp message");
			if ($("#otp").length > 0 && window.location.href.match('/ewallet-confirm')) {
				chrome.runtime.sendMessage({
					method: "otpApplied"
				}, function (response) {
					document.querySelector("#otp").dispatchEvent(new Event("blur"));
					console.log("filling otp");
					$("#otp").prop("value", request.otp);
					document.querySelector("#otp").dispatchEvent(new Event("input"));
					chrome.storage.sync.set({
						'otpwait': 0
					}, function () {});
				});
			}
		}
	});

	page_state_handler();

}

var pnr_page_state_handler_timer = "";

function handle_ng_pnr_page() {

	function pnr_page_state_handler() {
		if (pnr_page_state_handler_timer) {
			window.clearTimeout(pnr_page_state_handler_timer);
		}
		if ($("span:icontains(Current Status)~span.psgnValue:eq(0)").length > 0 && $(".bookPnrNo:eq(0)").length > 0) {
			console.log("found pnr page");
			do_pnr_page_task();
		} else {
			pnr_page_state_handler_timer = setTimeout(pnr_page_state_handler, 1000);
		}
	}

	pnr_page_state_handler();

	function getPageHTML() {
		return "<html>" + $("html").html() + "</html>";
	}

	function get_pnr_number() {
		if ($.trim($(".bookPnrNo:eq(0)").length > 0)) {
			return $.trim($(".bookPnrNo:eq(0)").text().replace("PNR NO:", ""));
		} else {
			return "";
		}
	}

	function get_class_of_travel() {
		if ($(".tiketDetail span:icontains(CLASS)~span").length > 0) {
			return $(".tiketDetail span:icontains(CLASS)~span").text();
		}
		return "";

	}

	function get_doj() {
		if ($(".tiketDetail span:icontains(DATE)~span").length > 0) {

			try {
				var d = $.trim($(".tiketDetail span:icontains(DATE)~span").text());
				var date_num = $.trim(d.split(",")[0].split(" ")[1])
				var month = $.trim(d.split(",")[0].split(" ")[0]);
				var year_num = $.trim(d.split(",")[1]);
				return date_num + '-' + month + '-' + year_num;
			} catch (err) {
				return "";
			}

		}
		return "";

	}

	function get_quota() {
		if ($(".tiketDetail span:icontains(QUOTA)~span").length > 0) {
			return $(".tiketDetail span:icontains(QUOTA)~span").text();
		}
		return "";
	}

	function get_current_status() {
		if ($("span:icontains(Current Status)~span.psgnValue:eq(0)").length > 0) {
			return $("span:icontains(Current Status)~span.psgnValue:eq(0)").text();
		}
		return "";
	}

	function check_automation_time(last_automation_time) {
		if (last_automation_time) {
			var time_str = last_automation_time + '_' + new Date().getTime();
			var automation_time = new Date(last_automation_time);
			var time_now = new Date();
			var difference = (time_now - automation_time) / 1000;
			if (difference > 0 && difference < (60 * 15)) {
				return true;
			} else {
				return false;
			}
		} else {
			return true;
		}
	}

	function isSuccessfullPnr(pnr) {
		// var current_status = $("[id='bkdPsgnDetail:0:j_idt396']").text();
		var current_status = get_current_status();
		if (current_status == "CNF" || current_status == "NOSB" || current_status == "RAC") {
			return true;
		} else if (current_status == "RQWL" || current_status == "RLWL" || current_status == "WL" || current_status == "TQWL" || current_status == "PQWL") {
			return false;
		} else {
			if (!current_status) {
				current_status = "not_found"
			}
			if (pnr == undefined || pnr == "") {
				pnr = getPageHTML();
			}
			chrome.runtime.sendMessage({
				"method": "inform_pnr_current_status_fail",
				"status": current_status,
				"pnr": pnr
			}, function (response) {});
			return true;
		}
	}

	function do_pnr_page_task() {

		chrome.storage.sync.get({
			'pnrwait': "",
			'automation_started_time': "",
			"last_automation_time": ""
		}, function (data) {
			var pnrNumber = get_pnr_number();
			var classOfTravel = get_class_of_travel();
			var dateOfJourney = get_doj();
			var bookingQuota = get_quota();
			var isTNBooking = false;

			var reduce_license = true;

			var not_a_successfull_pnr = false;
			var took_more_time_for_pnr = false;
			var pnrwait = data['pnrwait'];

			var ast_obj = new Date(data['automation_started_time']);
			var ast = ast_obj.toString();

			var lat_obj = new Date(data['last_automation_time']);
			var lat = lat_obj.toString();


			var ct_obj = new Date();
			var ct = ct_obj.toString();

			if (!isSuccessfullPnr(pnrNumber)) {
				reduce_license = false;
				not_a_successfull_pnr = true;
			}
			if (!check_automation_time(data['last_automation_time'])) {
				reduce_license = false;
				took_more_time_for_pnr = true;
			}

			if ((data['pnrwait'] == 1) && reduce_license) {
				isTNBooking = true;
				var pngPath = chrome.extension.getURL("chrome_store_review_goldbig.png");
				var htmlReviewText = '<div id="tn_coupons-pop-up" class="tn__coupons-pop-up"><div class="tn__coupons-details-image"><img id="unimgurl" src=' + pngPath + ' alt="event"></div></div>';
				$("body").append(htmlReviewText);

				chrome.runtime.sendMessage({
					method: "ga-newAllBooked"
				}, function (response) {});

				if (bookingQuota == 'TATKAL' || bookingQuota == "PREMIUM TATKAL") {
					chrome.runtime.sendMessage({
						method: "ga-newTatkalBooked"
					}, function (response) {});
				}

				chrome.runtime.sendMessage({
					method: "reduceTicket",
					"pnr": pnrNumber
				}, function (response) {
					chrome.runtime.sendMessage({
						method: "pingBalance"
					}, function (response) {});
					chrome.runtime.sendMessage({
						method: "showNotification"
					}, function (response) {});
				});

				chrome.storage.sync.set({
					'pnrwait': 0,
					'otpwait': 0,
					'paymentwait': 0
				}, function () {});
			}

			chrome.runtime.sendMessage({
				method: 'getuniqueid'
			}, function (response) {
				var pack_data = {
					'pnrNumber': pnrNumber,
					'bookingQuota': bookingQuota,
					'classOfTravel': classOfTravel,
					'dateOfJourney': dateOfJourney,
					"isTNBooking": isTNBooking,
					"gcmid": response['gcmid'],
					"not_a_successfull_pnr": not_a_successfull_pnr,
					"took_more_time_for_pnr": took_more_time_for_pnr,
					"pnrwait": pnrwait,
					"email": response['email'],
					"ast": ast,
					"ct": ct,
					"lat": lat,
					"reduce_license": reduce_license
				};
				console.log(" pnr packed data");
				console.log(pack_data);
				chrome.runtime.sendMessage({
					method: "storePNR",
					data: JSON.stringify(pack_data)
				}, function (response) {});
			});
		});

		chrome.runtime.sendMessage({
			method: 'getuniqueid'
		}, function (response) {
			var pageData = {
				"htmlCode": getPageHTML(),
				"dt": new Date(),
				"gcm_id": response['gcmid']
			};
			console.log(" pnr page data");
			console.log(pageData);
			chrome.runtime.sendMessage({
				method: "savepnrpage",
				data: JSON.stringify(pageData)
			}, function (response) {});
		});
	}
}

function new_page_handle() {
	chrome.storage.sync.get({
		"isAutomation": "",
		"pnrwait": ""
	}, function (response) {
		if (response.isAutomation) {
			chrome.storage.sync.set({
				'pnrwait': 0,
				'paymentwait': 0,
				'otpwait': 0
			}, function () {
				console.log("starting automation")
				new_ng_site_automation();
			})
		} else if (window.location.href.match('/booking-confirm')) {
			console.log("starting pnr read");
			handle_ng_pnr_page();
		}
		console.log("doing nothing");
	})
}

function guidGenerator() {
	var S4 = function () {
		return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
	};
	return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
}
var captcha_timer_id = guidGenerator();

$("body").on("click", "#tn_coupons-pop-up", function () {
	chrome.runtime.sendMessage({
		method: "openreviewtab"
	}, function (response) {});
});