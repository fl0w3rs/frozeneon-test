import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

import type { NpmApi } from '@/api/npm.types'
import { PACKAGES_PER_PAGE, searchForPackages } from '@/api/npm'

export const useSearchStore = defineStore('search', () => {
  const result = ref({} as NpmApi.SearchResult);
  const resultObjects = computed(() => result.value.objects);

  // page logic

  const currentPage = ref(1);
  const totalPages = computed(() => Math.ceil(result.value.total / PACKAGES_PER_PAGE) || 1);

  // cache vars

  const lastQuery = ref('');
  const cachedPages = new Map<number, NpmApi.SearchResult>();

  const doSearch = async (query: string) => {
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
  }

  const setPage = async (page: number) => {
    if (page < 1 || page > totalPages.value) {
      return;
    }

    currentPage.value = page;
    await doSearch(lastQuery.value);

    return true;
  }

  return {
    result, resultObjects,
    lastQuery,
    doSearch,
    currentPage, totalPages, setPage,
  };
})
