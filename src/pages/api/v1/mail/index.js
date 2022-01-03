// import sendgrid from "@sendgrid/mail";

// sendgrid.setApiKey(process.env.SENDGRID_API_KEY);

const mail = async (req, res) => {
  const { method } = req;

  if (method === "POST") {
    res.status(200);
    res.end();
  } else {
    res.status(405);
    res.setHeader("Allow", ["GET"]);
    res.end(`Method ${method} not allowed.`);
  }
};

export default mail;
