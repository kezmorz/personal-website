import { BetaAnalyticsDataClient } from "@google-analytics/data";
import { getPageViews } from "@/lib/analytics";

const clientEmail = process.env.GOOGLE_ANALYTICS_CLIENT_EMAIL;
const privateKey = process.env.GOOGLE_ANALYTICS_PRIVATE_KEY;

const analyticsDataClient = new BetaAnalyticsDataClient({
  credentials: {
    client_email: clientEmail,
    private_key: privateKey.replace(/\\n/gm, "\n"),
  },
});

const pageViews = async (req, res) => {
  const { method, query } = req;

  if (method === "GET") {
    const startDate = query.start_date || "2022-01-01";
    const slug = query.slug;

    const [response] = await getPageViews({
      dataClient: analyticsDataClient,
      startDate,
      slug,
    });

    const views =
      response.rows.length > 0
        ? Number(response.rows[0].metricValues[0].value)
        : 0;

    res.status(200);
    res.json({ views: views });
  } else {
    res.status(405);
    res.setHeader("Allow", ["GET"]);
    res.end(`Method ${method} not allowed.`);
  }
};

export default pageViews;
