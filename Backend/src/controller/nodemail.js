const mailer = require('nodemailer');

module.exports = (email, nome, id, anexo) => {

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
        subject: `${nome} Email de confirmação Agende Now`,
        text: `${nome} Seja bem vindo ao Agende now!! 
                Para ativar sua conta acesse o link: http://localhost:3001/cofirmeEmail/${id}`,
        html: `<b>${nome} Seja bem vindo ao Agende now!!</b></br>
              <b>Para ativar sua conta acesse o link: <a href='http://localhost:3001/cofirmeEmail/${id}'>Confirmar email</a></b>`
    }

    if(anexo){
        console.log(anexo);
        mail.attachments = [];
        mail.attachments.push({
            filename: anexo.originalname,
            content: anexo.buffer
        })
    }

    return new Promise((resolve, reject) => {
        smtpTransport.sendMail(mail)
            .then(response => {
                smtpTransport.close();
                return resolve(response);
            })
            .catch(error => {
                smtpTransport.close();
                return reject(error);
            });
    })

}