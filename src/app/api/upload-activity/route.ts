import { auth, clerkClient } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
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

  const formData = await request.formData();
  console.log("Form data: ", formData);

  const file = formData.get("file");
  if (!file || !(file instanceof File)) {
    return NextResponse.json({ message: "No file provided" }, { status: 400 });
  }

  const name = formData.get("name")?.toString() || "";
  const description = formData.get("description")?.toString() || "";
  const dataType = formData.get("data_type")?.toString() || "fit";

  const stravaFormData = new FormData();
  stravaFormData.append("file", file);
  stravaFormData.append("data_type", dataType);
  if (name) stravaFormData.append("name", name);
  if (description) stravaFormData.append("description", description);

  const stravaResponse = await fetch("https://www.strava.com/api/v3/uploads", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    body: stravaFormData,
  });

  const data = await stravaResponse.json();
  console.log("Response: ", data);

  return NextResponse.json(data);
}
