/* eslint-disable @typescript-eslint/no-explicit-any */

import { BASE_AUTH_API_URL } from "@/env";


type ApiResponse<T = any> = {
  message?: string;
  data?: T;
  code?: string;
};

async function request<T>(
  endpoint: string,
  options: RequestInit
): Promise<ApiResponse<T>> {
  try {
    const res = await fetch(`${BASE_AUTH_API_URL}${endpoint}`, {
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include", 
      ...options,
    });

    // Guard: only parse JSON if the response is actually JSON
    const contentType = res.headers.get("content-type") ?? "";
    if (!contentType.includes("application/json")) {
      throw new Error(`Unexpected response (${res.status}): ${res.statusText}`);
    }

    const data = await res.json();

    if (!res.ok) {
      const error = new Error(data.message || "Something went wrong") as Error & {
        code?: string;
        status?: number;
      };
      error.code = data.code;
      error.status = res.status;
      throw error;
    }

    return data;
  } catch (error: any) {
    const nextError = new Error(error.message) as Error & {
      code?: string;
      status?: number;
    };
    nextError.code = error.code;
    nextError.status = error.status;
    throw nextError;
  }
}

export async function signUp(payload: {
  email: string;
  password: string;
  phone: string;
  name: string;
  ref: string;
}) {
  return request("/sign-up", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}


export async function signIn(payload: {
  email: string;
  password: string;
}) {
  return request("/sign-in", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function forgotPassword(email: string) {
  return request("/forgot-password", {
    method: "POST",
    body: JSON.stringify({ email }),
  });
}

export async function resendOtp(email: string) {
  return request("/resend-otp", {
    method: "POST",
    body: JSON.stringify({ email }),
  });
}

export async function confirmForgotPassword(payload: {
  email: string;
  code: string;
  newPassword: string;
}) {
  return request("/confirm-forgot-password", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function verifyOtp(payload: {
  email: string;
  code: string;
}) {
  return request("/verify-otp", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

// Phone / Mobile OTP endpoints (backend must expose these routes)
export async function sendOtpToPhone(phone: string) {
  return request("/send-otp-phone", {
    method: "POST",
    body: JSON.stringify({ phone }),
  });
}

export async function verifyOtpPhone(payload: { phone: string; code: string }) {
  return request("/verify-otp-phone", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function resendOtpPhone(phone: string) {
  return request("/resend-otp-phone", {
    method: "POST",
    body: JSON.stringify({ phone }),
  });
}

export async function refreshToken(payload: {
  refreshToken: string;
  idToken: string;
}) {
  return request("/refersh-token", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function logout() {
  await request("/logout", {
    method: "POST",
  });

}
export async function session() {
  return request('/session' ,{
    method: "GET"
  })
}

export async function isUserLoggedIn(): Promise<boolean> {
  try {
    const res: any = await session();

    return res?.authenticated ?? false;
  } catch (error) {
    console.error("Auth check failed:", error);
    return false;
  }
}

export async function changePassword(payload: {
  previousPassword: string;
  proposedPassword: string;
}) {
  return request("/change-password", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}
