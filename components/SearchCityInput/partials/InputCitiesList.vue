<template>
  <ul v-if="cities.length" class="input-cities-list">
    <li
      v-for="(city, cityIndex) in cities"
      :key="`${cityIndex}-${city.location.lat},${city.location.lon}`"
      class="input-cities-list__item"
      @click="handleSelectItem(city)"
    >
      {{ city.label }}
    </li>
  </ul>

  <ul v-else class="input-cities-list">
    <li class="input-cities-list__item input-cities-list__item--no-item">
      There's no items to show
    </li>
  </ul>
</template>

<script lang="ts" setup>
import type { ICityItem } from "~/interfaces/PlaceInterface";

type Props = {
  cities: ICityItem[];
};
defineProps<Props>();

const $emit = defineEmits(["select"]);

function handleSelectItem(city: ICityItem) {
  $emit("select", city);
}
</script>

<style lang="scss" scoped>
.input-cities-list {
  @apply bg-white text-sm font-medium;

  @apply rounded-b-sm;

  &__item {
    @apply px-3 h-9;
    @apply flex items-center;

    @apply transition border-solid border-black border-t-[1px];
    @apply cursor-pointer;

    &:first-of-type {
      @apply border-t-0;
    }

    &:hover {
      @apply bg-gray-300;
    }

    &--no-item {
      @apply pointer-events-none italic;
    }
  }
}
</style>
