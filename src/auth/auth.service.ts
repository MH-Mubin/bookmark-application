import { Injectable } from '@nestjs/common';

@Injectable({})
export class AuthService {
  signin() {
    return { msg: 'I am signin from service' };
  }
  signup() {
    return { msg: 'I am signup from service' };
  }
}
