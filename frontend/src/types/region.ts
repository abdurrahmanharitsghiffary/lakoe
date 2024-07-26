export interface Village {
  id: string;
  district_id: string;
  name: string;
}

export interface District {
  id: string;
  regency_id: string;
  name: string;
  alt_name: string;
  latitude: number;
  longitude: number;
  villages: Village[];
}

export interface Regency {
  id: string;
  province_id: string;
  name: string;
  alt_name: string;
  latitude: number;
  longitude: number;
  districts: District[];
}

export interface Province {
  id: string;
  name: string;
  alt_name: string;
  latitude: number;
  longitude: number;
  regencies: Regency[];
}
