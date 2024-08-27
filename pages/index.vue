<template>
  <div>
    <SearchCityInput @place-selected="handleItemSelected" />

    <NuxtPage />
  </div>
</template>

<script lang="ts" setup>
import SearchCityInput from "~/components/SearchCityInput/index.vue";
import type { ICityItem } from "~/interfaces/PlaceInterface";

const $router = useRouter();

function handleItemSelected(item: ICityItem) {
  $router.push({
    name: "index-latLon",
    params: {
      latLon: `${item.location.lat},${item.location.lon}`,
    },
  });
}
</script>
