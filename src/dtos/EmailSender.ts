import * as nodemailer from 'nodemailer';


export const sendEmail = async (recipient: string, subject: string, url: string) => {

    try {
        const transporter = nodemailer.createTransport({
            host: "smtp.zoho.in",
            port: 465,
            auth: {
                user: 'nknittin16436@zohomail.in',
                pass: 'HQzMt2Z5y5Ag'
            }
        });

        const mailOptions = {
            from: '"Fred Foo 👻" <nknittin16436@zohomail.in>',
            to: recipient,
            // from: '"Fred Foo 👻" <foo@example.com>', // sender address
            // to: "bar@example.com, baz@example.com", // list of receivers
            subject: subject,
            text: url
        };

        await transporter.sendMail(mailOptions);
    } catch (error) {
        console.log(error)
    }

}
