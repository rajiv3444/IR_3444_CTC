//alert('boot')
console.log('%c Autofill plugin execution started !', 'background: #06a4f8; color: #fff');
console.log('boot.js')
var _IS_PASSENGER_PAGE_DONE = false;
var _IS_REVIEW_BOOKING_PAGE_DONE = false;
var _IS_PAYMENT_OPTION_PAGE_DONE = false;
var _IS_QUOTA_DROPDOWN_SELECTION_DONE = false;

var timer_startAutomationOnInterval;
var timer_bindEventToClickSubmitOnEnterKey;
var timer_chooseCardType;
var timer_paymentDetailsInput;
var timer_cred;


resetAllFlags();
clearAllTimers();

timer_startAutomationOnInterval = setInterval(startAutomationOnInterval, 1000);


function startAutomationOnInterval() {
    console.log('startAutomationOnInterval()');

    /*************************** PASSENGER ********************************* */
    //if Train list page found: call the method and clear the timer
    if (window.location.href.match("/psgninput")) {
        console.log("PASSENGER PAGE FOUND /psgninput...");
        if (!_IS_PASSENGER_PAGE_DONE) {
            AutoFillPassengerDetail();
            _timerIntervalSubmitButton = setInterval(clickSubmitButtonOnPsngerPage, 400);
            //return;
        }

    }

    /*************************** REVIEW BOOKING PAGE********************************* */
    if (window.location.href.match("/reviewBooking")) {
        console.log("REVIEW PAGE FOUND /reviewBooking...");
        if (!_IS_REVIEW_BOOKING_PAGE_DONE) {
            booking_review_page_handle();
            //return;
        }

    }

    /*************************** CHOOSE PAYMENT OPTOPN PAGE********************************* */
    if (window.location.href.match("/bkgPaymentOptions")) {
        console.log("PAYMENT OPTOPN PAGE FOUND /bkgPaymentOptions...");
        if (!_IS_PAYMENT_OPTION_PAGE_DONE) {
            selectPaymentModeCreditDebitHdfc();
            //selectPaymentModeRazorPay();
            //return;
        }

    }
    /*************************** QUOTA SELECTION DROPDOWN - TATKAL ********************************* */
    if (window.location.href.match("/train-list")) {
        console.log("train-list PAGE FOUND /train-list...");
        if (!_IS_QUOTA_DROPDOWN_SELECTION_DONE) {
            SelectQuota();
            //return;
        }

    }
}

function resetAllFlags() {
    //
    _IS_PASSENGER_PAGE_DONE = false;
    _IS_REVIEW_BOOKING_PAGE_DONE = false;
    _IS_PAYMENT_OPTION_PAGE_DONE = false;

    //card cred page
    _isCredSubmitted = false;
}

function clearAllTimers() {

    //alert('clearAllTimers called');
    /*
    clearInterval(timer_startAutomationOnInterval);
    clearTimeout(timer_bindEventToClickSubmitOnEnterKey);
    clearTimeout(timer_chooseCardType);
    clearTimeout(timer_paymentDetailsInput);
    clearTimeout(timer_cred);
*/
}