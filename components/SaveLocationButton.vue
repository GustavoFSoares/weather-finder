<template>
  <button class="save-location-button" @click="handleStoreCity">
    save location
  </button>
</template>

<script lang="ts" setup>
import { useLocationStore } from "~/store/location";

const locationStore = useLocationStore();

function handleStoreCity() {
  const { location, city } = locationStore.currentWeather;

  locationStore.storeCity({
    label: city,
    location,
  });
}
</script>

<style lang="scss" scoped>
.save-location-button {
  @apply bg-yellow-600 px-2 pt-1 pb-2 rounded-b-lg;
  @apply font-bold text-xs uppercase tracking-wide;
  /* @apply; */
}
</style>
