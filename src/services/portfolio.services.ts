import {
  DATABASE_ID,
  RESUME_BUCKET,
  TABLE_PORTFOLIOS,
} from "@/constants/appwrite";
import { storage, tables } from "@/lib/appwrite.config";
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

export const getPortfolioData = async (docId: string): Promise<PortfolioData> => {
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
