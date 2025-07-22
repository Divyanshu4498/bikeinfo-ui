export interface AppContextInterface {
  bikeData?: Bike;
  setBikeData?: (x: Bike) => void;
  newBikeData?: Bike;
  setNewBikeData?: (x: Bike) => void;
  showApiError?: boolean;
  setShowApiError?: (x: boolean) => void;
  apiError: string;
  setApiError: (x: string) => void;
  apiDataParam?: ApiParam;
  setApiDataParam?: (x: ApiParam) => void;
  apiCountParam?: ApiParam;
  setApiCountParam?: (x: ApiParam) => void;
  totalCount?: number;
  setTotalCount?: (x: number) => void;
  inputLocation?: string;
  setInputLocation?: (x: string) => void;
  inputMiles?: number;
  setInputMiles?: (x: number) => void;
  showCount?: boolean;
  setShowCount?: (x: boolean) => void;
  showLoader?: boolean;
  setShowLoader?: (x: boolean) => void;
  showNoData?: boolean;
  setShowNoData?: (x: boolean) => void;
  getData?: () => void;
  getCount?: () => void;
}

export interface Bike {
  date_stolen?: number;
  description: string;
  frame_colors: string[];
  frame_model: string;
  id: number;
  is_stock_img: boolean;
  large_img: string;
  location_found: string;
  manufacturer_name: string;
  external_id?: any;
  registry_name?: any;
  registry_url?: any;
  serial: string;
  status: string;
  stolen: boolean;
  stolen_coordinates: number[];
  stolen_location: string;
  thumb: string;
  title: string;
  url: string;
  year?: number;
}

export interface CountApiParam {
  data: {
    non: number;
    stolen: number;
    proximity: number;
  };
}

export interface ApiParam {
  page?: number;
  per_page?: number;
  location: string;
  distance: number;
  stolenness: string;
}
