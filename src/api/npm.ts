interface SearchPayload {
  query: string;
  page?: number;
}

import type { NpmApi } from './npm.types';

const API_URL = 'https://registry.npmjs.org';

export const PACKAGES_PER_PAGE = 10;
export const searchForPackages = async (
  payload: SearchPayload
): Promise<NpmApi.SearchResult> => {
  const { query, page = 1 } = payload;

  const pageOffset = (page - 1) * PACKAGES_PER_PAGE;

  const params = new URLSearchParams({
    text: query,
    size: PACKAGES_PER_PAGE.toString(),
    from: pageOffset.toString()
  });

  const url = `${API_URL}/-/v1/search?${params}`;
  const response = await fetch(url);

  return await response.json() as NpmApi.SearchResult;
}
