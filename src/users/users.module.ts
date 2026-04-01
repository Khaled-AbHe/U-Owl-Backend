import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UsersController } from './controllers/users/users.controller';
import { UsersService } from './services/users/users.service';
import { User } from './entities/user.entity';
import { Admin } from './entities/admin.entity';
import { Client } from './entities/client.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from './services/auth/auth.service';
// import { CurrentUserInterceptor } from './interceptors/currentUser.interceptor';
// import { APP_INTERCEPTOR } from '@nestjs/core';
// import { CurrentUserMiddleware } from 'src/currentUser/middlewares/current-user.middleware';
import { AuthentificationController } from './controllers/authentification/authentification.controller';
import { CartsModule } from 'src/carts/carts.module';
import { ReservationsController } from './controllers/reservations/reservations.controller';
import { ReservationsService } from './services/reservations/reservations.service';
import { VehiclesModule } from 'src/vehicles/vehicles.module';

@Module({
  imports: [
    CartsModule,
    VehiclesModule,
    TypeOrmModule.forFeature([User, Client, Admin]),
  ],
  controllers: [
    UsersController,
    AuthentificationController,
    ReservationsController,
  ],
  providers: [
    UsersService,
    AuthService,
    ReservationsService,
    // CurrentUserMiddleware,
    // {
    //   provide: APP_INTERCEPTOR,
    //   useClass: CurrentUserInterceptor
    // },
  ],
  exports: [UsersService],
})
export class UsersModule {}
