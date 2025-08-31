import { RESUME_BUCKET } from "@/constants/appwrite";
import { storage } from "@/lib/appwrite.config";
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
