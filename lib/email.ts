import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

export async function sendEmail({ to, subject, html, attachments }: { to: string; subject: string; html: string; attachments?: any[] }) {
    const mailOptions = {
        from: `"CypherTech" <${process.env.EMAIL_USER}>`,
        to,
        subject,
        html,
        attachments,
    };

    return transporter.sendMail(mailOptions);
}
