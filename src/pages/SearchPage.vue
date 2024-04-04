<script lang="ts" setup>
import { computed, ref } from 'vue'
import { useSearchStore } from '@/stores/search'
import { storeToRefs } from 'pinia'
import searchItemSmall from '@/components/SearchItemSmall.vue'

const searchStore = useSearchStore()
const { doSearch, setPage } = searchStore
const { resultObjects, lastQuery, currentPage, totalPages } = storeToRefs(searchStore)

const query = ref('')

const processSearchClick = () => {
  if (!query.value) {
    return
  }

  doSearch(query.value)
}

const pagesNearThis = computed(() => {
  const result = [];

  for(let i = currentPage.value - 2; i <= currentPage.value + 2; i++) {
    if (i < 1 || i > totalPages.value) {
      continue;
    }

    result.push(i);
  }

  if (result[0] > 1) {
    if(result[0] > 2) result.unshift('...');
    result.unshift(1);
  }

  const lastResult = Number(result[result.length - 1]);
  if (lastResult < totalPages.value) {
    if(lastResult < totalPages.value - 1) result.push('...');
    result.push(totalPages.value)
  }

  return result;
})

const processSetPage = (page: number | string) => {
  if(typeof page !== 'number') {
    return;
  }

  setPage(page)
}
</script>

<template>
  <Teleport to=".header__content">
    <div class="search-bar">
      <input v-model="query" placeholder="Query" type="text" @keyup.enter="processSearchClick">
      <button class="outline" @click="processSearchClick">Search</button>
    </div>
  </Teleport>

  <div v-if="Array.isArray(resultObjects)">
    <h2 class="search-page__title">Your search results for "{{ lastQuery }}" query</h2>
    <div class="search-page__item-container">
      <search-item-small
        v-for="result of resultObjects" :key="result.package.name"
        :item="result"
      >

      </search-item-small>
    </div>
    <div class="search-page__pages">
      <div
        v-for="page of pagesNearThis"
        :key="page"
        class="search-page__page"
        :class="{ active: page === currentPage }"
        @click="processSetPage(page)"
      >
          {{ page }}
      </div>

    </div>
  </div>

  <div v-else>
    <h2 class="search-page__title">Nothing yet</h2>
  </div>
</template>

<style lang="scss" scoped>
.search-bar {
  input {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }

  button {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;

    --btn-bg-color: var(--primary);
  }
}

.search-page {
  &__title {
    font-weight: bold;
  }

  &__item-container {
    margin-top: 1rem;

    border-top: var(--border-active) 1px solid;

    padding-top: 1rem;

    &:deep(.search-item) {
      padding: 0.5rem;

      &:not(:first-child) {
        border-top: var(--border) 1px solid;
      }
    }
  }

  &__pages {
    display: flex;
    justify-content: center;
  }

  &__page {
    margin-top: 20px;

    padding: 5px 10px;
    border: var(--border) 1px solid;

    &.active {
      background-color: var(--primary);
      color: black;
    }

    &:first-child {
      border-top-left-radius: 5px;
      border-bottom-left-radius: 5px;
    }

    &:last-child {
      border-top-right-radius: 5px;
      border-bottom-right-radius: 5px;
    }

    transition: background-color .2s ease-in-out;

    &:hover:not(.active) {
      background-color: var(--border);
    }
  }
}
</style>
