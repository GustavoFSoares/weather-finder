<template>
  <div class="search-city-input">
    <v-text-field
      v-model.trim="placeSearch"
      bg-color="white"
      prepend-inner-icon="mdi-magnify"
      label="Search for a city..."
      hide-details
      @update:focused="handleInputFocus"
      :loading="isLoading"
    >
      <template #append-inner>
        <div class="search-city-input__append">
          <button class="search-city-input__cross-hair-button">
            <v-icon icon="mdi-crosshairs-gps" />
          </button>
        </div>
      </template>
    </v-text-field>

    <InputCitiesList v-if="showCitiesList" :cities="places" />
  </div>
</template>

<script lang="ts" setup>
import type { ICityItem } from "~/interfaces/PlaceInterface";
import InputCitiesList from "./partials/InputCitiesList.vue";

const placeSearch = ref<string>("");
const places = ref<ICityItem[]>([]);
const isTyping = ref<boolean>(false);
const isLoading = ref<boolean>(false);
const citiesIsOpen = ref<boolean>(false);
const requestTimeout = ref<NodeJS.Timeout>();

const showCitiesList = computed(
  () => citiesIsOpen.value && placeSearch.value && !isTyping.value
);

async function handleLoadData(search: string) {
  try {
    isLoading.value = true;
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

function handleLazyInput(text: string) {
  clearInterval(requestTimeout.value);
  isTyping.value = true;

  requestTimeout.value = setTimeout(async () => {
    await handleLoadData(text);
    isTyping.value = false;
  }, 500);
}

function handleInputFocus(inputFocused: boolean) {
  citiesIsOpen.value = inputFocused;
}

watch(
  () => placeSearch.value,
  () => {
    handleLazyInput(placeSearch.value);
  }
);
</script>

<style lang="scss" scoped>
.search-city-input {
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
}
</style>
