import { sendMail } from "@/lib/mail";

const mail = async (req, res) => {
  const { method } = req;

  if (method === "POST") {
    const { body: reqBody } = req;
    const { name, email, subject, message } = JSON.parse(reqBody);

    try {
      const response = await sendMail({
        to: "enterprise@mxrse.com",
        from: {
          name: "Personal Website Contact Form",
          email: "contact@cerimorse.com",
        },
        name: name,
        email: email,
        subject: subject,
        message: message,
      });
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
    res.setHeader("Allow", ["POST"]);
    res.end(`Method ${method} not allowed.`);
  }
};

export default mail;
