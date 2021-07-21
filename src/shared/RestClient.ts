import { IRequestOptions, RestClient } from "typed-rest-client/RestClient";
import { RequestHandler, requestHandler } from "./RequestHandler";

import { IRequestHandler } from "azure-devops-node-api/interfaces/common/VsoBaseInterfaces";
import { WebApi } from "azure-devops-node-api";
import { getBearerHandler } from "azure-devops-node-api";

const MICROSOFT_AUTH_PROVIDER_ID = "microsoft";

async function getRestClient(baseUrl: string): Promise<RestClient> {
  const handler = requestHandler.getRequestHandler();
  const webApi = new WebApi(baseUrl, handler);
  return webApi.rest;
}

export async function request<T>(
  url: string,
  options?: IRequestOptions
): Promise<T> {
  const client = await getRestClient(url);
  try {
    const response = await client.get<T>(url, options);
    if (response.statusCode === 200) {
      return response.result as T;
    }

    const error = new Error(`Request resulted in a ${response.statusCode}`);
    error.name = "Failed Request";
    throw error;
  } catch (err) {
    const _err = err as { message: string };

    const error: Error = new Error();
    error.name = "NetworkException";
    error.message =
      _err?.message ??
      "Unable to contact the server. Please check your network connection and try again";

    throw error;
  }
}

export async function post<T>(
  url: string,
  body?: any,
  options?: IRequestOptions
): Promise<T> {
  const client = await getRestClient(url);
  try {
    const response = await client.create<T>(url, body, options);
    if (response.statusCode === 200) {
      return response.result as T;
    }

    const error = new Error(`Request resulted in a ${response.statusCode}`);
    error.name = "Failed Request";
    throw error;
  } catch (err) {
    const _err = err as { message: string };

    const error: Error = new Error();
    error.name = "NetworkException";
    error.message =
      _err?.message ??
      "Unable to contact the server. Please check your network connection and try again";

    throw error;
  }
}
