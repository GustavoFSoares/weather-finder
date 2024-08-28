<template>
  <div class="next-forecast-item">
    <div class="item-topic item-topic--date">
      <h5 class="item-topic__value">{{ weekDay }}</h5>
      <h6 class="item-topic__label">{{ filteredDate }}</h6>
    </div>

    <div class="next-forecast-item__icon">
      <WeatherIcon :name="weather" />
    </div>

    <div
      class="item-topic"
      v-for="detailItem in weatherDetail"
      :key="`next-forecast-item--${detailItem.key}`"
    >
      <h5 class="item-topic__value">{{ detailItem.value }}</h5>
      <h6 class="item-topic__label">{{ detailItem.key }}</h6>
    </div>
  </div>
</template>

<script lang="ts" setup>
import WeatherIcon from "~/components/WeatherIcon.vue";
import type { IFormated3DaysForecast } from "~/interfaces/WeatherInterface";

type Props = IFormated3DaysForecast & {};

const props = defineProps<Props>();

const filteredDate = computed<string>(() => {
  const [month, day] = props.date.split("/");

  return [month, day].join("/");
});

const weatherDetail = computed<{ key: string; value: string }[]>(() => {
  return [
    { key: "low", value: props.low + "º" },
    { key: "high", value: props.high + "º" },
    { key: "rain", value: props.precipitation + "%" },
    { key: "wind", value: props.wind },
  ];
});
</script>

<style lang="scss" scoped>
.next-forecast-item {
  @apply w-full;
  @apply flex justify-between items-center;
  @apply bg-black bg-opacity-10 rounded-md;

  @apply pl-7 pr-4 py-4;

  &__icon {
    @apply text-2xl size-7 flex justify-center items-center;
  }

  .item-topic {
    @apply min-w-16 flex flex-col gap-[1px] items-center capitalize;

    &__value {
      @apply text-white text-opacity-80 text-base;
    }

    &__label {
      @apply text-white text-opacity-55 text-sm;
    }
  }
}
</style>
