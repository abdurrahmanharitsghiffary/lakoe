import { SetMetadata } from '@nestjs/common';

export const TOKEN = 'ignore-transform-response';

export const IgnoreTransformResponse = () => SetMetadata(TOKEN, true);
