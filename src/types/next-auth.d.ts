import NextAuth, { DefaultSession, DefaultUser } from "next-auth";
import { JWT } from "next-auth/jwt";

// Extend the User type
interface CustomUser extends DefaultUser {
  unique_id: string | null;
  phone: string | null;
  role: string | null;
  profile_image: string | null;
  email_verified_at: string | null;
  isVerified: string | null;
  status: string | null;
  notification: string | null;
  token?: string | null;
}

// Extend the Session type
interface CustomSession extends DefaultSession {
  token?: string | null;
}

// Extend the JWT type
interface CustomJWT extends JWT {
  token?: string | null;
}

declare module "next-auth" {
  interface Session extends CustomSession {}
  interface User extends CustomUser {}
}

declare module "next-auth/jwt" {
  interface JWT extends CustomJWT {}
}
