import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { randomBytes, scrypt as _scrypt } from 'crypto'; // pour generer notre salt
import { promisify } from 'util'; // pour transformer scrypt en une fonction qui retourne une promesse
import { CreateUserDto } from '../../dtos/create-user.dto';
import { UserType } from '../../enums/users.enum';

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async signUp(dto: CreateUserDto) {
    // 1. check if email is in the db
    const user = await this.usersService.findUserByEmail(dto.email);
    if (!!user) {
      throw new BadRequestException('Email already taken');
    }
    // 2. create and hash the password
    const encryptedPassword = await this.encrypt(dto.password);

    // 3. creates and returns the new user
    return await this.usersService.factoryCreate({
      name: dto.name,
      surname: dto.name,
      userType: dto.userType,
      adminType: dto.adminType,
      email: dto.email,
      password: encryptedPassword,
    });
  }

  async signIn(email: string, userType: UserType, password: string) {
    // verifies user with specified email exist
    const user = await this.usersService.findUserByEmail(email);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (user.userType != userType) {
      throw new BadRequestException('Invalid User Type');
    }

    // Acquires hashed password data
    const [salt, storedHash] = user.password.split('.');

    // Hashes the specified password
    const hash = (await scrypt(password, salt, 32)) as Buffer;

    // Verifies that the passwords match
    if (hash.toString('hex') !== storedHash) {
      throw new BadRequestException('Incorrect Password');
    }

    // returns the user if all is checks out
    return user;
  }

  async changePassword(userId: number, password: string) {
    const encryptedPassword = await this.encrypt(password);
    return await this.usersService.updateUser(userId, {
      password: encryptedPassword,
    });
  }

  // Helper
  async encrypt(password: string) {
    const salt = randomBytes(8).toString('hex');
    const hash = (await scrypt(password, salt, 32)) as Buffer;
    return salt + '.' + hash.toString('hex');
  }
}
