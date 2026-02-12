import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import bcrypt from "bcryptjs";
import { prisma } from "./prisma";
import { sendWelcomeEmail, sendAdminNewUserNotification } from "./email";

export const { handlers, signIn, signOut, auth } = NextAuth({
  trustHost: true,
  session: { strategy: "jwt", maxAge: 30 * 24 * 60 * 60 },
  pages: {
    signIn: "/prihlaseni",
  },
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
      allowDangerousEmailAccountLinking: true,
    }),
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Heslo", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email) {
          return null;
        }

        const email = credentials.email as string;
        const password = credentials.password as string | undefined;

        const user = await prisma.user.findUnique({
          where: { email },
        });

        if (!user) {
          return null;
        }

        // With password → full auth (admin or regular user)
        if (password) {
          if (!user.password) return null;
          const isValid = await bcrypt.compare(password, user.password);
          if (!isValid) return null;
        } else {
          // Without password → only allow users with a PAID order
          const paidOrder = await prisma.order.findFirst({
            where: { userId: user.id, status: "PAID" },
          });
          if (!paidOrder) return null;
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
    async signIn({ user, account }) {
      if (account?.provider === "google") {
        try {
          const email = user.email;
          if (!email) return false;

          // Find or create user by email
          let dbUser = await prisma.user.findUnique({
            where: { email },
          });

          if (!dbUser) {
            dbUser = await prisma.user.create({
              data: {
                email,
                name: user.name ?? null,
                image: user.image ?? null,
              },
            });

            // Fire-and-forget: welcome email + admin notification for new Google user
            Promise.all([
              sendWelcomeEmail({ name: dbUser.name || "", email }),
              sendAdminNewUserNotification({ name: dbUser.name || "", email }),
            ]).catch((err) => console.error("Google sign-up email error:", err));
          }

          // Upsert the Account record for Google
          await prisma.account.upsert({
            where: {
              provider_providerAccountId: {
                provider: account.provider,
                providerAccountId: account.providerAccountId,
              },
            },
            create: {
              userId: dbUser.id,
              type: account.type,
              provider: account.provider,
              providerAccountId: account.providerAccountId,
              refresh_token: account.refresh_token ?? null,
              access_token: account.access_token ?? null,
              expires_at: account.expires_at ?? null,
              token_type: account.token_type ?? null,
              scope: account.scope ?? null,
              id_token: account.id_token ?? null,
            },
            update: {
              refresh_token: account.refresh_token ?? null,
              access_token: account.access_token ?? null,
              expires_at: account.expires_at ?? null,
            },
          });

          // Set the user id so JWT callback gets the right DB user
          user.id = dbUser.id;
        } catch (error) {
          console.error("Google signIn callback error:", error);
          return false;
        }
      }
      return true;
    },
    async jwt({ token, user, trigger }) {
      if (user || trigger === "update") {
        try {
          // Use user.id when available (sign-in), fall back to token for updates
          const userId = user?.id ?? (token.id as string) ?? token.sub;
          const email = user?.email ?? token.email;

          const dbUser = userId
            ? await prisma.user.findUnique({
                where: { id: userId },
                select: { id: true, role: true, gender: true, goal: true, onboardingCompleted: true },
              })
            : email
              ? await prisma.user.findUnique({
                  where: { email },
                  select: { id: true, role: true, gender: true, goal: true, onboardingCompleted: true },
                })
              : null;

          if (dbUser) {
            token.id = dbUser.id;
            token.role = dbUser.role;
            token.gender = dbUser.gender;
            token.goal = dbUser.goal;
            token.onboardingCompleted = dbUser.onboardingCompleted;

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
        session.user.onboardingCompleted = token.onboardingCompleted as boolean;
      }
      return session;
    },
  },
});
