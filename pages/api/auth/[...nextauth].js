import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    // ...add more providers here
  ],
  //   theme: { //default theme for login page
  //     logo: "https://links.papareact.com/sq0",
  //     brandColor: "#F13287",
  //     colorScheme: "auto",
  //   },
  pages: {
    signIn: "/auth/signin", // custom sigin page
  },
  callbacks: {
    async session({ session, token, user }) {
      // Customize the session object, object we get back on login
      // we can attach more things to the session
      session.user.name = session.user.name
        .split(" ")
        .join("")
        .toLocaleLowerCase(); // Taibu Haroub => taibuharoub

      session.user.uid = token.sub;

      return session;
    },
  },
});
