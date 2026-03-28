import { Controller, Body, Post, Get, Param, Patch, UseInterceptors, Session, Module, UseGuards, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
// import { UseInterceptors, ClassSerializerInterceptor } from '@nestjs/common'
import { Serialize, SerializeInterceptor } from 'src/interceptors/serialize.interceptors';
import { UserDto } from './dtos/user.dto';
import { AuthService } from './auth/auth.service';
import { CurrentUser } from './decorators/current-user.decorators';
import { User } from './entities/users.entity';
import { CurrentUserInterceptor } from './interceptors/current-user.interceptor';
import { AuthGuard } from 'src/guards/auth.guard';
import { AdminGuard } from 'src/guards/admin-guard';

@Controller('auth')
export class UsersController {

    constructor(private service : UsersService, private authService : AuthService) {}

    @Get()
    findAll() {
        return this.service.findAll();
    }

    @Post('/signup')
    async createUser(@Body() body : CreateUserDto, @Session() session : any) {
        const user = await this.authService.signup(body.email, body.password);
        console.log('controller session', session );
        session.userId = user.id;
        return user;
    }

    @Post('/signin')
    async signin(@Body() body : CreateUserDto, @Session() session : any) {
        const user = await this.authService.signin(body.email, body.password);
        session.userId = user.id;
        return user;
    }

    @Get('/whoami')
    whoAmI(@CurrentUser() user : User) {
        return user;
    }

    @Post('/signout')
    signOut(@Session() session : any) {
        session.userId = null;
    }

    @UseGuards(AuthGuard)
    @Patch('/:id')
    updateUser(@Param('id') id : string, @Body() body : UpdateUserDto) {
        return this.service.updateUser(parseInt(id), body);
    }

    // @UseInterceptors(ClassSerializerInterceptor)
    // @UseInterceptors(new SerializeInterceptor(UserDto))
    @Serialize(UserDto)
    @Get('/:id')
    findUser(@Param('id') id : string) {
        console.log('handler is running')
        return this.service.findOne(parseInt(id));
    }

    @UseGuards(AdminGuard)
    @Delete('/:id')
    removeUser(@Param('id') id : string) {
        return this.service.removeUser(parseInt(id));
    }
}