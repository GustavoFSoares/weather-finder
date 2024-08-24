<template>
  <div class="search-input">
    {{ places }}
    <v-text-field
      bg-color="white"
      prepend-inner-icon="mdi-magnify"
      label="Search for a city..."
      v-model="placeSearch"
    >
      <template #append-inner>
        <div class="search-input__append">
          <button class="search-input__cross-hair-button">
            <v-icon icon="mdi-crosshairs-gps" />
          </button>
        </div>
      </template>
    </v-text-field>
  </div>
</template>

<script lang="ts" setup>
const isLoading = ref<boolean>(false);
const placeSearch = ref<string>("Porto");
const places = ref();

async function handleLoadData() {
  isLoading.value = true;

  try {
    const data = await $fetch("/api/place", {
      key: "places",
      method: "GET",
      query: {
        search: placeSearch.value,
      },
    });

    places.value = data;
  } finally {
    isLoading.value = false;
  }
}

onServerPrefetch(async () => {
  await handleLoadData();
});

onBeforeMount(async () => {
  await handleLoadData();
});
</script>

<style lang="scss" scoped>
.search-input {
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
