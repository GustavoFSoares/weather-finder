<template>
  <article class="current-weather">
    <div class="current-weather__title">
      <h1 class="current-weather__title-place">
        {{ currentWeather.city }}

        <v-progress-circular
          v-if="isLoading"
          size="24"
          color="white"
          indeterminate
        />
      </h1>
      <small class="current-weather__title-day">
        {{ weekDay }} {{ currentWeather.date }}
      </small>
    </div>

    <div class="current-weather__content">
      <aside class="weather">
        <div class="weather__icon">
          <WeatherIcon :name="currentWeather.weather" />
        </div>

        <div class="weather__value">
          <span class="weather__value-temperature">
            {{ currentWeather.temperature }}º
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
const isLoading = computed(() => locationStore.isLoading);
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

    &-place {
      @apply font-bold text-2xl;
    }

    &-day {
      @apply opacity-70 text-xs font-semibold;
    }
  }

  &__content {
    @apply flex flex-col;
    @apply md:flex-row;
  }

  &__divider {
    @apply bg-gray-200;

    @apply w-auto h-[1px];
    @apply md:w-[1px] md:h-auto;
  }

  aside {
    @apply w-full px-4 py-5;
  }

  &__detail {
    @apply grid grid-cols-3 gap-x-1 gap-y-5;
  }

  .weather {
    @apply flex justify-around items-center m-auto;

    &__icon {
      @apply text-7xl;

      span {
        font-size: 10px;
      }
    }

    &__value {
      @apply flex flex-col justify-center items-center gap-2 text-white;

      &-temperature {
        @apply text-5xl font-bold;
      }

      &-sun {
        @apply text-base font-bold opacity-70 capitalize;
      }
    }
  }

  .detail-item {
    @apply flex flex-col gap-1;

    &__value {
      @apply text-white text-lg text-opacity-80;
    }

    &__label {
      @apply text-white text-sm text-opacity-55 capitalize;
    }
  }
}
</style>
