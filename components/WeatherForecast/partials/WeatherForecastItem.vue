<template>
  <div class="weather-forecast-item">
    <h4 class="weather-forecast-item__time">{{ time }}</h4>

    <WeatherIcon class="weather-forecast-item__icon" :name="weather" />

    <h4 class="weather-forecast-item__temperature">{{ temperature }}º</h4>
  </div>
</template>

<script lang="ts" setup>
import WeatherIcon from "~/components/WeatherIcon.vue";

type Props = {
  temperature: number;
  time: string;
  weather: string;
};

defineProps<Props>();
</script>

<style lang="scss" scoped>
.weather-forecast-item {
  @apply min-w-[65px] h-[105px];
  @apply flex flex-col justify-around items-center;
  @apply bg-black bg-opacity-10 rounded-md;
  @apply text-white text-opacity-85;

  &__time,
  &__temperature {
    @apply text-sm;
  }

  &__icon {
    @apply text-2xl;
  }
}
</style>
