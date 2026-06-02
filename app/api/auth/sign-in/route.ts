/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import { authSingIn, cognitoResendConfirmationCode } from "@/helper/cognito";

export async function POST(req: Request) {
  const body = await req.json();
  const { email, password } = body;

  if (!email || !password) {
    return NextResponse.json(
      { message: "Email and password are required." },
      { status: 400 }
    );
  }

  try {
    const result = await authSingIn({ email, password });
    if (!result?.accessToken) {
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 401 }
      );
    }

    // 🍪 secure cookie (IMPORTANT)
    const response = NextResponse.json(
      {
        message: "Login successful",
        data: {
          accessToken: result.accessToken,
          idToken: result.idToken,
          refreshToken: result.refreshToken,
        },
      },
      { status: 200 }
    );
    response.cookies.set("accessToken", result.accessToken!, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      path: "/",
    });
    response.cookies.set("idToken", result.idToken!, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      path: "/",
    });
      response.cookies.set("refreshToken", result.refreshToken!, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      path: "/",
    });
    return response;

  } catch (error: any) {
    console.error("Login error:", error);

    // 🔥 Proper Cognito error handling (VERY IMPORTANT)

    if (error.name === "NotAuthorizedException") {
      return NextResponse.json(
        { message: "Incorrect email or password", code: error.name },
        { status: 401 }
      );
    }

    if (error.name === "UserNotConfirmedException") {
      await cognitoResendConfirmationCode({ email });

      return NextResponse.json(
        {
          message: "Please verify your email first. A new OTP has been sent.",
          code: error.name,
        },
        { status: 403 }
      );
    }

    if (error.name === "UserNotFoundException") {
      return NextResponse.json(
        { message: "User does not exist", code: error.name },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: error.message || "Login failed", code: error.name },
      { status: 500 }
    );
  }
}
