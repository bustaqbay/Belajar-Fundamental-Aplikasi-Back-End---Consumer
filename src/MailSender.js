const nodemailer = require('nodemailer');

class MailSender {
    constructor() {
        this._transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: {
                user: process.env.MAIL_ADDRESS,
                pass: process.env.MAIL_PASSWORD,
            },
            tls: {
                rejectUnauthorized: false
            },
        });
    }

    sendMail(targetEmail, content) {
        const { playlistId } = JSON.parse(content);
        const message = {
            from: 'Open Music',
            to: targetEmail,
            subject: 'Playlist Export',
            text: `Attached is the export of playlist id ${playlistId}`,
            attachments: [
                {
                    filename: `${playlistId}.json`,
                    content,
                },
            ],
        };

        return this._transporter.sendMail(message);
    }
}

module.exports = MailSender;