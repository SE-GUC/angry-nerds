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
    sendEmail(from, to, subject, html){
        return new Promise ((resolve, reject) =>{
            transport.sendMail({ from, subject, to, html}, (err, info) => {
                if(err) reject(err)

                resolve(info)
            })
        })
    }
}