export const getAllSearchParams = (searchParams: URLSearchParams) => {
  return Array.from(searchParams.entries())
    .map(([key, value]) => `${key}=${value}`)
    .join("&");
};
