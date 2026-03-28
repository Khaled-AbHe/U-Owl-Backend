import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';

export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();
    const handlerName = context.getHandler().name;
    const isHandlerSafe = handlerName == 'signIn' || handlerName == 'signUp'; // This allows all requests coming from the Sign In and Sign Up routes
    const isUserSignedIn = req.session.userId; // This allows users that are signed in
    return isHandlerSafe || isUserSignedIn;
  }
}
