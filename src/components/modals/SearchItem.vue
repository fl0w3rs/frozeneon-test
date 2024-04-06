<script lang="ts" setup>
import type { SearchObject as NpmSearchObject } from '@/api/npm.types';
import type * as JsdelivrApi from '@/api/jsdelivr.types';

import { computed, onBeforeMount, ref } from 'vue';
import { fetchStats, fetchVersionFiles, fetchVersions } from '@/api/jsdelivr';

import SearchItemPreview from '@/components/SearchItemPreview.vue';
import LinearDiagram from '@/components/LinearDiagram.vue';

defineEmits(['close']);

const { item } = defineProps<{
  item: NpmSearchObject
}>();

const packageStats = ref({} as JsdelivrApi.Stats);
const packageVersions = ref([] as JsdelivrApi.Version[]);
const packageVersionFiles = ref([] as JsdelivrApi.File[]);

const last5Versions = computed(() => {
  return packageVersions.value.slice(-5);
});

onBeforeMount(async () => {
  Promise.all([
    fetchStats(item.package.name),
    fetchVersions(item.package.name),
    fetchVersionFiles(item.package.name, item.package.version)
  ]).then(([stats, versions, versionFiles]) => {
    packageStats.value = stats;
    packageVersions.value = versions;
    packageVersionFiles.value = versionFiles;
  });
});

function formatBytes(bytes: number, decimals: number = 2) {
  if (!+bytes) return '0 Bytes';

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB'];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
}
</script>

<template>
  <div class="search-item-modal" @click.self="$emit('close')">
    <div class="search-item-modal__container">
      <div class="search-item-modal__close" @click="$emit('close')">
        <img alt="cross" src="https://img.icons8.com/emoji/48/cross-mark-emoji.png" />
      </div>

      <SearchItemPreview :as-component="true" :item="item" />

      <div class="search-item-modal__stats">
        <div class="stats__col">
          <div class="stats__col__title">Hits by dates</div>
          <LinearDiagram v-if="packageStats?.hits?.dates" :data="packageStats.hits.dates" />
        </div>
        <div class="stats__col">
          <div class="stats__col__title">Bandwidth by dates</div>
          <LinearDiagram
            v-if="packageStats?.hits?.dates"
            :data="packageStats.bandwidth.dates"
            :format="formatBytes"
          />
        </div>
      </div>

      <div class="search-item-modal__versions">
        <span class="versions__title">Last 5 versions</span>
        <div class="versions__list">
          <div
            v-for="version in last5Versions"
            :key="`version_${version.version}`"
            class="versions__item"
          >
            {{ version.version }}
          </div>
        </div>
      </div>

      <div class="search-item-modal__files">
        <span class="files__title">Files</span>
        <div class="files__list">
          <div v-for="file in packageVersionFiles" :key="`file_${file.name}`" class="files__item">
            {{ file.name }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import 'media';

.search-item-modal {
  width: 100%;
  height: 100%;

  padding: 0 20px;

  background-color: rgba(0, 0, 0, 0.5);

  display: grid;
  place-items: center;

  position: relative;

  &__container {
    width: 100%;
    max-width: 1000px;

    max-height: 80%;
    overflow-y: auto;

    padding: 10px;

    border: 1px solid var(--border-active);
    background-color: #222222;
    border-radius: 4px;

    position: relative;
  }

  &__close {
    position: absolute;
    top: 10px;
    right: 10px;

    cursor: pointer;

    img {
      width: 16px;
      height: 16px;
    }
  }

  &__stats {
    margin-top: 20px;

    display: grid;
    grid-template-columns: 1fr 1fr;

    @include media('max', 'md') {
      grid-template-columns: 1fr;
    }

    gap: 20px;

    .stats__col {
      display: flex;
      flex-direction: column;

      gap: 5px;

      &__title {
        font-size: 12px;
        font-weight: bold;
      }
    }
  }

  &__versions {
    margin-top: 20px;

    .versions {
      &__title {
        font-size: 14px;
        font-weight: bold;
      }

      &__list {
        display: flex;
        flex-direction: row;
        gap: 5px;
      }

      &__item {
        font-size: 12px;
        font-weight: bold;
        background-color: #888888;
        padding: 1px 3px;
        border-radius: 5px;
        color: black;
      }
    }
  }

  &__files {
    margin-top: 20px;

    .files {
      &__title {
        font-size: 14px;

        font-weight: bold;
      }
    }

    &__list {
      display: flex;
      flex-direction: column;
      gap: 1px;
    }
  }
}
</style>
