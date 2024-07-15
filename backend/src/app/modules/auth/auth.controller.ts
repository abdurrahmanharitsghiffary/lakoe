import { Controller } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SkipAuth } from 'src/common/decorators/skip-auth/skip-auth.decorator';

@Controller('auth')
@SkipAuth()
export class AuthController {
  constructor(private readonly authService: AuthService) {}
}
