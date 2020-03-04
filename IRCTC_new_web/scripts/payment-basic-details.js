developerMode = true;
_cardType = 'VISA';
//MC: Master Card
//VISA : Visa Card

_cardNumber = '4893kkkkxxxpxxx'; // without space/hiphen
_cardExpiryMonth = 2; //in single digit as number. e.g: 1,2,3,..,10,11 -----> NOT '02' or '10'
_cardExpiryYearYYYY = '2222';
_cardCVV = '111';
_cardHolderName = 'Rajiv Kumar';

_waitTime1sec = 1000;
_waitTime2sec = 2000;
var offsetDelayDuration = 200;

console.log("---------------------------------------");
console.log('%c Autofill plugin execution started !', 'background: #06a4f8; color: #fff');
console.log("---------------------------------------");


AutoFillPaymentDetail();
timer_bindEventToClickSubmitOnEnterKey = setTimeout(bindEventToClickSubmitOnEnterKey, offsetDelayDuration);


function AutoFillPaymentDetail() {
    console.log("Inside AutoFillPaymentDetail()");

    // document.getElementById('addPassengerForm:mobileNo').onkeydown = function(event) {
    //     if (event.keyCode == 13 && event.altKey) {
    //         alert('shift + Enter');
    //     }
    // }
    timer_chooseCardType = setTimeout(function () {
        document.querySelector('.payment_mode').click();
    }, offsetDelayDuration);


    timer_paymentDetailsInput = setTimeout(function () {
        document.getElementById("hdfc_credit").click(); // options of dropdown are actually div. its not dropdown 
        document.getElementById("card_no").value = _cardNumber;
        document.getElementById('name').value = _cardHolderName;
        document.getElementById('expMonthSelect').value = _cardExpiryMonth;
        document.getElementById('expYearSelect').value = _cardExpiryYearYYYY;
        document.getElementById('cvv_no').value = _cardCVV;

        document.getElementById('capacha').focus();
    }, offsetDelayDuration + 300);
}

function bindEventToClickSubmitOnEnterKey() {
    // Get the input field
    var input = document.getElementById("capacha");

    // Execute a function when the user releases a key on the keyboard
    input.addEventListener("keyup", function (event) {
        // Number 13 is the "Enter" key on the keyboard
        if (event.keyCode === 13) {
            // Cancel the default action, if needed
            event.preventDefault();
            // Trigger the button element with a click
            document.getElementById("submit_btn").click();
        }
    });
}

function consoleLog(content) {
    if (developerMode) {
        //console.debug(new Date() + ": " + content);
        console.debug(content);
    }
}

//resetAllFlags();
//clearAllTimers();