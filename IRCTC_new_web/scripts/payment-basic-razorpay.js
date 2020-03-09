

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