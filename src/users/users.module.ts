import { Module } from '@nestjs/common';
import { UsersController } from './controllers/users/users.controller';
import { UsersService } from './services/users/users.service';
import { User } from './entities/user.entity';
import { Admin } from './entities/admin.entity';
import { Client } from './entities/client.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from './services/auth/auth.service';
import { AuthentificationController } from './controllers/authentification/authentification.controller';
import { Dealer } from './entities/dealer.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Client, Admin, Dealer])],
  controllers: [UsersController, AuthentificationController],
  providers: [UsersService, AuthService],
  exports: [UsersService],
})
export class UsersModule {}
