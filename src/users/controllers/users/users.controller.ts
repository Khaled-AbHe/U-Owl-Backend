import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from '../../services/users/users.service';
import { UpdateUserDto } from '../../dtos/update-user.dto';
import { Serialize } from '../../../interceptors/serialize.interceptor';
import { UserDto } from '../../dtos/user.dto';
import { AuthGuard } from '../../../currentUser/guards/auth.guard';
import { AdminGuard } from '../../../currentUser/guards/admin.guard';
import { AuthService } from '../../services/auth/auth.service';
import { Dealer } from '../../dtos/create-dealer.dto';

@Controller('users')
@UseGuards(AuthGuard)
export class UsersController {
  constructor(
    private usersService: UsersService,
    private authService: AuthService,
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
    return this.usersService.findUserById(userId);
  }

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

  @Post('/dealer')
  createDealer(@Body() dealer: Dealer, @Req() req) {
    return this.usersService.createDealer(dealer, req.user);
  }
}
