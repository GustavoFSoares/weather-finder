<template>
  <ul v-if="cities.length" class="input-cities-list">
    <li
      v-for="(city, cityIndex) in cities"
      :key="`${cityIndex}-${city.location.lat},${city.location.lon}`"
      class="input-cities-list__item"
    >
      {{ city.label }}
    </li>
  </ul>

  <ul v-else class="input-cities-list">
    <li class="input-cities-list__item--no-item">There's no items to show</li>
  </ul>
</template>

<script lang="ts" setup>
import type { ICityItem } from "~/interfaces/PlaceInterface";

type Props = {
  cities: ICityItem[];
};
const props = defineProps<Props>();
</script>

<style lang="scss" scoped>
.input-cities-list {
  @apply bg-white;

  @apply rounded-b-sm;

  &__item {
    @apply px-3 py-2;

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
