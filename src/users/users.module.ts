import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './services/users/users.service';
import { User } from './entities/user.entity';
import { Admin } from './entities/admin.entity';
import { Client } from './entities/client.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from './services/auth/auth.service';
// import { CurrentUserInterceptor } from './interceptors/currentUser.interceptor';
// import { APP_INTERCEPTOR } from '@nestjs/core';
import { CurrentUserMiddleware } from './middlewares/current-user.middleware';

@Module({
  imports: [TypeOrmModule.forFeature([User, Client, Admin])],
  controllers: [UsersController],
  providers: [
    UsersService,
    AuthService,
    CurrentUserMiddleware,
    // {
    //   provide: APP_INTERCEPTOR,
    //   useClass: CurrentUserInterceptor
    // },
  ],
  exports: [UsersService],
})
export class UsersModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CurrentUserMiddleware).forRoutes('*');
  }
}
