<template>
  <div>
    <h1>LatLon</h1>

    <!-- <p>{{ weather }}</p> -->
  </div>
</template>

<script lang="ts" setup>
import { useLocationStore } from "~/store/location";

const { params } = useRoute();
const locationStore = useLocationStore();

const weatherData = computed(() => locationStore.weather);

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
