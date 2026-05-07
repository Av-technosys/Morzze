'use server'
import { BASE_API_URL } from "@/env";
import { cookies } from "next/headers";

export async function apiFetch(
  url: string,
  options: RequestInit = {}
) {
  const cookieStore = await cookies();

  const accessToken = cookieStore.get("accessToken")?.value;
  const refreshToken = cookieStore.get("refreshToken")?.value;
  const idToken = cookieStore.get("idToken")?.value;

  const makeRequest = async (token?: string) => {
    return fetch(`${BASE_API_URL}${url}`, {
      ...options,
      headers: {
        ...options.headers,
        Authorization: token ? `Bearer ${token}` : "",
      },
    });
  };

  let res = await makeRequest(accessToken);

  if (res.status === 401) {

    if (!refreshToken || !idToken) {
      return {
        status: res.status,
        data: await res.json(),
      };
    }

    const refreshRes = await fetch(
      `${BASE_API_URL}/auth/refersh-token`,
      {
        method: "POST",
        body: JSON.stringify({ refreshToken, idToken }),
      }
    );

    if (!refreshRes.ok) {
      return {
        status: res.status,
        data: await res.json(),
      };
    }

    const refreshData = await refreshRes.json();
    const newAccessToken = refreshData?.accessToken;

    if (!newAccessToken) {
      return {
        status: res.status,
        data: await res.json(),
      };
    }

    res = await makeRequest(newAccessToken);
  }

  return {
    status: res.status,
    data: await res.json(),
  };
}