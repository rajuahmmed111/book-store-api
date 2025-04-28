export type IFilterRequest = {
  searchTerm?: string | undefined;
  authorId?: number | undefined;
};

export type IPaginationOptions = {
  page?: number | undefined;
  limit?: number | undefined;
  sortBy?: string | undefined;
  sortOrder?: string | undefined;
};

export interface IPaginationResult<T> {
  meta: {
    page: number;
    limit: number;
    total: number;
  };
  data: T;
}
