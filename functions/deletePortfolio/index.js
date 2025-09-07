const { Client, TablesDB, Storage, Query } = require("node-appwrite");

module.exports = async ({ req, res, log, error }) => {
  try {
    const client = new Client()
      .setEndpoint(process.env.APPWRITE_ENDPOINT)
      .setProject(process.env.APPWRITE_PROJECT_ID)
      .setKey(process.env.APPWRITE_API_KEY);
  
    const tables = new TablesDB(client);
    const storage = new Storage(client);
  
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
  
    const portfolioId = requestData?.portfolioId;
    
    if (!portfolioId) {
      return res.json({ error: "Portfolio ID is required" }, 400);
    }

    let portfolio;
    try {
      portfolio = await tables.getRow({
        databaseId: process.env.DATABASE_ID,
        tableId: process.env.PORTFOLIO_TABLE_ID,
        rowId: portfolioId,
      });
    } catch (getError) {
      log("Portfolio not found:", getError.message);
      return res.json({ error: "Portfolio not found" }, 404);
    }

    try {
      await tables.deleteRows({
        databaseId: process.env.DATABASE_ID,
        tableId: process.env.PORTFOLIO_VIEWS_TABLE_ID,
        queries: [Query.equal("portfolioId", portfolioId)],
      });
    } catch (viewsError) {
      log("Warning: Failed to delete portfolio views:", viewsError.message);
    }

    const resumeId = portfolio.resumeId;
    if (resumeId) {
      try {
        await storage.deleteFile({
          bucketId: process.env.RESUME_BUCKET_ID,
          fileId: resumeId,
        });
      } catch (fileError) {
        log("Warning: Failed to delete resume file:", fileError.message);
      }
    }

    await tables.deleteRow({
      databaseId: process.env.DATABASE_ID,
      tableId: process.env.PORTFOLIO_TABLE_ID,
      rowId: portfolioId,
    });

    return res.json({ success: true, message: "Portfolio deleted successfully" }, 200);
    
  } catch (error) {
    log("Error deleting portfolio:", error.message);
    return res.json({ error: "Failed to delete portfolio" }, 500);
  }
};
