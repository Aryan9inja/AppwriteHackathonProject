import type { Models } from "appwrite";

export interface SignUpFormData {
  name: string;
  email: string;
  password: string;
}

export interface LoginFormData {
  email: string;
  password: string;
}

export interface User {
  userId: string;
  username: string;
  name: string;
}

export interface UserDoc extends Models.DefaultRow {
  userId: string;
  username: string;
  name: string;
}
