<template>
  <section>
    <CurrentWeather />
  </section>
</template>

<script lang="ts" setup>
import type CurrentWeather from "~/components/CurrentWeather.vue";
import { useLocationStore } from "~/store/location";

const { params } = useRoute();
const locationStore = useLocationStore();

async function handleLoadData() {
  // isLoading.value = true;

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
    // isLoading.value = false;
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
