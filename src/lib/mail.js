import sendgrid from "@sendgrid/mail";

const apiKey = process.env.SENDGRID_API_KEY;

sendgrid.setApiKey(apiKey);

export const sendMail = async ({ to, from, name, email, subject, message }) => {
  const payload = {
    to: to,
    from: from,
    templateId: "d-9591e5e9ee81442abfc42df800c2b41d",
    dynamicTemplateData: {
      name: name,
      email: email,
      subject: subject,
      message: message,
    },
  };

  return sendgrid.send(payload);
};
