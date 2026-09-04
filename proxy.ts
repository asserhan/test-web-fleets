export { intlayerProxy as proxy } from "next-intlayer/proxy";

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)",
  ],
};
