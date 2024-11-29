import { Test, TestingModule } from '@nestjs/testing';
import { ClientImplService } from './client-impl.service';
import { ClientRepository } from '@domain/client/interfaces/repositories/client.repository';
import { ClientEntity } from '@domain/client/entities/client.entity';
import { ClientNotFoundException } from '@domain/client/exceptions/client-not-found.exception';
import { ClientAlreadyExistsException } from '@domain/client/exceptions/client-already-exists.exception';
import { ClientService } from '@domain/client/interfaces/services/client.service';

describe('ClientImplService', () => {
  let service: ClientService;
  let clientRepository: jest.Mocked<ClientRepository>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ClientImplService,
        {
          provide: 'ClientRepository',
          useValue: {
            save: jest.fn(),
            findByCpf: jest.fn(),
            findById: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<ClientService>(ClientImplService);
    clientRepository = module.get('ClientRepository');
  });

  describe('createClient', () => {
    it('should create a new client if the CPF does not already exist', async () => {
      const client = ClientEntity.new({
        fullName: 'Felipe Nascimento',
        cpf: '96599723004',
        birthDate: new Date('2000-01-01'),
      });

      clientRepository.findByCpf.mockResolvedValue(null);
      clientRepository.save.mockResolvedValue(client);

      const result = await service.createClient(client);

      expect(clientRepository.findByCpf).toHaveBeenCalledWith(client.cpf);
      expect(clientRepository.save).toHaveBeenCalledWith(client);
      expect(result).toEqual(client);
    });

    it('should throw ClientAlreadyExistsException if a client with the same CPF exists', async () => {
      const client = ClientEntity.new({
        fullName: 'Felipe Nascimento',
        cpf: '84333699037',
        birthDate: new Date('2000-01-01'),
      });

      clientRepository.findByCpf.mockResolvedValue(client);

      await expect(service.createClient(client)).rejects.toThrow(
        ClientAlreadyExistsException,
      );

      expect(clientRepository.findByCpf).toHaveBeenCalledWith(client.cpf);
      expect(clientRepository.save).not.toHaveBeenCalled();
    });
  });

  describe('getClient', () => {
    it('should return a client if the client exists', async () => {
      const client = ClientEntity.new({
        fullName: 'Felipe Nascimento',
        cpf: '27899090083',
        birthDate: new Date('2000-01-01'),
      });

      clientRepository.findById.mockResolvedValue(client);

      const result = await service.getClient('1');

      expect(clientRepository.findById).toHaveBeenCalledWith('1');
      expect(result).toEqual(client);
    });

    it('should throw ClientNotFoundException if the client does not exist', async () => {
      clientRepository.findById.mockResolvedValue(null);

      await expect(service.getClient('non-existent-id')).rejects.toThrow(
        ClientNotFoundException,
      );

      expect(clientRepository.findById).toHaveBeenCalledWith('non-existent-id');
    });
  });
});
