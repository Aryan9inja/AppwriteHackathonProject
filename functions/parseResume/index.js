import sdk from "node-appwrite";
import axios from "axios";
import pdfParse from "pdf-parse";

export default async ({ req, res, log, error }) => {
  try {
    const client = new sdk.Client()
      .setEndpoint(process.env.APPWRITE_ENDPOINT)
      .setProject(process.env.APPWRITE_PROJECT_ID)
      .setKey(process.env.APPWRITE_API_KEY);

    const storage = new sdk.Storage(client);
    const tables = new sdk.TablesDB(client);

    const { userId, fileId } = JSON.parse(req.body);
    if (!userId || !fileId) {
      return res.json({ error: "userId and fileId are required" }, 400);
    }

    const fileBuffer = await storage.getFileDownload(
      process.env.RESUME_BUCKET_ID,
      fileId
    );

    const pdfData = await pdfParse(Buffer.from(fileBuffer));
    const resumeText = pdfData.text;

    const prompt = `
    You are a professional resume parser. Extract detailed portfolio information from this resume and return ONLY valid JSON with no additional text.

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
    5. Return ONLY the JSON object, no other text

    Resume:
    ${resumeText}
    `;

    const aiResponse = await axios.get(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "meta-llama/llama-4-maverick:free",
          messages: [{ role: "user", content: prompt }],
        }),
      }
    );

    const result = await aiResponse.json();
    const portfolioData = result.choices?.[0]?.message?.content || "{}";

    const newDoc = await tables.createTable(
      process.env.DATABASE_ID,
      process.env.PORTFOLIO_TABLE_ID,
      "unique()",
      {
        userId,
        data: JSON.stringify(JSON.parse(portfolioData)),
      }
    );

    return res.json({ success: true, docId: newDoc.$id });
  } catch (err) {
    error(err.message);
    return res.json({ error: err.message }, 500);
  }
};
