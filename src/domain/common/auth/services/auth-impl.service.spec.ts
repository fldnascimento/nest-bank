import { Test, TestingModule } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { AuthImplService } from '@domain/common/auth/services/auth-impl.service';
import { ClientRepository } from '@domain/client/interfaces/repositories/client.repository';
import { ClientEntity } from '@domain/client/entities/client.entity';
import { ClientTokenEntity } from '@domain/client/entities/client-token.entity';
import { UnauthorizedException } from '@domain/common/auth/exceptions/unauthorized.exception';
import { AuthService } from '@domain/common/auth/interfaces/services/auth.service';

describe('AuthImplService', () => {
  let service: AuthService;
  let clientRepository: jest.Mocked<ClientRepository>;
  let jwtService: jest.Mocked<JwtService>;

  beforeEach(async () => {
    const mockClientRepository = {
      findByCpf: jest.fn(),
    };

    const mockJwtService = {
      sign: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthImplService,
        { provide: 'ClientRepository', useValue: mockClientRepository },
        { provide: JwtService, useValue: mockJwtService },
      ],
    }).compile();

    service = module.get<AuthImplService>(AuthImplService);
    clientRepository = module.get('ClientRepository');
    jwtService = module.get(JwtService);
  });

  describe('login', () => {
    it('should return a ClientTokenEntity with a valid token', async () => {
      const client = new ClientEntity({
        cpf: '100.325.530-21',
        fullName: 'John Doe',
        password: 'hashedpassword',
        birthDate: new Date('1990-01-01'),
      });
      const fakeToken = 'fakeJwtToken';

      jwtService.sign.mockReturnValue(fakeToken);

      const clientToken = await service.login(client);

      expect(clientToken).toBeInstanceOf(ClientTokenEntity);
      expect(clientToken.token).toBe(fakeToken);
      expect(clientToken.fullName).toBe(client.fullName);
      expect(clientToken.cpf).toBe(client.cpf);
    });
  });

  describe('validateClient', () => {
    it('should return a ClientEntity if credentials are valid', async () => {
      const client = new ClientEntity({
        cpf: '794.540.840-03',
        fullName: 'John Doe',
        password: await bcrypt.hash('password', 10),
        birthDate: new Date('1990-01-01'),
      });

      clientRepository.findByCpf.mockResolvedValue(client);
      (jest.spyOn(bcrypt, 'compare') as jest.Mock).mockResolvedValue(true);

      const validatedClient = await service.validateClient(
        client.cpf,
        'password',
      );

      expect(validatedClient).toBeInstanceOf(ClientEntity);
      expect(validatedClient.id).toBe(client.id);
      expect(validatedClient.cpf).toBe(client.cpf);
      expect(validatedClient.fullName).toBe(client.fullName);
      expect(validatedClient.password).toBeUndefined();
    });

    it('should throw UnauthorizedException if client is not found', async () => {
      clientRepository.findByCpf.mockResolvedValue(null);

      await expect(
        service.validateClient('invalidCpf', 'password'),
      ).rejects.toThrow(UnauthorizedException);
    });

    it('should throw UnauthorizedException if password is invalid', async () => {
      const client = new ClientEntity({
        cpf: '999.715.760-58',
        fullName: 'John Doe',
        password: await bcrypt.hash('password', 10),
        birthDate: new Date('1990-01-01'),
      });

      clientRepository.findByCpf.mockResolvedValue(client);
      (jest.spyOn(bcrypt, 'compare') as jest.Mock).mockResolvedValue(false);

      await expect(
        service.validateClient(client.cpf, 'wrongPassword'),
      ).rejects.toThrow(UnauthorizedException);
    });
  });
});
