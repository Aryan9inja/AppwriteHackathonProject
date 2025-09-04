const sdk = require("node-appwrite");
const axios = require("axios");
const pdfParse = require("pdf-parse");
const { ID } = require("node-appwrite");

module.exports = async ({ req, res, log, error }) => {
  try {
    const client = new sdk.Client()
      .setEndpoint(process.env.APPWRITE_ENDPOINT)
      .setProject(process.env.APPWRITE_PROJECT_ID)
      .setKey(process.env.APPWRITE_API_KEY);

    const storage = new sdk.Storage(client);
    const tables = new sdk.TablesDB(client);

    // Log the received data for debugging
    log("Received request body:", req.body);
    log("Request body type:", typeof req.body);
    
    // Handle different possible formats of req.body
    let requestData;
    try {
      if (typeof req.body === 'string') {
        requestData = JSON.parse(req.body);
      } else if (typeof req.body === 'object') {
        requestData = req.body;
      } else {
        throw new Error("Invalid request body format");
      }
    } catch (parseError) {
      log("Error parsing request body:", parseError.message);
      return res.json({ error: "Invalid JSON in request body" }, 400);
    }

    const { userId, fileId } = requestData;
    log("Parsed userId:", userId);
    log("Parsed fileId:", fileId);
    
    if (!userId || !fileId) {
      return res.json({ error: "userId and fileId are required" }, 400);
    }

    const response = await storage.getFileDownload(
      process.env.RESUME_BUCKET_ID,
      fileId
    );

    const buffer = Buffer.isBuffer(response) ? response : Buffer.from(response);

    const pdfData = await pdfParse(buffer);

    const resumeText = pdfData.text;

    const prompt = `
    You are a professional resume parser. Extract detailed portfolio information from this resume and return ONLY valid JSON with no additional text. You MUST respond with ONLY valid JSON, no explanations, no markdown, no text before or after the JSON.

    Return the data in this exact structure:
    {
        "name": "Full name of the person",
        "email": "Email address",
        "phone": "Phone number if available",
        "location": "City, State/Country if available",
        "summary": "A brief professional summary",
        "skills": ["Skill 1", "Skill 2", ...],
        "experience": [
            {
                "title": "Job Title",
                "company": "Company Name",
                "location": "Job Location",
                "dates": "Start date - End date or Present",
                "description": "Description of responsibilities and achievements"
            }
        ],
        "education": [
            {
                "degree": "Degree Name",
                "institution": "Institution Name",
                "location": "Location",
                "dates": "Start date - End date",
                "gpa": "GPA if available"
            }
        ],
        "projects": [
            {
                "name": "Project Name",
                "description": "Project description",
                "technologies": ["Tech 1", "Tech 2", ...],
                "link": "Project URL if available"
            }
        ],
        "certifications": [
            {
                "name": "Certification Name",
                "issuer": "Issuing Organization",
                "date": "Date obtained"
            }
        ],
        "languages": ["Language 1", "Language 2", ...],
        "socialLinks": {
            "linkedin": "LinkedIn URL",
            "github": "GitHub URL",
            "portfolio": "Portfolio URL"
        }
    }

    Instructions:
    1. Leave fields empty or as empty arrays if information is not found
    2. Extract ALL relevant skills mentioned in the resume
    3. List items in reverse chronological order (most recent first)
    4. Format dates consistently (e.g., "Jan 2020 - Mar 2022")
    5. Return ONLY the JSON object, no other text like markdown tags

    Resume:
    ${resumeText}
    `;

    const aiResponse = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "meta-llama/llama-4-maverick:free",
        messages: [{ role: "user", content: prompt }],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const portfolioData =
      aiResponse.data.choices?.[0]?.message?.content || "{}";

    const newDoc = await tables.createRow({
      databaseId: process.env.DATABASE_ID,
      tableId: process.env.PORTFOLIO_TABLE_ID,
      rowId: ID.unique(),
      data: {
        userId,
        data: JSON.stringify(portfolioData),
        resumeId:fileId
      },
      permissions: [
        `write("user:${userId}")`,
        `read("user:${userId}")`,
        `update("user:${userId}")`,
        `delete("user:${userId}")`,
      ],
    });

    return res.json({ success: true, docId: newDoc.$id });
  } catch (err) {
    log("Function error:", err.message);
    log("Error stack:", err.stack);
    error(err.message);
    return res.json({ error: err.message }, 500);
  }
};
