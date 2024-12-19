import { Test, TestingModule } from '@nestjs/testing';
import { AuthServiceController } from './auth-service.controller';
import { AuthService } from './auth-service.service';

describe('AuthController', () => {
  let authController: AuthServiceController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AuthServiceController],
      providers: [AuthService],
    }).compile();

    authController = app.get<AuthServiceController>(AuthServiceController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(authController.getProfile()).toBe('Hello World!');
    });
  });
});
