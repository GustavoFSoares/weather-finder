import { IGeoItemResponse, ISearchedItem } from "../interfaces/PlaceInterface";

export default defineEventHandler(async (event) => {
  const { weatherApi, weatherApiKey } = useRuntimeConfig();

  const { search } = getQuery<{ search?: string }>(event);

  if (!search) {
    return null;
  }

  const data = await $fetch<IGeoItemResponse[]>(
    `${weatherApi}/geo/1.0/direct`,
    {
      params: {
        q: search,
        limit: 10,
        appid: weatherApiKey,
      },
    }
  );

  const mappedItems = data.map<ISearchedItem>((item) => {
    let label = `${item.name}, `;
    if (item.state) {
      label += `${item.state} - `;
    }

    label += `${item.country}`;

    return {
      label,
      location: {
        lat: item.lat,
        lon: item.lon,
      },
    };
  });

  return mappedItems;
});
