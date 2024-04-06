import type { SearchResult } from './npm.types';

interface SearchPayload {
  query: string
  page?: number
}

const API_URL = import.meta.env.VITE_NPMREG_API_URL;
export const PACKAGES_PER_PAGE = import.meta.env.VITE_PACKAGES_PER_PAGE;

export const searchForPackages = async (payload: SearchPayload): Promise<SearchResult> => {
  const { query, page = 1 } = payload;

  const pageOffset = (page - 1) * PACKAGES_PER_PAGE;

  const params = new URLSearchParams({
    text: query,
    size: PACKAGES_PER_PAGE.toString(),
    from: pageOffset.toString()
  });

  const url = `${API_URL}/-/v1/search?${params}`;
  const response = await fetch(url);

  return (await response.json()) as SearchResult;
};
