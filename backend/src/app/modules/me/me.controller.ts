import { Controller, HttpCode, HttpStatus, Patch } from '@nestjs/common';

@Controller('me')
export class MeController {
  @Patch('stores')
  @HttpCode(HttpStatus.NO_CONTENT)
  async updateStore() {}
}
