import { ApiBearerAuth } from '@nestjs/swagger';
import { BEARER_AUTH_NAME } from '../libs/swagger';

export const ApiJwtBearerAuth = () => ApiBearerAuth(BEARER_AUTH_NAME);
