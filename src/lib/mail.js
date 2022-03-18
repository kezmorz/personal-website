import sendgrid from "@sendgrid/mail";

sendgrid.setApiKey(process.env.SENDGRID_API_KEY);

export const sendMail = async ({ to, from, subject, text }) => {
  const payload = {
    to: to,
    from: from,
    subject: subject,
    text: text,
  };

  return sendgrid.send(payload);
};
