import { B2B_TENANT_ID, POWERBI_CLIENT_ID, POWERBI_CLIENT_SECRET, POWERBI_DATASET_ID, POWERBI_REPORT_ID } from "@/core/constants";
import axios from "axios";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const siteId = searchParams.get("siteId");

  if (!siteId) {
    return NextResponse.json({ error: "siteId is required" }, { status: 400 });
  }

  try {
    const accessToken = await getAccessToken();
    const embedToken = await getEmbedToken(accessToken);

    return NextResponse.json({ embedToken });
  } catch (error) {
    console.error("Error fetching Embed token:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

async function getAccessToken() {
  const b2bTenantID = B2B_TENANT_ID;
  const url = `https://login.microsoftonline.com/${b2bTenantID}/oauth2/token`;
  const params = new URLSearchParams();
  params.append("grant_type", "client_credentials");
  params.append("client_id", POWERBI_CLIENT_ID);
  params.append("client_secret", POWERBI_CLIENT_SECRET);
  params.append("resource", "https://analysis.windows.net/powerbi/api");

  const response = await axios.post(url, params, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });

  return response.data.access_token;
}

async function getEmbedToken(accessToken: string) {
  const datasetId = POWERBI_DATASET_ID;
  const reportId = POWERBI_REPORT_ID;
  const url = `https://api.powerbi.com/v1.0/myorg/GenerateToken`;
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${accessToken}`,
  };
  const postData = {
    accessLevel: "view",
    datasets: [{ id: datasetId }],
    reports: [{ id: reportId }],
  };

  try {
    const response = await axios.post(url, postData, { headers: headers });
    return response.data.token;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Error fetching Embed token: ${error.message}`);
    }
    throw new Error("An unknown error fetching Embed token.");
  }
}
