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
import { Serialize } from '../../../interceptors/serialize.interceptor';
import { UserDto } from '../../dtos/user.dto';
import { AuthGuard } from 'src/currentUser/guards/auth.guard';
import { AdminGuard } from 'src/currentUser/guards/admin.guard';

@Controller('users')
@UseGuards(AuthGuard)
export class UsersController {
  constructor(
    private usersService: UsersService,
  ) {}

  @Patch('/:id')
  updateUser(@Param('id') userId: number, @Body() body: UpdateUserDto) {
    return this.usersService.updateUser(userId, body);
  }

  @Delete('/:id')
  deleteUserById(@Param('id') userId: number) {
    return this.usersService.deleteUserById(userId);
  }

  @UseGuards(AdminGuard)
  @Serialize(UserDto)
  @Get('/:id')
  findUserById(@Param('id') userId: number) {
    console.log('User Controller');
    return this.usersService.findUserById(userId);
  }

  @Get()
  findAllUsers() {
    return this.usersService.findAllUsers();
  }
}
