export type Location = {
  lat: number | string;
  lon: number | string;
};

export interface ICityItem {
  label: string;
  location: Location;
}
