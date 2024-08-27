<template>
  <article class="current-weather">
    <div class="current-weather__title">
      <h1 class="current-weather__title-place">{{ currentWeather.city }}</h1>
      <small class="current-weather__title-day"
        >{{ weekDay }} {{ currentWeather.date }}</small
      >
    </div>

    <div class="current-weather__content">
      <aside class="weather">
        <div class="weather__icon">{{ currentWeather.weather }}</div>

        <div class="weather__value">
          <span class="weather__value-temperature">
            {{ currentWeather.temperature }}
          </span>

          <span class="weather__value-sun">
            {{ currentWeather.weatherDescrition }}
          </span>
        </div>
      </aside>

      <hr class="current-weather__divider" />

      <aside class="current-weather__detail">
        <div class="detail-item" :key="item.key" v-for="item in weatherDetail">
          <span class="detail-item__value">{{ item.value }}</span>
          <span class="detail-item__label">{{ item.key }}</span>
        </div>
      </aside>
    </div>
  </article>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import { WeekDayDescription } from "~/interfaces/WeatherInterface";
import { useLocationStore } from "~/store/location";

const locationStore = useLocationStore();

const currentWeather = computed(() => locationStore.currentWeather);
const weekDay = computed(
  () => WeekDayDescription[currentWeather.value.weekDay]
);

const weatherDetail = computed<{ key: string; value: string }[]>(() => {
  const weather = currentWeather.value;

  return [
    { key: "high", value: weather.high + "º" },
    { key: "wind", value: weather.wind + "mph" },
    { key: "humidity", value: weather.humidity + "%" },
    { key: "low", value: weather.low + "º" },
    { key: "pressure", value: weather.pressure + "in" },
    { key: "precipitation", value: weather.precipitation + "%" },
  ];
});
</script>

<style lang="scss" scoped>
.current-weather {
  &__title {
    @apply text-white;
  }

  &__content {
    @apply flex;
  }

  &__divider {
    @apply w-[1px] h-auto bg-gray-200;
  }

  aside {
    @apply w-full;
  }

  &__detail {
    @apply grid grid-cols-3 gap-y-4;
  }

  .weather {
    @apply flex justify-center m-auto;

    &__value {
      @apply flex flex-col justify-center items-center gap-2 text-white;
    }
  }

  .detail-item {
    @apply flex flex-col gap-1;

    &__label {
      @apply text-white text-opacity-55 capitalize;
    }

    &__value {
      @apply text-white;
    }
  }
}
</style>
