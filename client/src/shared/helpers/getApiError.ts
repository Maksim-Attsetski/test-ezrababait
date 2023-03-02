export const getApiError = (error: any) =>
  error?.response?.data?.message || error?.message || error;
