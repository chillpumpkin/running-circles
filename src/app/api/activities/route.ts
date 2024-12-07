import { auth, clerkClient } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { userId } = await auth();
  if (!userId) {
    throw new Error("User not found");
  }

  const client = await clerkClient();
  const clerkResponse = await client.users.getUserOauthAccessToken(
    userId,
    "oauth_custom_strava"
  );

  const accessToken = clerkResponse.data[0]?.token || "";
  if (!accessToken) {
    return NextResponse.json(
      { message: "Access token not found" },
      { status: 401 }
    );
  }

  console.log("Access token: ", accessToken);

  const url = "https://www.strava.com/api/v3/athlete/activities";
  const stravaResponse = await fetch(url, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  const data = await stravaResponse.json();
  console.log("Response: ", data);
  return NextResponse.json(data);
}
