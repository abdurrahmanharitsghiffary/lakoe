import { Injectable } from '@nestjs/common';
import axios, { isAxiosError } from 'axios';
import {
  BiteshipSearchAreaMapOptions,
  GetShippingRateOptions,
} from '../types/biteship';

const BITESHIP_API_URL = 'https://api.biteship.com';

const biteshipAxios = axios.create({
  baseURL: BITESHIP_API_URL + '/v1',
  headers: { Authorization: `${process.env.BITESHIP_API_KEY}` },
});

@Injectable()
export class BiteShipService {
  async getShippingRates(options: GetShippingRateOptions) {
    try {
      const response = await biteshipAxios.post('/rates/couriers', {
        ...options,
        couriers: options.couriers.join(','),
      });
      return response.data;
    } catch (err) {
      if (isAxiosError(err)) {
        return err?.response?.data;
      }
      return err;
    }
  }

  async getAreaID(options: BiteshipSearchAreaMapOptions) {
    const response = await biteshipAxios.get('/maps/areas', {
      params: options,
    });

    return response.data;
  }
}
