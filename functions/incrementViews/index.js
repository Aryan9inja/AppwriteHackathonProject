const sdk = require("node-appwrite");

module.exports = async ({ req, res, log, error }) => {
  try {
    const client = new sdk.Client()
      .setEndpoint(process.env.APPWRITE_ENDPOINT)
      .setProject(process.env.APPWRITE_PROJECT_ID)
      .setKey(process.env.APPWRITE_API_KEY);

    const tables = new sdk.TablesDB(client);

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

    const portfolioId = req.query.portfolioId || requestData.portfolioId;
    const ip =
      req.headers["x-forwarded-for"] ||
      req.ip ||
      req.headers["x-appwrite-client-ip"];

    if (!portfolioId) {
      return res.json({ error: "Missing portfolioId" }, 400);
    }

    const twentyFourHoursAgo = new Date(
      Date.now() - 24 * 60 * 60 * 1000
    ).toISOString();

    const existing = await tables.listRows({
      databaseId: process.env.DATABASE_ID,
      tableId: process.env.PORTFOLIO_VIEWS_TABLE_ID,
      queries: [
        sdk.Query.equal("portfolioId", portfolioId),
        sdk.Query.equal("ip", ip),
        sdk.Query.greaterThan("timestamp", twentyFourHoursAgo),
      ],
    });

    if (existing.total > 0) {
      return res.json({ message: "View already counted", viewsUpdated: false });
    }

    await tables.createRow({
      databaseId: process.env.DATABASE_ID,
      tableId: process.env.PORTFOLIO_VIEWS_TABLE_ID,
      data: {
        portfolioId,
        ip,
        timestamp: new Date().toISOString(),
      },
    });

    const portfolio = await tables.getRow({
      databaseId: process.env.DATABASE_ID,
      tableId: process.env.PORTFOLIO_TABLE_ID,
      rowId: portfolioId,
    });
    await tables.updateRow({
      databaseId: process.env.DATABASE_ID,
      tableId: process.env.PORTFOLIO_TABLE_ID,
      rowId: portfolioId,
      data: {
        views: portfolio.views + 1,
      },
    });

    return res.json({ message: "View counted", viewsUpdated: true });
  } catch (error) {
    return res.json({ error: error.message }, 500);
  }
};
