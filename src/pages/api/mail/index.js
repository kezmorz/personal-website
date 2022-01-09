import sendgrid from "@sendgrid/mail";

sendgrid.setApiKey(process.env.SENDGRID_API_KEY);

const mail = async (req, res) => {
  const { method } = req;

  if (method === "POST") {
    const { body: reqBody } = req;
    const { name, email, subject, message } = JSON.parse(reqBody);
    const payload = {
      to: "enterprise@mxrse.com",
      from: {
        name: "Personal Website Contact Form",
        email: "contact@cerimorse.com",
      },
      subject: subject,
      text: `Name: ${name} Email: ${email} Message: ${message}`,
    };

    try {
      const response = await sendgrid.send(payload);
      res.status(response[0].statusCode);
      res.end();
    } catch (error) {
      console.log(error);
      const { message, code } = error;
      res.status(code);
      res.json({ error: message });
      res.end();
    }
  } else {
    res.status(405);
    res.setHeader("Allow", ["GET"]);
    res.end(`Method ${method} not allowed.`);
  }
};

export default mail;
