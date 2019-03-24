/*************************************/
/* Calculating Performance for Staff */
/*************************************/
const Staff = require('../../models/Staff')
const request = require('request')

//1-average cases done per week/month
//2-number of completed cases
//3-array of cases done per day/month
//4-number of mins spent per case
//5-leaderboard of all staff acording to number of copleted cases/month or all-time

module.exports.numberOfCasesInRangeDaysForLawyer = function (id, startDate, endDate) {

    var clientServerOptions = {

        uri: global.heroku + '/api/Cases',
        body: '',
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }

    request(clientServerOptions, function (error, response) {

        var data = JSON.parse(response.body).data

        var casesDateArray = [];
        var resultArr = [];

        for (let i = 0; i < data.length - 1; i++) {
            if (data[i].lawyerID === id && data[i].caseStatus != 'null' && data[i].caseStatus != 'lawyer') {
                casesDateArray.push(data[i].lawyerFinishDate)
            }
        }

        let date = startDate
        while (date <= endDate) {
            let x = 0;
            for (let i = 0; i < casesDateArray.length; i++) {
                if (typeof casesDateArray[i] != 'undefined') {
                    let d1 = new Date(casesDateArray[i])
                    if (d1.getTime() === date.getTime()) {
                        x = x + 1
                    }
                }
            }
            resultArr.push(x)
            date.setDate(date.getDate() + 1)
        }


        console.log(resultArr)
        return resultArr;
    });


};

module.exports.numberOfCasesInRangeDaysForReviewer = function (id, startDate, endDate) {

    var clientServerOptions = {

        uri: global.heroku + '/api/Cases',
        body: '',
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }

    request(clientServerOptions, function (error, response) {

        var data = JSON.parse(response.body).data

        var casesDateArray = [];
        var resultArr = [];

        for (let i = 0; i < data.length - 1; i++) {
            if (data[i].reviewerID === id && data[i].caseStatus != 'lawyer' && data[i].caseStatus != 'reviewer') {
                casesDateArray.push(data[i].reviewerFinishDate)
            }
        }

        let date = startDate
        while (date <= endDate) {
            let x = 0;
            for (let i = 0; i < casesDateArray.length; i++) {
                if (typeof casesDateArray[i] != 'undefined') {
                    let d1 = new Date(casesDateArray[i])
                    if (d1.getTime() === date.getTime()) {
                        x = x + 1
                    }
                }
            }
            resultArr.push(x)
            date.setDate(date.getDate() + 1)
        }


        console.log(resultArr)
        return resultArr;
    });


};

module.exports.minsSpentLawyer = function (id) {

    var res
    var clientServerOptions = {

        uri: global.heroku + '/api/Cases',
        body: '',
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }

    request(clientServerOptions, function (error, response) {

        var mins = []
        var data = JSON.parse(response.body).data

        for (let i = 0; i < data.length - 1; i++) {
            if (data[i].lawyerID === id && typeof data[i].lawyerFinishDate != 'undefined'
                && typeof data[i].caseOpenSince != 'undefined') {

                var d1 = new Date(data[i].lawyerFinishDate)
                var d2 = new Date(data[i].caseOpenSince)
                mins.push(d1.getTime() - d2.getTime())
                // console.log(d1.getTime() - d2.getTime())         
                // console.log(Math.abs(d1.getTime() - d2.getTime()) )        

            }
        }

        var sumMins = 0
        for (let i = 0; i < mins.length; i++) {
            sumMins = sumMins + mins[i]
            //console.log(sumMins)
        }

        var result = 0
        if (mins.length > 0) {
            //console.log(sumMins)
            //console.log(mins.length)
            result = sumMins / (mins.length * 1000 * 60)
        }

        console.log(result)
        res = result
        return;
    })

    //return new Promise(res)
}

module.exports.minsSpentReviewer = async function (id) {

    var res
    var clientServerOptions = {

        uri: global.heroku + '/api/Cases',
        body: '',
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }

    request(clientServerOptions, function (error, response) {

        var mins = []
        var data = JSON.parse(response.body).data

        for (let i = 0; i < data.length - 1; i++) {
            if (data[i].reviewerID === id && typeof data[i].reviewerFinishDate != 'undefined'
                && typeof data[i].caseOpenSince != 'undefined') {

                var d1 = new Date(data[i].reviewerFinishDate)
                var d2 = new Date(data[i].caseOpenSince)
                mins.push(d1.getTime() - d2.getTime())
                // console.log(d1.getTime() - d2.getTime())         
                // console.log(Math.abs(d1.getTime() - d2.getTime()) )        

            }
        }

        var sumMins = 0
        for (let i = 0; i < mins.length; i++) {
            sumMins = sumMins + mins[i]
            //console.log(sumMins)
        }

        var result = 0
        if (mins.length > 0) {
            //console.log(sumMins)
            //console.log(mins.length)
            result = sumMins / (mins.length * 1000 * 60)
        }

        //console.log(result)
        res = result
        return;
    })

    return res;
}


