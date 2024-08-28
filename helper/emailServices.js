const nodemailer = require('nodemailer');

// SMTP configuration
const transporter = nodemailer.createTransport({
    host: 'mail.haritrust.org',
    port: 587,
    secure: false,
    auth: {
        // user: 'jake.hartmann91@ethereal.email',
        // pass: 'cpjKwBExjRUZdYTsWx'
        user: 'info@haritrust.org',
        pass: 'haritrust@1999'
    },
    tls: {
        rejectUnauthorized: false
    }
});
const sendMail = async (data) => {
    const from = "Demo App ";
    // Email options
    const mailOptions = {
        // from: 'info@haritrust.org', // Sender email address
        from: `"${from}" <info@haritrust.org>`, // Sender name and email address
        to: data.email, // Recipient email address
        subject: data.subject, // Email subject
        // text: data.body, // Plain text body
        html: data.body, // Plain text body
        // You can also use html: '<p>Hello, this is a test email!</p>' for HTML content
    };
    try {
        // Send the email
        const datatt = transporter.sendMail(mailOptions, (error, info1111111111) => {
            // console.log("error, info", error, info);
            if (error) {
                console.error('Error sending email:', error);
                // return errorResponseMessage(res, "Something went wrong: " + error);
            }
            // console.log('Email sent:', info);
            // res.setHeader('Content-Type', 'text/plain');
            return info1111111111;
            // return successResponseMessage(res, "Email Send Successfully!11111", info);
        });
        // console.log("Email Send Successfully!==>", datatt)
        return datatt;
        // return successResponseMessage(res, "Email Send Successfully!", datatt);
    } catch (error) {
        console.log("error", error);
        return error.message;
        // return errorResponseMessage(res, "Something went wrong: " + error.message);
    }
}

module.exports = { sendMail }