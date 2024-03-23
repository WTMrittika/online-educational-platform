import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import {JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';

@Injectable()
export class AuthService {
constructor(private readonly userService: UsersService, 
  private jwtService: JwtService
  ){}

async validateUser(username: string, password: string):Promise<any> {
  const user =await this.userService.findByUsername(username);
  if (user && await compare(password, user.password)) {
    const{password, ...result} = user;
    return result;
  }
  return null;
}

async login(user: any){
  const payload = {
    uname:user.uname,
    uemail:user.uemail,
    username:user.username,
    email:user.email,
    //role: user.role
  };
  const accessToken = this.jwtService.sign(payload);
  return{
    accessToken,
    username:user.username,
    email:user.email
  };
}
  async decodeToken(token: string): Promise<{ uname: string, uemail: string, username: string, email: string,  } | null> {
  try {
    const payload = this.jwtService.verify(token); 
    return { uname:payload.uname, uemail:payload.uemail, username:payload.username, email:payload.email, }; 
  } catch (error) {
    return null; 
  }
}

}