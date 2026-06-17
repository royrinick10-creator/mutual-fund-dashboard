
import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const username = "ivan";
  const password = "FundIQ2026@rinick";

  const basicAuth = req.headers.get("authorization");

  if (basicAuth) {
    const authValue = basicAuth.split(" ")[1];

    const [user, pass] = Buffer.from(
      authValue,
      "base64"
    )
      .toString()
      .split(":");

    if (
      user === username &&
      pass === password
    ) {
      return NextResponse.next();
    }
  }

  return new NextResponse(
    "Authentication required",
    {
      status: 401,
      headers: {
        "WWW-Authenticate":
          'Basic realm="Secure Dashboard"',
      },
    }
  );
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};

