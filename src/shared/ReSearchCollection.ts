export interface ReSearchCollection {
  name: string; //repo name, project, org based on what info is available
  project?: string;
  repo_guid?: string;
  organization: string;
  branch?: string;
  isDefault?: boolean;
  localRoot?: string;
  host?: string;
}
