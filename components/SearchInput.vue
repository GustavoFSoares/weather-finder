<template>
  <div class="search-input">
    <v-text-field
      bg-color="white"
      prepend-inner-icon="mdi-magnify"
      label="Search for a city..."
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

<script lang="ts" setup></script>

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
