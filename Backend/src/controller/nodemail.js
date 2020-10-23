const mailer = require('nodemailer');

module.exports = (email, nome, mensagem, anexo) => {
    const smtpTransport = mailer.createTransport({
        host: 'smtp.mailtrap.io',
        port: 2525,
        auth: {
            user: '07ca2074eac847',
            pass: '7c5268436ad14e'
        }
    })

    const mail = {
        from: 'rendrikson16@gmail.com',
        to: email,
        subject: `${nome} te enviou uma mensagem`,
        text: mensagem,
        html: '<b>Mensagem em html</b>'
    }

    if(anexo){
        console.log(anexo);
        mail.attachments = [];
        mail.attachments.push({
            filename: anexo.originalname,
            content: anexo.buffer
        })
    }

    smtpTransport.sendMail(mail, (error, info)=>{
        if(error){
           console.log('error')
        }
        console.log('ok')
    });

}