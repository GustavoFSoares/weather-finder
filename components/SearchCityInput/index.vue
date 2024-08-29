<template>
  <div class="search-city-input">
    <v-text-field
      class="search-city-input__element"
      bg-color="white"
      prepend-inner-icon="mdi-magnify"
      label="Search for a city..."
      :loading="isLoading"
      :model-value="placeSelected?.label || placeSearch"
      @update:focused="handleInputFocus"
      @update:model-value="handleInputChange"
    >
      <template #append-inner>
        <div class="search-city-input__append">
          <button
            v-if="!isLoading"
            class="search-city-input__cross-hair-button"
            @click="handleRequestLocation"
          >
            <v-icon icon="mdi-crosshairs-gps" />
          </button>

          <span v-else>
            <v-progress-circular size="24" color="primary" indeterminate />
          </span>
        </div>
      </template>

      <template #details>
        <InputCitiesList
          v-if="showCitiesList"
          class="search-city-input__cities-list"
          :cities="places"
          @select="handleSelectItem"
        />
      </template>
    </v-text-field>
  </div>
</template>

<script lang="ts" setup>
import type { ICityItem } from "~/interfaces/PlaceInterface";
import InputCitiesList from "./partials/InputCitiesList.vue";

const $emit = defineEmits<{
  "place-selected": [ICityItem];
  "request-location": [];
}>();

const placeSearch = ref<string>("");
const places = ref<ICityItem[]>([]);
const citiesIsOpen = ref<boolean>(false);
const isLoading = ref<boolean>(false);
const requestTimeout = ref<NodeJS.Timeout>();
const placeSelected = ref<ICityItem | null>(null);

const showCitiesList = computed(() => citiesIsOpen.value && placeSearch.value);

async function handleLoadData(search: string) {
  try {
    isLoading.value = true;
    placeSelected.value = null;
    citiesIsOpen.value = false;

    const data = await $fetch("/api/place", {
      key: "places",
      method: "GET",
      query: {
        search,
      },
    });

    places.value = data;
    citiesIsOpen.value = true;
  } catch (err) {
    console.error("Error trying loading cities");
  } finally {
    isLoading.value = false;
  }
}

function handleInputChange(search: string) {
  clearInterval(requestTimeout.value);

  requestTimeout.value = setTimeout(async () => {
    placeSearch.value = search;
  }, 700);
}

function handleInputFocus(inputFocused: boolean) {
  setTimeout(() => {
    citiesIsOpen.value = inputFocused;
  }, 200);
}

function handleSelectItem(item: ICityItem) {
  placeSelected.value = item;
  citiesIsOpen.value = false;

  $emit("place-selected", item);
}

function handleRequestLocation() {
  citiesIsOpen.value = false;
  $emit("request-location");
}

watch(
  () => placeSearch.value,
  () => {
    handleLoadData(placeSearch.value);
  }
);
</script>

<style lang="scss" scoped>
.search-city-input {
  &__element {
    @apply relative;

    :deep(.v-messages) {
      @apply hidden;
    }

    :deep(.v-input__details) {
      @apply p-0 m-0 tracking-normal;
    }
  }

  &__append {
    @apply h-[60%];

    @apply flex items-center gap-2;

    @apply text-gray-400;

    &::before {
      content: "";
      @apply h-full w-[2px];
      @apply bg-gray-300;
    }
  }

  &__cross-hair-button {
    @apply w-full h-full;
    @apply flex items-center;
  }

  &__cities-list {
    @apply w-full absolute top-14;
  }
}
</style>
