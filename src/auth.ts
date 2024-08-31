import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
export const { handlers: {GET, POST}, auth, signIn, signOut } = NextAuth(req => {
 if (req) {
  console.log(req) // do something with the request
 }
 return { providers: [ 
    Google({
        clientId: process.env.AUTH_GOOGLE_ID,
        clientSecret: process.env.AUTH_GOOGLE_SECRET,
 }) 
] 
}
})