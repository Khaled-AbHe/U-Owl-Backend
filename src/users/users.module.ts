import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/users.entity';
import { AuthService } from './auth/auth.service';
import { CurrentUserInterceptor } from './interceptors/current-user.interceptor';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { CurrentUserMiddleware } from './middlewares/current-user.middleware';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  // providers: [UsersService, AuthService, CurrentUserInterceptor],
  providers : [
    UsersService,
    AuthService,
    CurrentUserMiddleware
    // {
    //   provide : APP_INTERCEPTOR,
    //   useClass : CurrentUserInterceptor
    // }
  ],
    exports : [UsersService]
})
export class UsersModule implements NestModule {
  configure (consumer: MiddlewareConsumer) {
    consumer.apply(CurrentUserMiddleware)
    .forRoutes('*')
  }
}