import { defineStore } from 'pinia';
import { computed, ref } from 'vue';

import type { SearchResult as NpmSearchResult, SearchObject as NpmSearchObject } from '@/api/npm.types';
import { PACKAGES_PER_PAGE, searchForPackages } from '@/api/npm';

export const useSearchStore = defineStore('search', () => {
  const result = ref<NpmSearchResult>({} as NpmSearchResult);
  const resultObjects = computed<NpmSearchObject[]>(() => result.value.objects);

  // page logic

  const currentPage = ref<number>(1);
  const totalPages = computed<number>(() => Math.ceil(result.value.total / PACKAGES_PER_PAGE) || 1);

  // cache vars

  const lastQuery = ref<string>('');
  const cachedPages = new Map<number, NpmSearchResult>();

  const doSearch = async (query: string): Promise<boolean> => {
    if (lastQuery.value !== query) {
      cachedPages.clear();
      currentPage.value = 1;
    }

    if (cachedPages.has(currentPage.value)) {
      result.value = cachedPages.get(currentPage.value)!;

      lastQuery.value = query;
    } else {
      const searchResult = await searchForPackages({ query, page: currentPage.value });

      result.value = searchResult;
      cachedPages.set(currentPage.value, searchResult);

      lastQuery.value = query;
    }

    return true;
  };

  const setPage = async (page: number): Promise<boolean> => {
    if (page < 1 || page > totalPages.value) {
      return false;
    }

    currentPage.value = page;
    await doSearch(lastQuery.value);

    return true;
  };

  return {
    result,
    resultObjects,
    lastQuery,
    doSearch,
    currentPage,
    totalPages,
    setPage
  };
});
