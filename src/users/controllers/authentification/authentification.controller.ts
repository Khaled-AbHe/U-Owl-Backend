import {
  Body,
  Controller,
  Get,
  Post,
  Session,
  UseGuards,
} from '@nestjs/common';
import { CurrentUser } from '../../../currentUser/decorators/current-user.decorator';
import { AuthGuard } from '../../../currentUser/guards/auth.guard';
import { CreateUserDto } from '../../dtos/create-user.dto';
import { SignInUserDto } from '../../dtos/signin-user.dto';
import { User } from '../../entities/user.entity';
import { AuthService } from '../../services/auth/auth.service';

@Controller('auth')
@UseGuards(AuthGuard)
export class AuthentificationController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  signUp(@Body() body: CreateUserDto) {
    return this.authService.signUp(body);
  }

  @Post('/signin')
  async signIn(@Body() body: SignInUserDto, @Session() session: any) {
    const user = await this.authService.signIn(body.email, body.password);
    session.userId = user.userId;
    return user;
  }

  @Post('/signout')
  signOut(@Session() session: any) {
    session.userId = null;
  }

  @Get('/whoami')
  whoAmI(@CurrentUser() user: User) {
    return user;
  }
}
