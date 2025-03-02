/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
// import CredentialsProvider from "next-auth/providers/credentials";

// export const baseUrl = "http://localhost:3000";
export const baseUrl = "https://b4-a5-portfolio.vercel.app";

export const authOptions: NextAuthOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    // CredentialsProvider({
    //   credentials: {
    //     email: { label: "Email", type: "text" },
    //     password: { label: "Password", type: "password" },
    //   },
    //   async authorize(credentials) {
    //     if (!credentials?.email || !credentials?.password) {
    //       throw new Error("Invalid credentials");
    //     }
    //     try {
    //       const response = await loginUser({
    //         email: credentials.email,
    //         password: credentials.password,
    //       });

    //       if (response?.success && response?.user) {
    //         return {
    //           id: response.user.id,
    //           name: response.user.name,
    //           email: response.user.email,
    //           accessToken: response.accessToken,
    //         };
    //       } else {
    //         throw new Error(response?.message || "Invalid credentials");
    //       }
    //     } catch (error) {
    //       console.log(error);
    //     }
    //     return null;
    //   },
    // }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user && "accessToken" in user) {
        token.accessToken = user.accessToken;
      }
      return token;
    },
    async session({ session, token }: { session: any; token: any }) {
      if (token.accessToken) {
        session.accessToken = token.accessToken;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};
