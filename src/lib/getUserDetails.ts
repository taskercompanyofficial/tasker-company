import { API_URL } from "@/lib/apiEndPoints";

import axios from "axios";
import { User } from "@/types";
import { auth } from "auth";
import { signOut } from "next-auth/react";

interface UserDetailsWithToken {
  userDetails: User | null;
  token: string;
}

export async function getUserDetails(): Promise<UserDetailsWithToken> {
  const session = await auth();
  const token = session?.token;
  const signout = async () => {
    await signOut();
  };
  if (!token) {
    signout;
    return { userDetails: null, token: "" };
  }

  try {
    const response = await axios.get<User>(`${API_URL}/get/userDetails`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const userDetails = response.data;
    const status = userDetails?.status;
    return { userDetails, token };
  } catch (error) {
    console.error("Error fetching user details:", error);
    return { userDetails: null, token: "" }; // Return null if there was an error
  }
}
