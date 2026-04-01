import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { Observable } from "rxjs";
import { UsersService } from "../services/users/users.service";

@Injectable()
export class CurrentUserInterceptor implements NestInterceptor {

    constructor(private usersService: UsersService) {}

    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
        // Find the user id
        const req = context.switchToHttp().getRequest()
        const isHandlerSignIn = context.getHandler().name == "signIn" // This allows all requests coming from the Sign In route
        const userId = req.session.userId // This allows users that are signed in

        /** 
         * Create a new property within the request
         *  - This is how the CurrentUser decorator will get it
         *  - You do this so that the CurrentUser decorator gets access to it  
        */ 

        if (!(isHandlerSignIn || userId)) {
            console.log("No User is connected - CurrentUser Interceptor")
        }

        console.log("CurrentUser Interceptor")
        req.currUser = this.usersService.findOneUser(userId)
        
        return next.handle()
    }
    
}