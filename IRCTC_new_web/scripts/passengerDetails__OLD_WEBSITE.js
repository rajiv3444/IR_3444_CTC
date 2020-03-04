developerMode = true;
_mobileNumber= '8000940940';
_passergerList = [
    { name: 'SUMIT', age: '30', gender: 'M' }
  //, { name: 'kUNDAN dEVI', age: '61', gender: 'F' }
    //,{name: 'daksha', age: '44', gender:'F'}
    //,{name: 'Himani', age: '21', gender:'F'}
];
//console.log("---------------------------------------");
//console.log('%c Autofill plugin execution started !', 'background: #06a4f8; color: #fff');
//console.log('%c Fillng Passenger details...', 'background: #06a4f8; color: #fff');
//console.log("---------------------------------------");

AutoFillPassengerDetail();

function AutoFillPassengerDetail() {
    consoleLog("Inside AutoFillPassengerDetail()");
    //debugger;
    for (i = 0; i < _passergerList.length; i++) {
        p = _passergerList[i]
        console.log(p.name); 
        console.log(p.age);
        console.log(p.gender);
        document.querySelectorAll('input[id^="addPassengerForm:psdetail:' + i + ':p"]')[0].value = p.name;;
        //document.getElementById('addPassengerForm:psdetail:' + i + ':p377958156').value = p.name;
        document.getElementById('addPassengerForm:psdetail:' + i + ':psgnAge').value = p.age;
        document.getElementById('addPassengerForm:psdetail:' + i + ':psgnGender').value = p.gender;
    }
    document.getElementById('addPassengerForm:mobileNo').value = _mobileNumber;
}



function consoleLog(content) {
    if (developerMode) {
        //console.debug(new Date() + ": " + content);
        console.debug(content);
    }
}
