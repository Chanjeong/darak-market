import nodemailer from 'nodemailer';

export const sendVerificationEmail = async (email: string, token: number) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_APP_KEY
    }
  });

  const mailOptions = {
    from: process.env.GMAIL_USER,
    to: email,
    subject: 'Your Verification Code',
    text: `Your verification code is ${token}.`
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Verification email sent');
  } catch (error) {
    console.error('Error sending email:', error);
  }
};
