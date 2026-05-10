import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { VehiclesModule } from './vehicles/vehicles.module';
import { LocationsModule } from './locations/locations.module';
import { CartsModule } from './carts/carts.module';
import { CompanyDataModule } from './company-data/company-data.module';
import { CurrentUserMiddleware } from './currentUser/middlewares/current-user.middleware';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite',
      autoLoadEntities: true,
      synchronize: true, // Usually, you keep this at False so you dont mess with an established database
      dropSchema: false, // This clears the db each time you run it if set to 'true'. !!!! RUNNING YOUR PROGAM WITH 'npm run start:dev' IS NOT RECOMMENDED WITH THIS ON!!!
    }),
    UsersModule,
    VehiclesModule,
    LocationsModule,
    CartsModule,
    CompanyDataModule,
  ],
  providers: [CurrentUserMiddleware],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CurrentUserMiddleware).forRoutes('*');
  }
}
