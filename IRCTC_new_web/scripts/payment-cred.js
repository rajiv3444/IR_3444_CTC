console.log("entering static passsword");

var _isCredSubmitted = false;
_Cc_staticPassword = "AAA@aaa3"


if (!_isCredSubmitted) {
    timer_cred = setTimeout(inputCredential, 200);
}

function inputCredential() {
    console.log("inputCredential()...");
    document.getElementById("staticAuthOpen").click();
    document.getElementById("txtPassword").value = _Cc_staticPassword;
    //document.getElementById("showpassword").click();

    //document.querySelectorAll('[type=submit]')[0].click(); // for OTP
    document.querySelectorAll('[type=submit]')[1].click(); // for STATIC PWD

    _isCredSubmitted = true;
    clearTimeout(timer_cred);
}


//resetAllFlags();
//clearAllTimers();