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
  