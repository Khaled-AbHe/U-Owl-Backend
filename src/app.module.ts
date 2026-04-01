import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VehiclesModule } from './vehicles/vehicles.module';
import { LocationsModule } from './locations/locations.module';
import { CartsModule } from './carts/carts.module';
import { CurrentUserMiddleware } from './currentUser/middlewares/current-user.middleware';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite',
      autoLoadEntities: true,
      synchronize: true, // Usually, you keep this at False so you dont mess with an established database
    }),
    UsersModule,
    VehiclesModule,
    LocationsModule,
    CartsModule,
  ],
  controllers: [AppController],
  providers: [AppService, CurrentUserMiddleware],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CurrentUserMiddleware).forRoutes('*');
  }
}
