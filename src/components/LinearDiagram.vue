<script lang="ts" setup>
import { computed, reactive } from 'vue';

const props = defineProps<{
  data: Record<string, number>
  format?: (value: number) => string | number
}>();

const normalizedData = computed((): Record<string, number> => {
  // Find the maximum value in the data object
  const maxValue = Math.max(...Object.values(props.data));

  // Normalize data by converting each value to a percentage of the maxValue
  return Object.fromEntries(
    Object.entries(props.data).map(([key, value]) => {
      const normalizedValue = (value / maxValue) * 100;
      return [key, normalizedValue];
    })
  );
});

const hoveredBar = reactive<{
  key: string | null
  position: [number, number]
}>({
  key: null,
  position: [0, 0]
});

const processHover = (ev: MouseEvent, key: string | null) => {
  hoveredBar.key = key;
  if (!key) return;

  hoveredBar.position = [ev.clientX + 5, ev.clientY - 35];

  // move position if it not fits in screen
  if (hoveredBar.position[0] + 170 > window.innerWidth) {
    hoveredBar.position[0] = window.innerWidth - 170;
  }
};
</script>

<template>
  <div class="linear-diagram">
    <Transition name="fade">
      <div
        v-if="hoveredBar.key"
        class="bar__value"
        :style="{ top: hoveredBar.position[1] + 'px', left: hoveredBar.position[0] + 'px' }"
      >
        {{ hoveredBar.key }}: {{ format ? format(data[hoveredBar.key]) : data[hoveredBar.key] }}
      </div>
    </Transition>
    <div
      v-for="(value, key) in normalizedData"
      :key="key"
      class="bar"
      :style="{ height: value + '%' }"
      @mousemove="processHover($event, key)"
      @mouseleave="processHover($event, null)"
    ></div>
  </div>
</template>

<style lang="scss" scoped>
.linear-diagram {
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  height: 100px;

  width: 100%;
}

.bar {
  background-color: #3498db;

  &:not(:last-child) {
    margin-right: 5px;
  }

  text-align: center;
  line-height: 50px;
  color: white;

  width: 100%;

  position: relative;

  &__value {
    z-index: 1;
    position: fixed;

    white-space: nowrap;

    padding: 10px 10px;

    font-size: 12px;
    line-height: 12px;
    color: white;

    background-color: #0c4165;
    border-radius: 8px;

    display: flex;
    flex-direction: column;
    justify-content: center;
  }
}
</style>
