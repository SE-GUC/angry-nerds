const nodemailer = require('nodemailer')
const config = require('../config/mailer')


const transport = nodemailer.createTransport({
    host:"smtp.gmail.com",
    port: 465,
   // secure:false,
    service: 'gmail',
    auth: {
        user: config.user,
        pass: config.pass
    },
    tls: {
        rejectUnauthorized: false
    }
})
 




module.exports = {
    sendEmail(from, to, subject, html, attachments){
        return new Promise ((resolve, reject) =>{
            transport.sendMail({ from, subject, to, html, attachments}, (err, info) => {
                if(err) {
                console.log(err)
                reject(err)
                }
                resolve(info)
                console.log(info)
            })
        })
    }
}