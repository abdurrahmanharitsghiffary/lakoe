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
  items: Item[];
} & BaseShippingOptions;

export type BiteshipSearchAreaMapOptions = {
  countries: string;
  input: string;
  type: 'single' | 'double';
};

export type Coordinate = {
  /** Latitude of the location. */
  latitude: number;
  /** Longitude of the location. */
  longitude: number;
};

export type Item = {
  /** Name of your package. */
  name: string;
  /** A description of your package. You can share the color, the details or any that help describing your item. */
  description?: string;
  /** Item SKU if you have one. */
  sku?: string;
  /** The value of the item. */
  value: number;
  /** The total of the item. */
  quantity: number;
  /** The weight of the item in grams. */
  weight: number;
  /** The height of the item in centimeters. Item dimensions can affect the weight of your item which can cause a price different. */
  height?: number;
  /** The length of the item in centimeters. Item dimensions can affect the weight of your item which can cause a price different. */
  length?: number;
  /** The width of the item in centimeters. Item dimensions can affect the weight of your item which can cause a price different. */
  width?: number;
};

export type BiteshipCreateOrderOptions = {
  /** The name of the shipper. */
  shipper_contact_name?: string;
  /** The phone number of the shipper. */
  shipper_contact_phone?: string;
  /** The email of the shipper. */
  shipper_contact_email?: string;
  /** The organization of the shipper. */
  shipper_organization?: string;
  /** The name of the person in the pickup location. */
  origin_contact_name: string;
  /** The phone number of the person in the pickup location. */
  origin_contact_phone: string;
  /** The email of the person in the pickup location. */
  origin_contact_email?: string;
  /** Complete address of the pickup location. */
  origin_address: string;
  /** Additional information of the pickup location to ease pickup process. */
  origin_note?: string;
  /** Postal code of the pickup location. REQUIRED / OPTIONAL based on context. */
  origin_postal_code?: number;
  /** Coordinates of the pickup location. If you use an instant courier, you must use coordinate. REQUIRED / OPTIONAL based on context. */
  origin_coordinate?: Coordinate;
  /** Use area_id from Maps API. REQUIRED / OPTIONAL based on context. */
  origin_area_id?: string;
  /** Use location_id from Locations API. */
  origin_location_id?: string;
  /** Use the available_collection_method from Rates API. Default to pickup. */
  origin_collection_method?: 'pickup' | 'drop_off';
  /** The name of the person in destination location. */
  destination_contact_name: string;
  /** The phone number of the person in destination location. */
  destination_contact_phone: string;
  /** The email of the person in destination location. */
  destination_contact_email?: string;
  /** Complete address of the destination location. */
  destination_address: string;
  /** Additional information of the destination location to ease destination process. */
  destination_note?: string;
  /** Postal code of the destination location. REQUIRED / OPTIONAL based on context. */
  destination_postal_code?: number;
  /** Coordinates of the destination location. If you use an instant courier, you must use coordinate. REQUIRED / OPTIONAL based on context. */
  destination_coordinate?: Coordinate;
  /** Use area_id from Maps API. REQUIRED / OPTIONAL based on context. */
  destination_area_id?: string;
  /** Use location_id from Locations API. */
  destination_location_id?: string;
  /** State the COD Amount if you want to activate COD delivery. */
  destination_cash_on_delivery?: number;
  /** The COD disbursement window. */
  destination_cash_on_delivery_type?: '7_days' | '5_days' | '3_days';
  /** Proof of delivery feature. */
  destination_proof_of_delivery?: boolean;
  /** Notes for proof of delivery. REQUIRED if proof of delivery feature is activated. */
  destination_proof_of_delivery_note?: string;
  /** Shipping provider that will be used for this particular shipment. List of available courier can be found using Couriers API. */
  courier_company: string;
  /** Courier type based on the courier company used. Each type can be different for each company. Value of type can be found within the Rates API and Couriers API. */
  courier_type: string;
  /** The amount of the insurance value. This is optional if you want to insure your shipment. */
  courier_insurance?: number;
  /** Type of delivery order is now. Generates waybill instantly and pickup right away. */
  delivery_type: 'now' | 'scheduled';
  /** The delivery date. Format: “YYYY-MM-DD” */
  delivery_date?: string;
  /** The delivery time. Format: “HH:mm” */
  delivery_time?: string;
  /** Additional information for the shipment. */
  order_note?: string;
  /** You can insert any kind of data through this object for internal purposes. */
  metadata?: Record<string, any>;
  /** You can insert your internal order id here. Must be unique for each order id. */
  reference_id?: string;
  /** You can insert multiple custom tags (in string) for filtering your orders by tag later on. */
  tags?: string[];
  /** The list of items you will send for delivery. */
  items: Item[];
};

export type BiteshipOrder = {
  success: boolean;
  message: string;
  object: string;
  id: string;
  shipper: {
    name: string;
    email: string;
    phone: string;
    organization: string;
  };
  origin: {
    contact_name: string;
    contact_phone: string;
    coordinate: {
      latitude: number;
      longitude: number;
    };
    address: string;
    note: string;
    postal_code: number;
  };
  destination: {
    contact_name: string;
    contact_phone: string;
    contact_email: string;
    address: string;
    note: string;
    proof_of_delivery: {
      use: boolean;
      fee: number;
      note: string | null;
      link: string | null;
    };
    cash_on_delivery: {
      id: string;
      amount: number;
      fee: number;
      note: string | null;
      type: string;
    };
    coordinate: {
      latitude: number;
      longitude: number;
    };
    postal_code: number;
  };
  courier: {
    tracking_id: string;
    waybill_id: string | null;
    company: string;
    name: string | null; // Deprecated
    phone: string | null; // Deprecated
    driver_name: string | null;
    driver_phone: string | null;
    driver_photo_url: string | null;
    driver_plate_number: string | null;
    type: string;
    link: string | null;
    insurance: {
      amount: number;
      fee: number;
      note: string;
    };
    routing_code: string | null;
  };
  delivery: {
    datetime: string;
    note: string | null;
    type: string;
    distance: number;
    distance_unit: string;
  };
  reference_id: string | null;
  items: {
    name: string;
    description: string;
    sku: string | null;
    value: number;
    quantity: number;
    length: number;
    width: number;
    height: number;
    weight: number;
  }[];
  extra: any[];
  price: number;
  metadata: Record<string, unknown>;
  note: string;
  status: string;
};

export type OrderResponse = {
  success: boolean;
  message: string;
  object: string;
  id: string;
  short_id: string;
  shipper: Nullable<Shipper>;
  origin: Nullable<Location>;
  destination: Nullable<Location>;
  delivery: Nullable<Delivery>;
  voucher: Nullable<Voucher>;
  courier: Nullable<Courier>;
  reference_id: Nullable<string>;
  invoice_id: Nullable<string>;
  items: Nullable<Item[]>;
  extra: Nullable<any>;
  metadata: Nullable<any>;
  tags: string[];
  note: Nullable<string>;
  price: number;
  status: string;
  ticket_status: Nullable<string>;
};

type Shipper = {
  name: Nullable<string>;
  email: Nullable<string>;
  phone: Nullable<string>;
  organization: Nullable<string>;
};

type Location = {
  contact_name: Nullable<string>;
  contact_phone: Nullable<string>;
  contact_email?: Nullable<string>;
  address: Nullable<string>;
  note: Nullable<string>;
  postal_code: Nullable<number>;
  coordinate: Nullable<Coordinate>;
  proof_of_delivery?: Nullable<ProofOfDelivery>;
  cash_on_delivery?: Nullable<CashOnDelivery>;
};

type Coordinate = {
  latitude: Nullable<number>;
  longitude: Nullable<number>;
};

type ProofOfDelivery = {
  use: boolean;
  fee: number;
  note: Nullable<string>;
  link: Nullable<string>;
};

type CashOnDelivery = {
  id: Nullable<string>;
  amount: number;
  fee: number;
  note: Nullable<string>;
  type: Nullable<string>;
};

type Delivery = {
  datetime: Nullable<string>;
  note: Nullable<string>;
  type: Nullable<string>;
  distance: Nullable<number>;
  distance_unit: Nullable<string>;
};

type Voucher = {
  id: Nullable<string>;
  name: Nullable<string>;
  value: Nullable<string>;
  type: Nullable<string>;
};

type Courier = {
  tracking_id: Nullable<string>;
  waybill_id: Nullable<string>;
  company: Nullable<string>;
  history: Nullable<History[]>;
  link: Nullable<string>;
  name: Nullable<string>; // Deprecated
  phone: Nullable<string>; // Deprecated
  driver_name: Nullable<string>;
  driver_phone: Nullable<string>;
  driver_photo_url: Nullable<string>;
  driver_plate_number: Nullable<string>;
  type: Nullable<string>;
  shipment_fee: number;
  insurance: Nullable<Insurance>;
};

type History = {
  service_type: Nullable<string>;
  status: Nullable<string>;
  note: Nullable<string>;
  updated_at: Nullable<string>;
};

type Insurance = {
  amount: number;
  fee: number;
  note: Nullable<string>;
};

type Item = {
  name: Nullable<string>;
  description: Nullable<string>;
  sku: Nullable<string>;
  value: number;
  quantity: number;
  length: Nullable<number>;
  width: Nullable<number>;
  height: Nullable<number>;
  weight: Nullable<number>;
};

type Nullable<T> = T | null;
