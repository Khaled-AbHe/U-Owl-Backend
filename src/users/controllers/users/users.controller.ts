import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Session,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UsersService } from '../../services/users/users.service';
import { CreateUserDto } from '../../dtos/create-user.dto';
import { UpdateUserDto } from '../../dtos/update-user.dto';
// import { UseInterceptors, ClassSerializerInterceptor } from '@nestjs/common';
import {
  Serialize /*SerializeInterceptor*/,
} from '../../../interceptors/serialize.interceptor';
import { UserDto } from '../../dtos/user.dto';
import { AuthService } from '../../services/auth/auth.service';
import { CurrentUser } from '../../../currentUser/decorators/current-user.decorator';
import { User } from '../../entities/user.entity';
// import { CurrentUserInterceptor } from './interceptors/currentUser.interceptor';
import { AuthGuard } from 'src/currentUser/guards/auth.guard';
import { AdminGuard } from 'src/currentUser/guards/admin.guard';
import { SignInUserDto } from '../../dtos/signin-user.dto';
import { CartsService } from 'src/carts/services/cart/carts.service';
import { Vehicle } from 'src/vehicles/entities/vehicle.entity';
import { Client } from '../../entities/client.entity';

@Controller('users')
@UseGuards(AuthGuard)
// @UseInterceptors(CurrentUserInterceptor)
export class UsersController {
  constructor(
    private usersService: UsersService,
    private cartsService: CartsService,
  ) {}

  @Patch('/:id')
  updateUser(@Param('id') id: string, @Body() body: UpdateUserDto) {
    return this.usersService.updateUser(parseInt(id), body);
  }

  @Delete('/:id')
  deleteUserById(@Param('id') id: string) {
    return this.usersService.deleteUserById(parseInt(id));
  }

  // @UseInterceptors(ClassSerializerInterceptor)
  // @UseInterceptors(new SerializeInterceptor(UserDto))
  @UseGuards(AdminGuard)
  @Serialize(UserDto)
  @Get('/:id')
  findUserById(@Param('id') id: string) {
    console.log('User Controller');
    return this.usersService.findUserById(parseInt(id));
  }

  @Get()
  findAllUsers() {
    return this.usersService.findAllUsers();
  }
}
