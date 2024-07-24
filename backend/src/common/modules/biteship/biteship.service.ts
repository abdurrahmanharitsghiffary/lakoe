import { Injectable } from '@nestjs/common';
import {
  BiteshipOrder,
  BiteshipCreateOrderOptions,
  BiteshipSearchAreaMapOptions,
  GetShippingRateOptions,
  OrderResponse,
} from '../../types/biteship';
import { Tracking } from '../../types/biteship/tracking';
import { PublicTracking } from '../../types/biteship/public-tracking';
import { HttpService } from '@nestjs/axios';
import { AreaResponse } from 'src/common/types/biteship/area';
import { CourierPricingResponse } from 'src/common/types/biteship/shipping-rates';

@Injectable()
export class BiteshipService {
  constructor(private readonly httpService: HttpService) {}

  async getShippingRates(options: GetShippingRateOptions) {
    const response =
      await this.httpService.axiosRef.post<CourierPricingResponse>(
        '/rates/couriers',
        {
          ...options,
          couriers: options.couriers.join(','),
        },
      );
    console.log(response.data);
    return response.data;
  }

  async getAreaID(options: BiteshipSearchAreaMapOptions) {
    const response = await this.httpService.axiosRef.get<AreaResponse>(
      '/maps/areas',
      {
        params: options,
      },
    );

    return response.data;
  }

  async createOrder(options: BiteshipCreateOrderOptions) {
    const response = await this.httpService.axiosRef.post<BiteshipOrder>(
      '/orders',
      options,
    );

    return response.data;
  }

  async getOrder(id: string) {
    const response = await this.httpService.axiosRef.get<OrderResponse>(
      `/orders/${id}`,
    );
    return response.data;
  }

  async getTracking(id: string) {
    const response = await this.httpService.axiosRef.get<Tracking>(
      `/trackings/${id}`,
    );
    return response.data;
  }

  async getPublicTracking(waybillId: string, courierCode: string) {
    const response = await this.httpService.axiosRef.get<PublicTracking>(
      `/trackings/${waybillId}/couriers/${courierCode}`,
    );
    return response.data;
  }
}
