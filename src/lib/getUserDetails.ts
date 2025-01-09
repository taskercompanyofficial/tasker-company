import { API_URL } from "@/lib/apiEndPoints";

import axios from "axios";
import { User } from "@/types";
import { auth } from "auth";
import { signOut } from "next-auth/react";

interface UserDetailsWithToken {
  userDetails: any | null;
  token: string;
}

export async function getUserDetails(): Promise<UserDetailsWithToken> {
  const session = await auth();
  const token = session?.user?.token;
  const signout = async () => {
    await signOut();
  };
  if (!token) {
    return { userDetails: null, token: "" };
  }

  try {
    console.log("requesting user details on server");
    const response = await axios.get<User>(`${API_URL}/user`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const userDetails = response.data;
    return { userDetails, token };
  } catch (error) {
    console.error("Error fetching user details:", error);
    return { userDetails: null, token: "" }; // Return null if there was an error
  }
}
