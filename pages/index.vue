<template>
  <div>
    {{ selectedCity }}
    <SearchCityInput @place-selected="handleItemSelected" />
  </div>
</template>

<script lang="ts" setup>
import SearchCityInput from "~/components/SearchCityInput/index.vue";
import type { ICityItem } from "~/interfaces/PlaceInterface";

const selectedCity = ref<ICityItem | null>(null);
function handleItemSelected(item: ICityItem) {
  selectedCity.value = item;
}
</script>
