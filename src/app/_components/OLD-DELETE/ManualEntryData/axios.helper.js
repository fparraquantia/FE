"use client";
import { BACKEND_URL } from "@/core/constants";
import axios from "axios";
export const apiVersion = 4;
export const axiosTimeout = 120000;

export async function get(endpoint, urlSearchParams) {
  const headers = { "Content-Type": "application/x-www-form-urlencoded" };
  let uri = BACKEND_URL + endpoint;

  if (urlSearchParams) {
    uri += "?" + urlSearchParams;
  }

  let response = { status: 500, data: [] };
  try {
    response = await axios.get(uri, { timeout: axiosTimeout, headers });
  } catch (exception) {
    response = exception;
  }

  if (
    response.headers &&
    response.headers["x-app-total-count"] === "undefined"
  ) {
    response.headers["x-app-total-count"] = undefined;
  }

  return response;
}

export async function post(endpoint, form) {
  const headers = { "Content-Type": "application/json" };
  let apiUrl = BACKEND_URL;

  if (form instanceof URLSearchParams) {
    headers["Content-Type"] = "application/x-www-form-urlencoded";
  }

  let response = { status: 500, data: [] };
  try {
    response = await axios.post(apiUrl + endpoint, form, {
      timeout: axiosTimeout,
      headers,
    });
  } catch (exception) {
    response = exception;
  }

  return response;
}

export async function customFilePost(endpoint, file, fileName) {
  const headers = { "Content-Type": file.type };
  const uriSafeFileName = encodeURIComponent(fileName);

  let response = { status: 200, data: [] };

  try {
    const loginResponse = await axios.post(
      `${endpoint}/login`,
      { username: "admin", password: "admin", recaptcha: "" },
      { timeout: axiosTimeout, headers: { "Content-Type": "application/json" } }
    );

    if (!isOk(loginResponse.status)) {
      return { status: 400 };
    }

    headers["X-Auth"] = loginResponse.data;
    response = await axios.post(
      `${endpoint}/resources/${uriSafeFileName}?override=false`,
      file,
      { headers }
    );
  } catch (exception) {
    response = exception;
  }

  response.uriSafeFileName = uriSafeFileName;
  return response;
}

export function isOk(statusCode) {
  return String(statusCode)[0] === "2";
}

export function getResponseJson(response) {
  switch (apiVersion) {
    case 1:
    case 2:
    default:
      return response.data.content;
    case 4:
      return response.data;
  }
}
