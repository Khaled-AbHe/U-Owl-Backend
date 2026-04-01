import { Body, Controller, Get, Post, Session, UseGuards } from '@nestjs/common';
import { CurrentUser } from 'src/currentUser/decorators/current-user.decorator';
import { AuthGuard } from 'src/currentUser/guards/auth.guard';
import { CreateUserDto } from 'src/users/dtos/create-user.dto';
import { SignInUserDto } from 'src/users/dtos/signin-user.dto';
import { User } from 'src/users/entities/user.entity';
import { AuthService } from 'src/users/services/auth/auth.service';

@Controller('auth')
@UseGuards(AuthGuard)
export class AuthentificationController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  signUp(@Body() body: CreateUserDto) {
    return this.authService.signUp(body);
  }

  @Get('/signin')
  async signIn(@Body() body: SignInUserDto, @Session() session: any) {
    const user = await this.authService.signIn(body.email, body.password);
    session.userId = user.id;
    return user;
  }

  @Post('/signout')
  signOut(@Session() session: any) {
    session.userId = null;
  }

  @Get('/whoami')
  whoAmI(@CurrentUser() user: User) {
    return user;
    // return this.authService.whoAmI(user.id)
  }
}
