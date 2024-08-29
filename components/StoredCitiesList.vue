<template>
  <section class="stored-cities-list" v-if="storedCities.length">
    <h1 class="stored-cities-list__title">Saved cities:</h1>

    <ul class="stored-cities-list__list">
      <button
        class="stored-cities-list__item"
        v-for="(storedCity, storedCityIndex) in storedCities"
        :key="`stored-city-${storedCityIndex}`"
        @click="handleSelectCity(storedCity)"
      >
        {{ storedCity.label }}
      </button>
    </ul>
  </section>
</template>

<script lang="ts" setup>
import type { ICityItem } from "~/interfaces/PlaceInterface";

import { useLocationStore } from "~/store/location";

const $router = useRouter();
const locationStore = useLocationStore();

const storedCities = computed<ICityItem[]>(() => locationStore.storedCities);

function handleSelectCity(storedCity: ICityItem) {
  $router.push({
    name: "index-latLon",
    params: {
      latLon: `${storedCity.location.lat},${storedCity.location.lon}`,
    },
  });
}
</script>

<style lang="scss" scoped>
.stored-cities-list {
  &__title {
    @apply text-xl text-center text-white;
  }

  &__list {
    @apply my-6 grid gap-x-4 gap-y-2;
    @apply md:grid-cols-3;
  }

  &__item {
    @apply bg-black bg-opacity-10 rounded-md;
    @apply min-w-48 px-6 py-3 text-white text-opacity-70;
  }
}
</style>
