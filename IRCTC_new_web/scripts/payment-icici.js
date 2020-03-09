
//https://www4.ipg-online.com/connect/gateway/processing?execution=e3s1


//alert("PAYMENT ICICI");



/****************************************************** */
/*  Data initilization*/
_cardNumber = _CARD_DETAIL.CardNumber;  // without space/hiphen
_cardExpiryMonth = _CARD_DETAIL.CardExpiryMonth; //in single digit as number. e.g: 1,2,3,..,10,11 -----> NOT '02' or '10'
_cardExpiryYearYYYY = _CARD_DETAIL.CardExpiryYearYYYY; // 
_cardCVV = _CARD_DETAIL.CardCVV;
_cardHolderName = _CARD_DETAIL.CardHolderName;
/****************************************************** */


// select VISA etc as card type and click next to proceed to next page for entering card detils
var intervalTimer_selectCardType = setInterval(selectCardTypeAndPrpceedNext, 200);
function selectCardTypeAndPrpceedNext() {
    //onclickPaymentTypes('VISA');
    if (document.getElementById('paymentMethod') !== null) {
        document.getElementById('paymentMethod').value = 0;
        document.getElementById("next").click();
        clearInterval(intervalTimer_selectCardType);
    }
}


// fill credit card details
var intervalTimer_fillCardDetails = setInterval(fillCardDetails, 200);
function fillCardDetails() {
    if (document.getElementById('bname') != null) {
        document.getElementById('bname').value = _cardHolderName;
        document.getElementById("cardnumber").value = _cardNumber;
        document.getElementById('expmonth').value = _cardExpiryMonth;
        document.getElementById('expyear').value = _cardExpiryYearYYYY - 2020; // for 2022: DROPDOWN value is 2document.getElementById('cvm_masked').value = 111;
        document.getElementById('cvm_masked').value = _cardCVV;
        document.getElementById('cvm').value = _cardCVV;

        document.getElementById("next").click();

        clearInterval(intervalTimer_fillCardDetails);
    }
}

