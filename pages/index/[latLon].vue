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

const { data: weatherData } = await useFetch("/api/weather", {
  key: "weather",
  method: "GET",
  query: {
    latlon: params.latLon,
  },
});

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

async function handleLoadData() {
  locationStore.loading = true;

  try {
    const data = await $fetch("/api/weather", {
      key: "weather",
      method: "GET",
      query: {
        latlon: params.latLon,
      },
    });

    locationStore.storeWeather(data);
  } finally {
    setTimeout(() => {
      locationStore.loading = false;
    }, 400);
  }
}

onBeforeMount(async () => {
  await handleLoadData();
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
