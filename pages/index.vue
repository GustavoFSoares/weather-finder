<template>
  <div>
    <SearchCityInput @place-selected="handleItemSelected" />

    <NuxtPage />
  </div>
</template>

<script lang="ts" setup>
import SearchCityInput from "~/components/SearchCityInput/index.vue";
import type { ICityItem } from "~/interfaces/PlaceInterface";

type MetaData = {
  title: string;
  description: string;
};

const $router = useRouter();

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

function handleItemSelected(item: ICityItem) {
  $router.push({
    name: "index-latLon",
    params: {
      latLon: `${item.location.lat},${item.location.lon}`,
    },
  });
}
</script>
