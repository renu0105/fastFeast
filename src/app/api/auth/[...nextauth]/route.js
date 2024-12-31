import connectToDb from "@/app/middleware/connectToDb";
import UserModel from "@/app/models/UserModel";
import GoogleProvider from "next-auth/providers/google";
import CredentialProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import NextAuth from "next-auth";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        await connectToDb();
        const { email, password } = credentials;

        const user = await UserModel.findOne({ email });
        if (!user) {
          throw new Error("User not found");
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
          throw new Error("Invalid Credentials");
        }
        return { id: user.id, name: user.name, email: user.email };
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
      }
      return token;
    },

    async session({ session, token }) {
      session.user.id = token.id;
      session.user.name = token.name;
      session.user.email = token.email;

      try {
        await connectToDb();

        // Check if the user already exists
        const existingUser = await UserModel.findOne({ email: token.email });

        if (!existingUser) {
          const hashedPassword = await bcrypt.hash(token.id, 10);

          // Create a new user object
          const newUser = new UserModel({
            name: token.name,
            email: token.email,
            password: hashedPassword,
            createdAt: new Date(),
          });

          // Save the user to the database
          await newUser.save();
        }
      } catch (error) {
        console.log(error);
      }

      // 111030799603788799556

      return session;
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "auth/signin",
    signOut: "auth/signout",
  },
});

export { handler as GET, handler as POST };
