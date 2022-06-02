import sendgrid from "@sendgrid/mail";

const apiKey = process.env.SENDGRID_API_KEY;

sendgrid.setApiKey(apiKey);

export const sendMail = async ({ to, from, subject, text }) => {
  const payload = {
    to: to,
    from: from,
    subject: subject,
    text: text,
  };

  return sendgrid.send(payload);
};
