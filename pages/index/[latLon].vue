<template>
  <section v-if="currentWather.temperature">
    <CurrentWeather />

    <WeatherForecast />

    <NextDaysForecast />
  </section>
</template>

<script lang="ts" setup>
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

watch(
  () => metaData.value,
  () => {
    useSeoMeta({
      title: metaData.value.title,
      ogTitle: metaData.value.title,
      description: metaData.value.description,
      ogDescription: metaData.value.description,
    });
  },
  { immediate: true }
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

onServerPrefetch(async () => {
  await handleLoadData();
});

onBeforeMount(async () => {
  await handleLoadData();
});
</script>

<style></style>
