import { BadRequestException, Injectable, NotFoundException,Session } from '@nestjs/common';
import { UsersService } from './users.service';
import { randomBytes,scrypt as _scrypt} from 'crypto'; // pour generer notre salt
import { promisify } from 'util'; // pour transformer scrypt en une fonction qui retourne une promesse


const scrypt = promisify(_scrypt)

@Injectable()
export class AuthService {

    constructor(private userService : UsersService){}

    async signUp(email : string, password : string){

        //1. check if email is in the database
        const users = await this.userService.findAllUserByEmail(email)
        if(users.length){
            throw new BadRequestException("email in use");
        }
        //2. hash the password
        //2.1 generate salt
        const salt = randomBytes(8).toString('hex') // 16 caractères de salt
        //2.2 hash the salt and password together
        const hash = (await scrypt(password,salt,32)) as Buffer;
        //2.3 join the hashed result and salt together in db
        const result = salt + '.' + hash.toString('hex');
        //3. create new user
        const user = await this.userService.createUser(email,result);

        //4. return user{}
        return user;

    }

    async signIn(email: string, password : string){
        //1 . find user by email
        const [user] = await this.userService.findAllUserByEmail(email);
        //1.2 if user not found, throw error
        if(!user){
            throw new NotFoundException('user not found');
        }
        //2. retrieve the salt and hast from the stored password
        const [salt,storedHash] = user.password.split('.');
        //3. hash the supplied passoword with the salt
        const hash = (await scrypt(password,salt,32)) as Buffer;
        
        //4. compare the hashed result with the stored hash, if they match, return user
        if(hash.toString('hex') !== storedHash){
            throw new BadRequestException('Bad password')
        }

        return user
    }

    // whoAmI(userId : number){
    //     return this.userService.findUserById == null ?
    //     "Not connected" : 
    //     this.userService.findUserById(userId)
    // }
}
