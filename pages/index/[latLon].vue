<template>
  <section v-if="currentWather.temperature" class="weather-forecast">
    <div class="weather-forecast__save-location">
      <SaveLocationButton class="weather-forecast__save-location-element" />
    </div>

    <CurrentWeather />

    <WeatherForecast />

    <NextDaysForecast />
  </section>
</template>

<script lang="ts" setup>
import type SaveLocationButton from "~/components/SaveLocationButton.vue";
import type CurrentWeather from "~/components/CurrentWeather.vue";
import type WeatherForecast from "~/components/WeatherForecast/index.vue";
import type NextDaysForecast from "~/components/NextDaysForecast/index.vue";

import { useLocationStore } from "~/store/location";

type MetaData = {
  title?: string;
  description?: string;
};

const { params } = useRoute();
const locationStore = useLocationStore();

const currentWather = computed(() => locationStore.currentWeather);
const metaData = computed<MetaData>(() => {
  if (!currentWather.value?.temperature) {
    return {};
  }

  return {
    title: `${currentWather.value.temperature}º | ${currentWather.value.city}`,
    description: `Weather forecast for ${currentWather.value.city}`,
  };
});

const { data: weatherData, status } = await useAsyncData(
  "weather",
  () =>
    $fetch("/api/weather", {
      query: {
        latlon: params.latLon,
      },
    }),
  {
    watch: [() => params.latLon],
  }
);

locationStore.storeWeather(weatherData.value);

useSeoMeta({
  title: metaData.value.title,
  ogTitle: metaData.value.title,
  description: metaData.value.description,
  ogDescription: metaData.value.description,
});

watch(
  () => metaData.value,
  () => {
    useSeoMeta({
      title: metaData.value.title,
      ogTitle: metaData.value.title,
      description: metaData.value.description,
      ogDescription: metaData.value.description,
    });
  }
);

watch(status, () => {
  if (status.value !== "success") {
    locationStore.loading = status.value === "pending";

    return;
  }

  setTimeout(() => {
    locationStore.loading = false;
  }, 1000);
});
</script>

<style lang="scss" scoped>
.weather-forecast {
  &__save-location {
    @apply flex justify-end;

    &-element {
      @apply fixed top-0;
    }
  }
}
</style>
