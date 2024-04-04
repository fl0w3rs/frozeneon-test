<script lang="ts" setup>
import type { NpmApi } from '@/api/npm.types'
import SearchItemModal from '@/components/SearchItemModal.vue'
import { ref } from 'vue'

const props = defineProps<{
  item: NpmApi.SearchObject,
  asComponent?: boolean
}>()

const processShowModal = (val: boolean) => {
  if (props?.asComponent) return

  showModal.value = val
}

const showModal = ref(false)
</script>

<template>
  <Teleport v-if="!asComponent" to=".modal__inner">
    <Transition name="fade">
      <search-item-modal v-if="showModal" :item="item" @close="processShowModal(false)" />
    </Transition>
  </Teleport>
  <div :class="{ 'as-component': asComponent }" class="search-item" @click="processShowModal(true)">
    <div class="search-item__info">
      <div class="search-item__info__title">
        {{ item.package.name }}
      </div>
      <div class="search-item__info__labels">
        <div class="search-item__info__labels__author">
          <img
            :src="`https://img.jsdelivr.com/github.com/${item.package.publisher?.username}.png`"
            alt="Avatar"
          > {{ item.package.publisher?.username }}
        </div>
        <div class="info-label">
          Version <span class="bold">{{ item.package.version }}</span>
        </div>
      </div>

      <div class="search-item__info__description">
        {{ item.package.description }}
      </div>

      <div
        v-if="Array.isArray(item.package.keywords) && item.package.keywords.length > 0"
        class="search-item__info__keywords"
      >
        <div
          v-for="keyword in item.package.keywords" :key="`keyword_${item.package.name}_${keyword}`"
          class="search-item__info__keywords__item"
        >
          {{ keyword }}
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.search-item {
  display: flex;
  justify-content: space-between;

  transition: all .2s ease-in-out;

  &:not(.as-component):hover {
    background-color: rgba(white, 0.1);
  }

  &__info {
    display: flex;
    flex-direction: column;
    gap: 5px;

    &__title {
      font-size: 1.25rem;
    }

    &__labels {
      display: flex;
      flex-wrap: wrap;
      flex-direction: row;
      align-items: center;
      gap: 0.5rem;

      &__author {
        display: flex;
        gap: 0.375rem;
        align-items: center;

        img {
          width: 20px;
          height: 20px;
          object-fit: cover;
          border-radius: 50%;
        }
      }
    }

    &__description {
      margin-top: 0.25rem;
    }

    &__keywords {
      display: flex;
      flex-wrap: wrap;
      flex-direction: row;
      gap: 0.25rem;

      margin-top: 0.5rem;

      &__item {
        display: inline-block;
        padding: 3px 6px;
        border: 1px solid var(--border);
        border-radius: 8px;
      }
    }
  }
}

.info-label {
  display: inline-block;
  padding: 3px 6px;
  background-color: var(--border);
  border-radius: 8px;

  .bold {
    font-weight: bold;
  }
}
</style>
