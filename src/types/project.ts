export type ProjectVisualType =
  | "storefront"
  | "webDesign"
  | "phone"
  | "dataGrid"
  | "database"
  | "portfolio"
  | "cloudboard";

export interface Project {
  title: string;
  slug: string;
  description: string;
  link?: string;
  githubLink?: string;
  glyphs: JSX.Element[];
  visualType: ProjectVisualType;
  inProgress?: boolean;
}
