import NextAuth from 'next-auth'
import SpotifyProvider from 'next-auth/providers/spotify'

const scopes = [
  'user-read-email',
  'user-read-private',
  'user-library-read',
  'user-top-read',
  'user-read-recently-played',
  'user-read-playback-state',
  'user-modify-playback-state',
  'user-read-currently-playing',
  'user-read-recently-played',
  'user-follow-read',
  'playlist-read-private',
  'playlist-read-collaborative',
].join(',')

const params = {
  scope: scopes,
}

const queryParamString = new URLSearchParams(params).toString()

export default NextAuth({
  providers: [
    SpotifyProvider({
      authorization: `https://accounts.spotify.com/authorize?${queryParamString}`,
      clientId: process.env.SPOTIFY_CLIENT_ID as string,
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET as string,
    }),
  ],
  secret: process.env.JWT_SECRET,
  pages: {
    signIn: '/login',
  },
  // callbacks: {
  //   async jwt({ token }) {
  //     return token
  //   },
  // },
  callbacks: {
    async jwt({ token, account, user }) {
      if (account && user) {
        return {
          ...token,
          accessToken: account.access_token,
          refreshToken: account.refresh_token,
          userId: account.providerAccountId,
        }
      }

      return token
    },
    async session({ session, token }) {
      const theSession = session

      if (theSession.user) {
        theSession.accessToken = token.accessToken
        theSession.refreshToken = token.refreshToken
        theSession.username = token.userId
      }

      return theSession
    },
  },
})
