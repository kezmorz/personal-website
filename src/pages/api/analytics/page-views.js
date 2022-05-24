const pageViews = async (req, res) => {
  const { method, query } = req;

  if (method === "GET") {
    const startDate = query.start_date || "2022-01-01";
    const slug = query.slug;

    console.log(startDate);
    console.log(slug);

    res.status(200);
    res.json({ views: 1000 });
  } else {
    res.status(405);
    res.setHeader("Allow", ["GET"]);
    res.end(`Method ${method} not allowed.`);
  }
};

export default pageViews;
