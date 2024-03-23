import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express'; 
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class JwtMiddleware implements NestMiddleware {
  constructor(private readonly authService: AuthService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization?.split(' ')[1]; 
    console.log("Received token:", token);
    if (token) {
      const { role } = await this.authService.decodeToken(token);
      console.log("Decoded user role:", role);

      //Attaching role to the request
      if (role) {
        req['userRole'] = role; 
      }
    }
    next();
  }  
}