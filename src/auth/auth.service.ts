import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto } from './dto';
import * as argon from 'argon2';
@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}
  signin() {
    return { msg: 'I am signin from service' };
  }
  signup(dto: AuthDto) {
    return { msg: 'I am signup from service' };
  }
}
