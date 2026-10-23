import { defineStore } from 'pinia';
import { computed, ref } from 'vue';

import type { SearchResult as NpmSearchResult, SearchObject as NpmSearchObject } from '@/api/npm.types';
import { PACKAGES_PER_PAGE, searchForPackages } from '@/api/npm';

export const useSearchStore = defineStore('search', () => {
  const result = ref<NpmSearchResult | null>(null);
  const resultObjects = computed<NpmSearchObject[] | undefined>(() => result.value?.objects);

  const isLoading = ref<boolean>(false);
  const error = ref<string | null>(null);

  // page logic

  const currentPage = ref<number>(1);
  const totalPages = computed<number>(() => Math.ceil((result.value?.total ?? 0) / PACKAGES_PER_PAGE) || 1);

  // cache vars

  const lastQuery = ref<string>('');
  const cachedPages = new Map<string, NpmSearchResult>();
  let lastRequestId = 0;

  const doSearch = async (query: string, page: number = 1): Promise<boolean> => {
    const requestId = ++lastRequestId;
    const cacheKey = `${page}:${query}`;

    error.value = null;

    let searchResult = cachedPages.get(cacheKey);

    if (!searchResult) {
      isLoading.value = true;

      try {
        searchResult = await searchForPackages({ query, page });
        cachedPages.set(cacheKey, searchResult);
      } catch {
        if (requestId === lastRequestId) {
          error.value = 'Search failed, please try again.';
          isLoading.value = false;
        }

        return false;
      }
    }

    // a newer search was started while this one was loading
    if (requestId !== lastRequestId) {
      return false;
    }

    result.value = searchResult;
    lastQuery.value = query;
    currentPage.value = page;
    isLoading.value = false;

    return true;
  };

  const setPage = async (page: number): Promise<boolean> => {
    if (page < 1 || page > totalPages.value) {
      return false;
    }

    return doSearch(lastQuery.value, page);
  };

  return {
    result,
    resultObjects,
    isLoading,
    error,
    lastQuery,
    doSearch,
    currentPage,
    totalPages,
    setPage
  };
});
