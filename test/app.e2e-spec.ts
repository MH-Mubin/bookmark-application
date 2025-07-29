import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { describe } from 'node:test';
import * as pactum from 'pactum';
import { AuthDto } from 'src/auth/dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { AppModule } from '../src/app.module';

describe('App e2e', () => {
  let app: INestApplication;
  let prisma: PrismaService;
  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = moduleRef.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true, //if there's any other field that shouldn't be in req body this line removes it.
      }),
    );
    await app.init();
    await app.listen(3333);
    prisma = app.get(PrismaService);
    await prisma.cleanDb();
    pactum.request.setBaseUrl('http://localhost:3333');
  });
  afterAll(() => {
    app.close();
  });
  describe('Auth', () => {
    const dto: AuthDto = {
      email: 'mubin.cbs@gmail.com',
      password: '1234',
    };
    describe('Signup', () => {
      it('should throw if email empty', async () => {
        await pactum
          .spec()
          .post('/auth/signup')
          .withBody(dto)
          .expectStatus(400);
      });
      it('should Sign up', async () => {
        await pactum
          .spec()
          .post('/auth/signup')
          .withBody(dto)
          .expectStatus(201);
      });
    });
    describe('Signin', () => {
      it('should Sign in', async () => {
        await pactum
          .spec()
          .post('/auth/signin')
          .withBody(dto)
          .expectStatus(200);
      });
    });
  });
  describe('User', () => {
    (describe('Get me'), () => {});
    (describe('Edit user'), () => {});
  });
  describe('Bookmarks', () => {
    describe('Create Bookmark', () => {});
    describe('Get Bookmark by Id', () => {});
    describe('Edit Bookmark', () => {});
    describe('Delete Bookmark', () => {});
  });
});
