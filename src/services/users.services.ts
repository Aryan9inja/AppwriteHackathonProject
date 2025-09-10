import { ID, Query } from "appwrite";
import { account, tables } from "@/lib/appwrite.config";
import type {
  LoginFormData,
  SignUpFormData,
  User,
  UserDoc,
} from "@/types/types";
import { DATABASE_ID, TABLE_USERS } from "@/constants/appwrite";

export const registerUser = async (formData: SignUpFormData) => {
  try {
    await account.create({
      userId: ID.unique(),
      email: formData.email,
      password: formData.password,
      name: formData.name,
    });
    await account.createEmailPasswordSession({
      email: formData.email,
      password: formData.password,
    });
    const user = await account.get();
    return user;
  } catch (error: unknown) {
    throw error;
  }
};

export const loginUser = async (formData: LoginFormData) => {
  try {
    await account.createEmailPasswordSession({
      email: formData.email,
      password: formData.password,
    });
    const user = await account.get();
    return user;
  } catch (error: unknown) {
    throw error;
  }
};

export const logout = async () => {
  try {
    await account.deleteSession({ sessionId: "current" });
  } catch (error) {
    throw error;
  }
};

export const getUserData = async () => {
  try {
    const accountUser = await account.get();

    const docList = await tables.listRows<UserDoc>({
      databaseId: DATABASE_ID,
      tableId: TABLE_USERS,
      queries: [Query.equal("userId", accountUser.$id)],
    });

    if (docList.rows.length === 0) {
      const user: User = {
        userId: accountUser.$id,
        username: accountUser.email,
        name: accountUser.name,
      };

      return {
        user,
        userDoc: null,
      };
    }

    const userDoc: UserDoc = docList.rows[0];

    const user: User = {
      userId: userDoc.userId,
      username: userDoc.username,
      name: userDoc.name,
    };

    return {
      user,
      userDoc: userDoc,
    };
  } catch (error) {
    throw error; // ✅ Throw error instead of returning null
  }
};
