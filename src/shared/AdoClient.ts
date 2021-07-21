import * as azdev from "azure-devops-node-api";

import { AdoSearchResponse } from "./AdoClientInterfaces";
import { ReSearchCollection } from "./ReSearchCollection";
import { WebApi } from "azure-devops-node-api";
import { post } from "./RestClient";
import { requestHandler } from "./RequestHandler";

const MICROSOFT_AUTH_PROVIDER_ID = "microsoft";

async function getConnection(organization: string): Promise<WebApi> {
  const orgUrl = `https://dev.azure.com/${organization}`;
  const handler = requestHandler.getRequestHandler();
  return new azdev.WebApi(orgUrl, handler);
}

export async function searchCode(
  collections: ReSearchCollection[],
  queryValue: string,
  scopeValue: string
): Promise<AdoSearchResponse> {
  const organization = collections[0].organization; //all collections will have same organization

  const url = `https://almsearch.dev.azure.com/${organization}/_apis/search/codesearchresults?api-version=5.0-preview.1`;
  const query = queryValue;
  const scope = scopeValue || "/";

  //Get unique fields from all passed in collections
  const projectSet = new Set<string>();
  const repoSet = new Set<string>();
  const branchSet = new Set<string>();

  collections.forEach((collection) => {
    if (collection.project) {
      projectSet.add(collection.project);
    }
    if (collection.repo_guid) {
      repoSet.add(collection.name);
    }
    if (collection.branch) {
      branchSet.add(collection.branch);
    }
  });

  //Build ADO search body object
  let projectFilter: { Project: string[] } | undefined = undefined;
  let repositoryFilter: { Repository: string[]; Path?: string[] } | undefined =
    undefined;
  let branchFilter: { Branch: string[] } | undefined = undefined;

  if (projectSet.size > 0) {
    projectFilter = {
      Project: Array.from(projectSet),
    };
  }

  if (repoSet.size > 0) {
    repositoryFilter = {
      Repository: Array.from(repoSet),
    };

    //ADO api only supports path filter when a single repository filter is specified
    if (repoSet.size === 1) {
      repositoryFilter.Path = [scope];
    }
  }

  if (repoSet.size === 1)
    if (branchSet.size > 0) {
      branchFilter = {
        Branch: Array.from(branchSet).map((name) =>
          name.replace("refs/heads/", "")
        ),
      };
    }

  const body = {
    searchText: query,
    $skip: 0,
    $top: 1000,
    filters: {
      ...projectFilter,
      ...repositoryFilter,
      ...branchFilter,
    },
    $orderBy: [],

    // By setting this to false, we avoid a performance hit because IncludeFacets not only
    // provides data on some cheap stuff (like the kind of hit it is - a macro, a comment, etc.)
    // but also on some fantastically expensive stuff (like how many hits it gets in other repo's).
    includeFacets: false,
  };

  const response = await post<AdoSearchResponse>(url, body);

  //ADO Api response includes (project/repo/branch information) but not the organization
  //Adding this allows the result table/file viewer/history pane to get all necessary information from
  //The search result.
  response.results = response.results.map((result) => {
    return {
      ...result,
      organization: organization,
    };
  });
  return response;
}
