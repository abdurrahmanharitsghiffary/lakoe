import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto, createUserSchema } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ZodValidationPipe } from 'src/common/pipes/zod-validation/zod-validation.pipe';
import { Roles } from 'src/common/decorators/roles/roles.decorator';
import { ApiTags } from '@nestjs/swagger';
import { SkipAuth } from 'src/common/decorators/skip-auth/skip-auth.decorator';
import { ApiJwtBearerAuth } from 'src/common/decorators/jwt-bearer.decorator';

@Controller('users')
@ApiTags('Users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiJwtBearerAuth()
  @Post()
  @Roles(['ADMIN'])
  async create(
    @Body(new ZodValidationPipe(createUserSchema)) createUserDto: CreateUserDto,
  ) {
    return await this.usersService.create(createUserDto);
  }

  @Get()
  @SkipAuth()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  @SkipAuth()
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @ApiJwtBearerAuth()
  @Patch(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @Roles(['ADMIN'])
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @ApiJwtBearerAuth()
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @Roles(['ADMIN'])
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
