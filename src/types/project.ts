export type ProjectVisualType =
  | "storefront"
  | "webDesign"
  | "phone"
  | "dataGrid"
  | "database"
  | "portfolio"
  | "cloudboard";

export type Project = {
  title: string;
  slug: string;
  glyphs: JSX.Element[];
  description: string;
  link: string;
  visualType: ProjectVisualType;
  inProgress?: boolean;
};
