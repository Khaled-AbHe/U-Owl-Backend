import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import {TypeOrmModule} from '@nestjs/typeorm'
import { User } from './users/entities/users.entity';
import { AuthService } from './users/auth/auth.service';
import { VehiculesModule } from './vehicules/vehicules.module';
import { VehiculesModule } from './vehicules/vehicules.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(
      {
        type: "sqlite",
        database: "db.sqlite",
        autoLoadEntities : true
      }
    ),
    UsersModule,
    VehiculesModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}