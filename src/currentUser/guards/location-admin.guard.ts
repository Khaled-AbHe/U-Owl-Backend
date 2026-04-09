import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { UserType } from '../../users/enums/users.enum';
import { AdminType } from '../../users/enums/admin-type.enum';

export class LocationAdminGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();
    return (
      req.currUser.userType == UserType.ADMIN &&
      req.currUser.adminType == AdminType.LOCATION_ADMIN
    );
  }
}
