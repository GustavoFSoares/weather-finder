<template>
  <article class="next-days-forecast">
    <h1 class="next-days-forecast__title">Next 3 days</h1>

    <div class="next-days-forecast__list" v-if="nextDaysForecast.length">
      <NextForecastItem
        v-for="(forecastItem, index) in nextDaysForecast"
        :key="`next-forecast-item-${index}`"
        v-bind="forecastItem"
      />
    </div>

    <p v-else class="next-days-forecast__no-item">No forecasts next days</p>
  </article>
</template>

<script lang="ts" setup>
import { useLocationStore } from "~/store/location";
import NextForecastItem from "./partials/NextForecastItem.vue";

const locationStore = useLocationStore();
const nextDaysForecast = computed(() => Object.values(locationStore.next3Days));
</script>

<style lang="scss" scoped>
.next-days-forecast {
  &__title {
    @apply text-white text-opacity-70 text-base;
  }

  &__list {
    @apply flex flex-col gap-2 mt-4 pb-2;
  }

  &__no-item {
    @apply text-white text-opacity-90 text-center py-4 italic;
  }
}
</style>
