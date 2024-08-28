<template>
  <div :title="`${mappedIcon}`">
    <component :is="'svgo-' + mappedIcon" filled />
    <small class="text-sm">{{ name }}</small>
  </div>
</template>

<script lang="ts" setup>
type WeatherIcons =
  | "clould"
  | "party-clould"
  | "rain-thunder"
  | "rainy"
  | "snowy"
  | "sunny";
type Props = {
  name: string;
};

const props = defineProps<Props>();

const mappedIcon = computed<WeatherIcons>(() => {
  switch (props.name) {
    case "clouds":
      return "clould";

    case "rain":
      return "rainy";

    case "clear":
    default:
      return "sunny";
  }
});
</script>
