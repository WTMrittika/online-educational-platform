import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class AdminGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const userRole = request.userRole;

    if (!userRole) {
      console.log("User role not found");
      return false;
    }

    if (userRole !== 'admin') {
      console.log("User is not an admin. Role:", userRole);
      return false;
    }

    console.log("User is an admin.");
    return true;
  }
}