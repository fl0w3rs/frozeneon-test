<script lang="ts" setup>
import { computed } from 'vue';

const props = defineProps<{
  data: Record<string, number>,
  format?: (value: number) => string | number
}>();

const normalizedData = computed(() => {
  const maxValue = Math.max(...Object.values(props.data));
  return Object.fromEntries(
    Object.entries(props.data).map(([key, value]) => [key, (value / maxValue) * 100])
  );
});
</script>

<template>
  <div class="linear-diagram">
    <div v-for="(value, key) in normalizedData" :key="key" class="bar" :style="{ height: value + '%' }">
      <div class="bar__value">
        {{key}}: {{ format ? format(data[key]) : data[key] }}
      </div>
    </div>
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
  margin-right: 5px;
  text-align: center;
  line-height: 50px;
  color: white;

  width: 100%;

  position: relative;

  &:hover {
    .bar__value {
      visibility: visible;
      opacity: 1;
    }
  }

  &__value {
    transition: opacity .2s ease-in-out;
    visibility: hidden;
    opacity: 0;

    z-index: 1;

    position: absolute;

    left: 50%;
    transform: translateX(-50%);

    top: -35px;

    height: 30px;
    width: 140px;
    max-height: 30px;
    font-size: 12px;

    background-color: #0c4165;
    color: white;

    overflow: hidden;

    display: flex;
    flex-direction: column;
    justify-content: center;
  }
}
</style>
