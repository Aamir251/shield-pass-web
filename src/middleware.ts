import { withAuth } from "next-auth/middleware"

export default withAuth({
  callbacks: {
    authorized: ({ req, token }) => {
      return !!token // Only allow access if there is a valid token
    },
  },
})

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|signup|login|forgot-password).*)"
  ]
}
