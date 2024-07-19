/**
 * The response object for the API.
 */
export type PublicTracking = {
  /**
   * The indication of whether this API has provided the desired response.
   * @type {boolean}
   * @required
   */
  success: boolean;

  /**
   * The brief explanation of this API response.
   * @type {string}
   * @required
   */
  message: string;

  /**
   * The returned object of this API response.
   * @type {string}
   * @required
   */
  object: string;

  /**
   * The ID of the tracking object.
   * @type {string}
   * @required
   */
  id: string;

  /**
   * The air waybill number of this shipment.
   * @type {string}
   * @required
   */
  waybill_id: string;

  /**
   * The courier information from this shipment.
   * @type {Courier}
   * @required
   */
  courier: Courier;

  /**
   * The shipment origin.
   * @type {Origin}
   * @required
   */
  origin: Origin;

  /**
   * The shipment destination.
   * @type {Destination}
   * @required
   */
  destination: Destination;

  /**
   * The tracking history.
   * @type {History[]}
   * @required
   */
  history: History[];

  /**
   * The link from courier to track this shipment.
   * @type {string | null}
   */
  link: string | null;

  /**
   * If this tracking belongs to Biteship's order, then the order ID will be shown.
   * @type {string | null}
   */
  order_id: string | null;

  /**
   * The shipment status. Must have value from one of the Tracking Status.
   * @type {string}
   * @required
   */
  status: string;
};

/**
 * The courier information from this shipment.
 */
export type Courier = {
  /**
   * The courier company.
   * @type {string}
   * @required
   */
  company: string;

  /**
   * The driver's name.
   * @type {string | null}
   * @deprecated
   */
  name?: string | null;

  /**
   * The driver's phone number.
   * @type {string | null}
   * @deprecated
   */
  phone?: string | null;

  /**
   * The driver's name.
   * @type {string | null}
   */
  driver_name?: string | null;

  /**
   * The driver's phone number.
   * @type {string | null}
   */
  driver_phone?: string | null;

  /**
   * The driver's photo url.
   * @type {string | null}
   */
  driver_photo_url?: string | null;

  /**
   * The driver's vehicle registration number.
   * @type {string | null}
   */
  driver_plate_number?: string | null;
};

/**
 * The shipment origin.
 */
export type Origin = {
  /**
   * The shipment origin contact person's name.
   * @type {string | null}
   */
  contact_name?: string | null;

  /**
   * The shipment pickup address.
   * @type {string | null}
   */
  address?: string | null;
};

/**
 * The shipment destination.
 */
export type Destination = {
  /**
   * The package receiver's name.
   * @type {string | null}
   */
  contact_name?: string | null;

  /**
   * The package receiver's address.
   * @type {string | null}
   */
  address?: string | null;
};

/**
 * The tracking history.
 */
export type History = {
  /**
   * The note of tracking history.
   * @type {string}
   * @required
   */
  note: string;

  /**
   * The datetime of tracking history.
   * @type {string}
   * @required
   */
  updated_at: string;

  /**
   * The shipment status. Must have value from one of the Tracking Status.
   * @type {string}
   * @required
   */
  status: string;

  /**
   * The service type of shipment.
   * @type {string}
   */
  service_type?: string;
};
