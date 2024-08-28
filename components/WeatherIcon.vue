<template>
  <component :is="mappedIcon" filled />
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

const mappedIcon = computed(() => {
  const prefix = "svgo-";

  let icon: WeatherIcons | null = null;

  switch (props.name) {
    case "clouds":
      icon = "clould";
      break;

    case "clear":
      icon = "sunny";
      break;

    default:
      icon = "sunny";
      break;
  }

  return prefix + icon;
});
</script>
