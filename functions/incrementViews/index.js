const { ID, Query, Client, TablesDB } = require("node-appwrite");

module.exports = async ({ req, res, log, error }) => {
  try {
    // Init Appwrite Client
    const client = new Client()
      .setEndpoint(process.env.APPWRITE_ENDPOINT)
      .setProject(process.env.APPWRITE_PROJECT_ID)
      .setKey(process.env.APPWRITE_API_KEY);

    const tables = new TablesDB(client);

    // Parse Request Body
    let requestData;
    try {
      if (typeof req.body === "string") {
        requestData = JSON.parse(req.body);
      } else if (typeof req.body === "object") {
        requestData = req.body;
      } else {
        throw new Error("Invalid request body format");
      }
    } catch (parseError) {
      log("Error parsing request body:", parseError.message);
      return res.json({ error: "Invalid JSON in request body" }, 400);
    }

    log("Request Data: ", requestData);

    // Extract params
    const portfolioId = req.query?.portfolioId || requestData?.portfolioId;
    const ip =
      req?.headers["x-forwarded-for"] ||
      req?.ip ||
      req?.headers["x-appwrite-client-ip"];

    log("PortfolioID", portfolioId);
    log("Client IP", ip);

    if (!portfolioId) {
      return res.json({ error: "Missing portfolioId" }, 400);
    }

    // Check last 24h views
    const twentyFourHoursAgo = new Date(
      Date.now() - 24 * 60 * 60 * 1000
    ).toISOString();

    const existing = await tables.listRows({
      databaseId: process.env.DATABASE_ID,
      tableId: process.env.PORTFOLIO_VIEWS_TABLE_ID,
      queries: [
        Query.equal("portfolioId", portfolioId),
        Query.equal("ip", ip),
        Query.greaterThan("timestamp", twentyFourHoursAgo),
      ],
    });

    if (existing.total > 0) {
      return res.json({ message: "View already counted", viewsUpdated: false });
    }

    // Insert new view
    await tables.createRow({
      databaseId: process.env.DATABASE_ID,
      tableId: process.env.PORTFOLIO_VIEWS_TABLE_ID,
      rowId: ID.unique(),
      data: {
        portfolioId,
        ip,
        timestamp: new Date().toISOString(),
      },
    });

    // Update portfolio views count
    const portfolio = await tables.getRow({
      databaseId: process.env.DATABASE_ID,
      tableId: process.env.PORTFOLIO_TABLE_ID,
      rowId: portfolioId,
    });

    const currentViews = portfolio?.views || 0;

    await tables.updateRow({
      databaseId: process.env.DATABASE_ID,
      tableId: process.env.PORTFOLIO_TABLE_ID,
      rowId: portfolioId,
      data: { views: currentViews + 1 },
    });

    return res.json({ message: "View counted", viewsUpdated: true });
  } catch (err) {
    log("Error in function:", err.message);
    log("Error details:", JSON.stringify(err, null, 2));
    return res.json({ error: err.message }, 500);
  }
};
