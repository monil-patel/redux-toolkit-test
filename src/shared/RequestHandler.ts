import { IRequestHandler } from "azure-devops-node-api/interfaces/common/VsoBaseInterfaces";
import { getBearerHandler } from "azure-devops-node-api";

export class RequestHandler {
  getUserAlias(): Promise<string> {
    return new Promise<string>((resolve) => {
      resolve("");
    });
  }
  getRequestHandler(): IRequestHandler {
    return getBearerHandler("");
  }
}

export const requestHandler = new RequestHandler();
