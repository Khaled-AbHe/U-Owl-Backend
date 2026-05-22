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
import { AuthGuard } from '../../../currentUser/guards/auth.guard';
import { AdminGuard } from '../../../currentUser/guards/admin.guard';
import { AuthService } from '../../services/auth/auth.service';
import { AssignLocationToAdminDto } from '../../dtos/assign-location-to-admin.dto';
import { SuperAdminGuard } from '../../../currentUser/guards/super-admin.guard';
import { ClientGuard } from '../../../currentUser/guards/client.guard';

@Controller('users')
@UseGuards(AuthGuard)
export class UsersController {
  constructor(
    private usersService: UsersService,
    private authService: AuthService,
  ) {}

  @UseGuards(SuperAdminGuard)
  @Patch('/assign-location/:id')
  assignLocationToAdmin(
    @Param('id') userId: number,
    @Body() dto: AssignLocationToAdminDto,
  ) {
    return this.usersService.assignLocationToAdmin(userId, dto.locationId);
  }

  @UseGuards(SuperAdminGuard)
  @Patch('/unassign-location/:id')
  unassignLocationToAdmin(@Param('id') id: number) {
    return this.usersService.unassignLocationToAdmin(id);
  }

  @Patch('/:id')
  updateUser(@Param('id') userId: number, @Body() body: UpdateUserDto) {
    return this.usersService.updateUser(userId, body);
  }

  @Delete('/:id')
  deleteUserById(@Param('id') userId: number) {
    return this.usersService.deleteUserById(userId);
  }

  @UseGuards(SuperAdminGuard)
  @Serialize(UserDto)
  @Get('/:id')
  findUserById(@Param('id') userId: number) {
    return this.usersService.findUserById(userId);
  }

  @UseGuards(SuperAdminGuard)
  @Get()
  findAllUsers() {
    return this.usersService.findAllUsers();
  }

  @Patch('/:id/changePassword/:newPassword')
  changePassword(
    @Param('id') userId: number,
    @Param('newPassword') newPassword: string,
  ) {
    return this.authService.changePassword(userId, newPassword);
  }
}
