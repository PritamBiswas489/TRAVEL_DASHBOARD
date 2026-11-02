import CredentialsProvider from 'next-auth/providers/credentials';
import { randomBytes } from 'crypto';

export const options = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email:', type: 'text', placeholder: 'Enter your email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        console.log("Authorizing user...");
        console.log(credentials);
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/admin/admin-login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              email: credentials?.email,
              password: credentials?.password
            })
            });

          if (!res.ok) {
            throw new Error('Invalid credentials');
          }

          const dataJson = await res.json();
          const user = dataJson?.user;

          console.log("User data:", user);

          // You can adjust this check based on your API response
          if (user && user.email) {
            return user;
          }
          return null;
        } catch (error) {
          throw new Error('Email or Password is not valid');
        }
      }
    })
  ],
  secret: 'kvwLrfri/MBznUCofIoRH9+NvGu6GqvVdqO3mor1GuA=',
  pages: {
    signIn: '/auth/login'
  },
  callbacks: {
    async signIn() {
      return true;
    },
    session: ({ session, token, user }) => {
      // Optionally, attach more user info from API response
      session.user = {
        ...session.user,
        ...user
      };
      return Promise.resolve(session);
    }
  },
  session: {
    maxAge: 24 * 60 * 60 * 1000,
    generateSessionToken: () => {
      return randomBytes(32).toString('hex');
    }
  }
};
