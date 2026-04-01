import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from '../../services/users/users.service';
import { UpdateUserDto } from '../../dtos/update-user.dto';
// import { UseInterceptors, ClassSerializerInterceptor } from '@nestjs/common';
import {
  Serialize /*SerializeInterceptor*/,
} from '../../../interceptors/serialize.interceptor';
import { UserDto } from '../../dtos/user.dto';
// import { CurrentUserInterceptor } from './interceptors/currentUser.interceptor';
import { AuthGuard } from 'src/currentUser/guards/auth.guard';
import { AdminGuard } from 'src/currentUser/guards/admin.guard';

@Controller('users')
@UseGuards(AuthGuard)
// @UseInterceptors(CurrentUserInterceptor)
export class UsersController {
  constructor(
    private usersService: UsersService,
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
