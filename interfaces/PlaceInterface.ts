export interface IGeoItemResponse {
  name: string;
  local_names: {
    [key: string]: string;
  };
  lat: number;
  lon: number;
  country: string;
  state: string;
}

export interface ICityItem {
  label: string;
  location: {
    lat: number;
    lon: number;
  };
}
