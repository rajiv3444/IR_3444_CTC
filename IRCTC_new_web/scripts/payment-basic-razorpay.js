
_cardNumber = '46456456456456456';
_cardExpiryMMYY = '02/22'; //1,2,3,....9,10,11,12 -----> NOT '02' or '03' or 04...
//_cardExpiryYearYYYY = '2022';
_cardCVV = '456456';
_cardHolderName = 'Rajiv Kumar';


setTimeout(startAutofillPayment, 1000);


function startAutofillPayment() {
    debugger;
    if (document.getElementById('form-fields')) {

        document.querySelector('[tab=card]').click();
        setTimeout(fillCardDetail, 200);
        setTimeout(function () {
            document.querySelector('[type=submit]').click();
        }, 400);
        setTimeout(function () {
            document.getElementsByClassName('btn')[0].click();
        }, 600);



    }
}

function fillCardDetail() {
    document.getElementById('card_number').value = '34534534534535';
    document.getElementById('card_expiry').value = '02/27';
    document.getElementById('card_name').value = 'rajiv kumar';
    document.getElementById('card_cvv').value = '34534535';
}