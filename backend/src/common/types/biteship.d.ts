export type CourierCode =
  | 'gojek'
  | 'grab'
  | 'deliveree'
  | 'jne'
  | 'tiki'
  | 'ninja'
  | 'lion'
  | 'rara'
  | 'sicepat'
  | 'jnt'
  | 'idexpress'
  | 'rpx'
  | 'jdl'
  | 'wahana'
  | 'pos'
  | 'anteraja'
  | 'sap'
  | 'paxel'
  | 'mrspeedy'
  | 'borzo'
  | 'lalamove';

type BaseShippingOptions = {
  origin_area_id?: string;
  destination_area_id?: string;
  origin_latitude?: number;
  origin_longitude?: number;
  destination_latitude?: number;
  destination_longitude?: number;
  origin_postal_code?: number;
  destination_postal_code?: number;
};

export type GetShippingRateOptions = {
  type?: string;
  couriers: CourierCode[];
  items: {
    name: string;
    description?: string;
    sku?: string;
    value: number;
    quantity: number;
    weight: number;
    height?: number;
    length?: number;
    width?: number;
  }[];
} & BaseShippingOptions;

export type BiteshipSearchAreaMapOptions = {
  countries: string;
  input: string;
  type: 'single' | 'double';
};
