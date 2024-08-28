<template>
  <div>
    <SearchCityInput
      @place-selected="handleItemSelected"
      @request-location="handleGetLocation"
    />

    <NuxtPage />
  </div>
</template>

<script lang="ts" setup>
import { useLocation } from "~/hooks/useLocation";

import SearchCityInput from "~/components/SearchCityInput/index.vue";
import type { ICityItem } from "~/interfaces/PlaceInterface";

type MetaData = {
  title: string;
  description: string;
};

const $router = useRouter();
const { getLocation } = useLocation();

const metaData = computed<MetaData>(() => ({
  title: `Weather Finder`,
  description: `Get weather forecast for your city`,
}));

useSeoMeta({
  title: metaData.value.title,
  ogTitle: metaData.value.title,
  description: metaData.value.description,
  ogDescription: metaData.value.description,
});

async function handleGetLocation() {
  const { lat, lon } = await getLocation();

  $router.push({
    name: "index-latLon",
    params: {
      latLon: `${lat},${lon}`,
    },
  });
}

function handleItemSelected(item: ICityItem) {
  $router.push({
    name: "index-latLon",
    params: {
      latLon: `${item.location.lat},${item.location.lon}`,
    },
  });
}
</script>
