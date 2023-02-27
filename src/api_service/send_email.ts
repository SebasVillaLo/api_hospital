import nodemailer from 'nodemailer';

const { EMAIL, EMAIL_PASS } = process.env;

export async function sendEmail({ recipient, subject, body }: { recipient: string, subject: string, body: string }) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: EMAIL,
      pass: EMAIL_PASS,
    },
  });

  const message = {
    from: EMAIL,
    to: recipient,
    subject: subject,
    text: body,
  };

  try {
    const info = await transporter.sendMail(message);
    console.log(`Correo enviado: ${info.messageId}`);
  } catch (error) {
    console.error(`Error al enviar correo: ${error}`);
  }
}
