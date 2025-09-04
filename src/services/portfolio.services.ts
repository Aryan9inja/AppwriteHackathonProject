import {
  DATABASE_ID,
  RESUME_BUCKET,
  TABLE_PORTFOLIOS,
} from "@/constants/appwrite";
import { storage, tables } from "@/lib/appwrite.config";
import { PortfolioFormData } from "@/schemas/portfolio.schema";
import { PortfolioData, PortfolioDoc } from "@/types/types";
import { ID } from "appwrite";

export const uploadResume = async (file: File) => {
  try {
    const uploadedResume = await storage.createFile({
      bucketId: RESUME_BUCKET,
      fileId: ID.unique(),
      file,
    });
    return uploadedResume.$id;
  } catch (error: unknown) {
    console.log("Resume Upload Failed", error);
    throw error;
  }
};

export const getPortfolioData = async (
  docId: string
): Promise<PortfolioData> => {
  try {
    const doc: PortfolioDoc = await tables.getRow({
      databaseId: DATABASE_ID,
      tableId: TABLE_PORTFOLIOS,
      rowId: docId,
    });
    let data = JSON.parse(doc.data);
    if (typeof data === "string") {
      data = JSON.parse(data);
    }
    return data;
  } catch (error) {
    console.log("Could not get data", error);
    throw error;
  }
};

export const savePortfolioData = async (
  docId: string,
  data: PortfolioFormData,
  templateId: string,
  portfolioName: string
) => {
  try {
    await tables.updateRow({
      databaseId: DATABASE_ID,
      tableId: TABLE_PORTFOLIOS,
      rowId: docId,
      data: {
        data: JSON.stringify(data),
        templateId,
        portfolioName,
      },
    });
  } catch (error) {
    console.error("Error saving Portfolio doc", error);
    throw error;
  }
};

export const fetchPortfolio = async (
  docId: string
): Promise<PortfolioFormData> => {
  try {
    const doc: PortfolioDoc = await tables.getRow({
      databaseId: DATABASE_ID,
      tableId: TABLE_PORTFOLIOS,
      rowId: docId,
    });
    let data = JSON.parse(doc.data);
    if (typeof data === "string") {
      data = JSON.parse(data);
    }
    return {
      ...data,
      selectedTemplate: doc.templateId,
    };
  } catch (error) {
    console.error("Error fetching Portfolio doc", error);
    throw error;
  }
};

export const getUserPortfolios = async (userId: string) => {};
