export interface PaginatedResponse<T> {
  data: T[];
  meta: TMeta;
}

export type TMeta = {
  page: number;
  pageSize: number;
  itemCount: number;
  pageCount: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
};

export type SelectOption = {
  label: string;
  value: string;
};

export type TPaginatedOptions = {
  data: SelectOption[];
  meta: TMeta;
};

export enum EAlignment {
  Left = "left",
  Center = "center",
  Right = "right",
}

export enum EAlignmentExcludeCenter {
  Left = "left",
  Right = "right",
}

export enum ELinkType {
  External = "external",
  Internal = "internal",
}

export type TDataSearchParams = {
  page?: string;
  pageSize?: string;
  q?: string;
};

export enum ERefRelation {
  Events = "events",
  Blogs = "blogs",
  Teams = "teams",
  Courses = "courses",
  Jobs = "jobs",
  Gallery = "gallery"
}

export enum EOrder {
  Asc = "ASC",
  Desc = "DESC",
}