import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import bcrypt from "bcryptjs";
import { prisma } from "./prisma";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  trustHost: true,
  session: { strategy: "jwt", maxAge: 30 * 24 * 60 * 60 },
  pages: {
    signIn: "/prihlaseni",
    newUser: "/registrace",
  },
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Heslo", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email as string },
        });

        if (!user || !user.password) {
          return null;
        }

        const isValid = await bcrypt.compare(
          credentials.password as string,
          user.password
        );

        if (!isValid) {
          return null;
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          image: user.image,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, trigger }) {
      if (user || trigger === "update") {
        try {
          // Use user.id when available (sign-in), fall back to token for updates
          const userId = user?.id ?? (token.id as string) ?? token.sub;
          const email = user?.email ?? token.email;

          const dbUser = userId
            ? await prisma.user.findUnique({
                where: { id: userId },
                select: { id: true, role: true, gender: true, goal: true },
              })
            : email
              ? await prisma.user.findUnique({
                  where: { email },
                  select: { id: true, role: true, gender: true, goal: true },
                })
              : null;

          if (dbUser) {
            token.id = dbUser.id;
            token.role = dbUser.role;
            token.gender = dbUser.gender;
            token.goal = dbUser.goal;

            // Auto-link orphaned orders (paid before registration)
            if (email) {
              await prisma.order.updateMany({
                where: { email, userId: null },
                data: { userId: dbUser.id },
              });
            }

            const paidOrder = await prisma.order.findFirst({
              where: { userId: dbUser.id, status: "PAID" },
              select: { plan: true },
              orderBy: { createdAt: "desc" },
            });
            token.hasPaid = !!paidOrder;
            token.paidPlan = paidOrder?.plan ?? null;
          } else {
            // Fallback: set defaults for new users
            if (user?.id) token.id = user.id;
            token.hasPaid = false;
            token.paidPlan = null;
          }
        } catch (error) {
          console.error("JWT callback error:", error);
          // Set safe defaults so auth doesn't break
          if (user?.id) token.id = user.id;
          token.hasPaid = token.hasPaid ?? false;
          token.paidPlan = token.paidPlan ?? null;
        }
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
        session.user.gender = token.gender as string | null;
        session.user.goal = token.goal as string | null;
        session.user.hasPaid = token.hasPaid as boolean;
        session.user.paidPlan = token.paidPlan as string | null;
      }
      return session;
    },
  },
});
