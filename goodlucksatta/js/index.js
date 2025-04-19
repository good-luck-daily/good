const timeArray = ['09:00 AM', '09:20 AM', '09:40 AM', '10:00 AM', '10:20 AM', '10:40 AM', '11:00 AM', '11:20 AM', '11:40 AM', '12:00 PM', '12:20 PM', '12:40 PM', '01:00 PM', '01:20 PM', '01:40 PM', '02:00 PM', '02:20 PM', '02:40 PM', '03:00 PM', '03:20 PM', '03:40 PM', '04:00 PM', '04:20 PM', '04:40 PM', '05:00 PM', '05:20 PM', '05:40 PM', '06:00 PM', '06:20 PM', '06:40 PM', '07:00 PM', '07:20 PM', '07:40 PM', '08:00 PM', '08:20 PM', '08:40 PM', '09:00 PM'];

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function () {
    startOdometer();
    document.getElementById("today-date").innerHTML = getTodayDate();


});
function getNumber(dateString) {
    $.get("https://api.goodlucksatta.com/" + dateString)
        .done(function (data) {
            setNumberData(data)
        })
}

function setNumberData(data) {
    let listOfObjectNumber = [];
    for (const value of data) {
        let row = '';
        row += '<tr>';
        row += '<td>' + value.t + '</td>';

        row += '<td>' + value.mu + '</td>';

        row += '<td>' + value.d + '</td>';

        row += '<td>' + value.ma + '</td>';
        row += '<td>' + value.p + '</td>';

        row += '</tr>';
        listOfObjectNumber[listOfObjectNumber.length] = row;
    }
    let finalNumber = '';
    listOfObjectNumber.reverse();
    listOfObjectNumber.forEach(function (thisNumber) {
        finalNumber += thisNumber;
    });
    // http://localhost:8080/2025-04-18
    // http://localhost:8080/2025-4-18
    $(document).ready(function () {
        $('#good-luck').empty();
        $('#good-luck').append(finalNumber);
    });
}

let date = new Date()
getNumber(`${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`)

function getTodayDate() {
    const d = new Date();
    const pad = n => String(n).padStart(2, '0');
    let date = `${pad(d.getFullYear())}-${pad(d.getMonth() + 1)}-${d.getDate()}`;
    return date
}
function fetchNumberByDate(now_date){
    getNumber(now_date)
}
function startOdometer() {
    let lcount2 = 0;
    let lcount4 = 1;

    let lel2 = [];
    let eod2 = [];


    lel2[lcount2] = document.getElementById("lottery2");
    lel2[lcount4] = document.getElementById("lottery4");
    if (lel2[lcount2] == null || lel2[lcount4] == null) return;
    eod2[lcount2] = new Odometer({
        el: lel2[lcount2], value: 100000, format: 'd', theme: 'car'
    });
    eod2[lcount4] = new Odometer({
        el: lel2[lcount4], value: 100000, format: 'd', theme: 'car'
    });

    setInterval(function () {
        eod2[lcount2].update(Math.floor(Math.random() * 30567));
        eod2[lcount4].update(Math.floor(Math.random() * 30567));
    }, 2500);
}
