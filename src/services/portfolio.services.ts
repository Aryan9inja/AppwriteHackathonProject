import {
  DATABASE_ID,
  DELETE_PORTFOLIO_FUNC,
  RESUME_BUCKET,
  TABLE_PORTFOLIOS,
} from "@/constants/appwrite";
import { functions, storage, tables } from "@/lib/appwrite.config";
import { PortfolioFormData } from "@/schemas/portfolio.schema";
import { PortfolioData, PortfolioDoc } from "@/types/types";
import { ID, Query } from "appwrite";

export const uploadResume = async (file: File) => {
  try {
    const uploadedResume = await storage.createFile({
      bucketId: RESUME_BUCKET,
      fileId: ID.unique(),
      file,
    });
    return uploadedResume.$id;
  } catch (error: unknown) {
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
        urlString: `/portfolio/${docId}`,
      },
    });
  } catch (error) {
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
    throw error;
  }
};

export const createPortfolioFromScratch = async (
  data: PortfolioFormData,
  templateId: string,
  portfolioName: string,
  userId: string
) => {
  try {
    const newId = ID.unique();
    const doc = await tables.createRow({
      databaseId: DATABASE_ID,
      tableId: TABLE_PORTFOLIOS,
      rowId: newId,
      data: {
        userId,
        data: JSON.stringify(data),
        templateId,
        portfolioName,
        urlString: `/portfolio/${newId}`,
      },
    });
    return doc.$id;
  } catch (error) {
    throw error;
  }
};

export const getUserPortfolios = async (userId: string) => {
  try {
    const portfolios = await tables.listRows({
      databaseId: DATABASE_ID,
      tableId: TABLE_PORTFOLIOS,
      queries: [Query.equal("userId", userId)],
    });
    return portfolios;
  } catch (error) {
    throw error;
  }
};

export const deletePortfolio = async (portfolioId: string) => {
  try {
    await functions.createExecution({
      functionId: DELETE_PORTFOLIO_FUNC,
      body: JSON.stringify({ portfolioId }),
    });
  } catch (error) {
    throw error;
  }
};
