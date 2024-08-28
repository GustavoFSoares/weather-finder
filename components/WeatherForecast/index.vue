<template>
  <article class="weather-forecast">
    <h1 class="weather-forecast__title">Today's weather</h1>

    <div class="weather-forecast__list" v-if="currentForecast.length">
      <WeatherForecastItem
        v-for="(forecastItem, index) in currentForecast"
        :key="`forecast-item-${index}`"
        :temperature="forecastItem.temperature"
        :time="forecastItem.time"
        :weather="forecastItem.weather"
      />
    </div>

    <p v-else class="weather-forecast__no-item">No forecasts for today</p>
  </article>
</template>

<script lang="ts" setup>
import { useLocationStore } from "~/store/location";
import WeatherForecastItem from "./partials/WeatherForecastItem.vue";

const locationStore = useLocationStore();
const currentForecast = computed(() => locationStore.forecast);
</script>

<style lang="scss" scoped>
.weather-forecast {
  &__title {
    @apply text-white text-opacity-70 text-base;
  }

  &__list {
    @apply flex gap-3 mt-4 pb-2;
    @apply overflow-x-auto;

    &::-webkit-scrollbar {
      @apply h-2;
    }

    &::-webkit-scrollbar-track {
      @apply rounded-full;
    }

    &::-webkit-scrollbar-thumb {
      @apply bg-transparent rounded-full;
    }

    &:hover {
      &::-webkit-scrollbar-thumb {
        @apply bg-white bg-opacity-15;
      }
    }
  }

  &__no-item {
    @apply text-white text-opacity-90 text-center py-4 italic;
  }
}
</style>
