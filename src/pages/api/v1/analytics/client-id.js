import { createHash } from "crypto";

const clientId = async (req, res) => {
  const { method, socket, headers } = req;

  if (method === "GET") {
    const clientIP = socket.remoteAddress;
    const host = headers.host;
    const userAgent = headers["user-agent"];
    const acceptLanguage = headers["accept-language"];

    const id = createHash("md5")
      .update(`${clientIP}|${host}|${userAgent}|${acceptLanguage}`)
      .digest("hex");

    res.status(200);
    res.json({ id: id });
  } else {
    res.status(405);
    res.setHeader("Allow", ["GET"]);
    res.end(`Method ${method} not allowed.`);
  }
};

export default clientId;
