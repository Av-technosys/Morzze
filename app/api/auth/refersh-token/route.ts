/* eslint-disable @typescript-eslint/no-explicit-any */
import { COGNITO_CLIENT_ID } from "@/env";
import { cognito, generateSecretHash } from "@/helper/cognito";
import { InitiateAuthCommand } from "@aws-sdk/client-cognito-identity-provider";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export async function POST(req: Request) {
    const cookieStore = await cookies();

    const body = await req.json();
    const { refreshToken, idToken } = body;

    const decoded: any = jwt.decode(idToken);


    const username = decoded?.["cognito:username"] || decoded?.email;

    if (!refreshToken) {
        return NextResponse.json({ message: 'Refresh token is required.' }, { status: 400 });
    }

    if (!username) {
        return NextResponse.json({ message: "Unable to identify refresh user." }, { status: 400 });
    }

    try {
        const secretHash = await generateSecretHash(username);
        const command = new InitiateAuthCommand({
            AuthFlow: 'REFRESH_TOKEN_AUTH',
            ClientId: COGNITO_CLIENT_ID,
            AuthParameters: {
                REFRESH_TOKEN: refreshToken,
                SECRET_HASH: secretHash,
            },
        });

        const response = await cognito.send(command);
        const result = response?.AuthenticationResult;

        const newAccessToken = result?.AccessToken;
        const newIdToken = result?.IdToken;

        if (!newAccessToken || !newIdToken) {
            throw new Error("Invalid refresh response");
        }

        cookieStore.set("accessToken", newAccessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            path: "/",
        });

        cookieStore.set("idToken", newIdToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            path: "/",
        });

        return NextResponse.json({ response: response }, { status: 200 });
    } catch (err: any) {
        return NextResponse.json({ message: err.message }, { status: 500 });
    }
}
