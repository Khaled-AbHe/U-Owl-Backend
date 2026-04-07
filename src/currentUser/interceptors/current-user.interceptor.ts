import { CallHandler, ExecutionContext, Injectable, NestInterceptor,Session } from "@nestjs/common";
import { Observable } from "rxjs";
import { UsersService } from "src/users/services/users.service";

@Injectable()
export class CurrentUserInterceptor implements NestInterceptor{

    constructor(private userServices: UsersService){}

    async intercept(context: ExecutionContext, next: CallHandler<any>): Promise<Observable<any>> {
        const request = context.switchToHttp().getRequest();

        const userId = request.session.userId;
        
       
        if(!userId){
            //gestion d'erreur s'il n'y a pas de user connecté
            console.log('No user connected')
        }else{
            const user = await this.userServices.findOne(userId)
            //trouver l'utilisateur dans la base de donnée en utilisant le userId
            request.CurrentUser = user;
        }
        
        return next.handle();
    }
}
