import { Test, TestingModule } from '@nestjs/testing';
import { BankAccountImplService } from './bank-account-impl.service';
import { BankAccountRepository } from '@domain/bank-account/interfaces/repositories/bank-account.repository';
import { ClientRepository } from '@domain/client/interfaces/repositories/client.repository';
import { BankAccountEntity } from '@domain/bank-account/entities/bank-account.entity';
import { ClientNotFoundException } from '@domain/client/exceptions/client-not-found.exception';
import { BankAccountNotFoundException } from '@domain/bank-account/exceptions/bank-account-not-found.exception';
import { AmountMustBePositiveException } from '@domain/bank-account/exceptions/amount-must-be-positive.exception';
import { BankAccountInactiveException } from '@domain/bank-account/exceptions/bank-account-inactive.exception';
import { BalanceInsufficientException } from '@domain/bank-account/exceptions/balance-insufficient.exception';
import { TransferToTheSameAccountException } from '@domain/bank-account/exceptions/transfer-to-the-same-account.exception';

describe('BankAccountImplService', () => {
  let service: BankAccountImplService;
  let accountRepository: jest.Mocked<BankAccountRepository>;
  let clientRepository: jest.Mocked<ClientRepository>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BankAccountImplService,
        {
          provide: 'BankAccountRepository',
          useValue: {
            save: jest.fn(),
            findByIdWithTransactions: jest.fn(),
            findByAccountNumber: jest.fn(),
            update: jest.fn(),
            findByAccountNumberWithDestinactionAccount: jest.fn(),
          },
        },
        {
          provide: 'ClientRepository',
          useValue: {
            findById: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<BankAccountImplService>(BankAccountImplService);
    accountRepository = module.get('BankAccountRepository');
    clientRepository = module.get('ClientRepository');
  });

  describe('createAccount', () => {
    it('should create a new account if the client exists', async () => {
      const account = new BankAccountEntity({
        accountNumber: '12345',
        balance: 1000,
        clientId: 'client-id',
        isActive: true,
        transactions: [],
      });

      clientRepository.findById.mockResolvedValue({ id: 'client-id' } as any);
      accountRepository.save.mockResolvedValue(account);

      const result = await service.createAccount(account);

      expect(clientRepository.findById).toHaveBeenCalledWith('client-id');
      expect(accountRepository.save).toHaveBeenCalledWith(account);
      expect(result).toEqual(account);
    });

    it('should throw ClientNotFoundException if client does not exist', async () => {
      clientRepository.findById.mockResolvedValue(null);

      const account = new BankAccountEntity({
        accountNumber: '12345',
        balance: 1000,
        clientId: 'non-existent-client',
        isActive: true,
        transactions: [],
      });

      await expect(service.createAccount(account)).rejects.toThrow(
        ClientNotFoundException,
      );
    });
  });

  describe('getAccountById', () => {
    it('should return account if it exists', async () => {
      const account = new BankAccountEntity({
        accountNumber: '12345',
        balance: 1000,
        clientId: 'client-id',
        isActive: true,
        transactions: [],
      });

      accountRepository.findByIdWithTransactions.mockResolvedValue(account);

      const result = await service.getAccountById('account-id');

      expect(accountRepository.findByIdWithTransactions).toHaveBeenCalledWith(
        'account-id',
      );
      expect(result).toEqual(account);
    });

    it('should throw BankAccountNotFoundException if account does not exist', async () => {
      accountRepository.findByIdWithTransactions.mockResolvedValue(null);

      await expect(service.getAccountById('non-existent-id')).rejects.toThrow(
        BankAccountNotFoundException,
      );
    });
  });

  describe('getAccountByNumber', () => {
    it('should return account if it exists', async () => {
      const account = new BankAccountEntity({
        accountNumber: '12345',
        balance: 1000,
        clientId: 'client-id',
        isActive: true,
        transactions: [],
      });

      accountRepository.findByAccountNumber.mockResolvedValue(account);

      const result = await service.getAccountByNumber('account-number');

      expect(accountRepository.findByAccountNumber).toHaveBeenCalledWith(
        'account-number',
      );
      expect(result).toEqual(account);
    });

    it('should throw BankAccountNotFoundException if account does not exist', async () => {
      accountRepository.findByAccountNumber.mockResolvedValue(null);

      await expect(
        service.getAccountByNumber('non-existent-id'),
      ).rejects.toThrow(BankAccountNotFoundException);
    });
  });

  describe('deposit', () => {
    it('should deposit amount if account is active', async () => {
      const account = BankAccountEntity.new({
        balance: 100,
        clientId: 'client-id',
        isActive: true,
      });

      accountRepository.findByAccountNumber.mockResolvedValue(account);

      const result = await service.deposit('12345', 50);

      expect(accountRepository.findByAccountNumber).toHaveBeenCalledWith(
        '12345',
      );
      expect(accountRepository.update).toHaveBeenCalledWith(account);
      expect(result.balance).toBe(150);
    });

    it('should throw AmountMustBePositiveException if amount is negative', async () => {
      const account = BankAccountEntity.new({
        balance: 0,
        clientId: 'client-id',
        isActive: false,
      });

      accountRepository.findByAccountNumber.mockResolvedValue(account);
      await expect(service.deposit(account.accountNumber, -50)).rejects.toThrow(
        AmountMustBePositiveException,
      );
    });

    it('should throw BankAccountInactiveException if account is inactive', async () => {
      const account = BankAccountEntity.new({
        balance: 100,
        clientId: 'client-id',
        isActive: false,
      });

      accountRepository.findByAccountNumber.mockResolvedValue(account);

      await expect(service.deposit('12345', 50)).rejects.toThrow(
        BankAccountInactiveException,
      );
    });
  });

  describe('withdraw', () => {
    it('should withdraw amount if account is active and has sufficient balance', async () => {
      const account = BankAccountEntity.new({
        balance: 100,
        clientId: 'client-id',
        isActive: true,
      });

      accountRepository.findByAccountNumber.mockResolvedValue(account);

      const result = await service.withdraw('12345', 50);

      expect(accountRepository.findByAccountNumber).toHaveBeenCalledWith(
        '12345',
      );
      expect(accountRepository.update).toHaveBeenCalledWith(account);
      expect(result.balance).toBe(50);
    });

    it('should throw AmountMustBePositiveException if amount is negative', async () => {
      const account = BankAccountEntity.new({
        balance: 0,
        clientId: 'client-id',
        isActive: false,
      });

      accountRepository.findByAccountNumber.mockResolvedValue(account);
      await expect(
        service.withdraw(account.accountNumber, -50),
      ).rejects.toThrow(AmountMustBePositiveException);
    });

    it('should throw BalanceInsufficientException if account has insufficient balance', async () => {
      const account = BankAccountEntity.new({
        balance: 50,
        clientId: 'client-id',
        isActive: true,
      });

      accountRepository.findByAccountNumber.mockResolvedValue(account);

      await expect(service.withdraw('12345', 100)).rejects.toThrow(
        BalanceInsufficientException,
      );
    });
  });

  describe('updateActive', () => {
    it('should update account active status', async () => {
      const account = BankAccountEntity.new({
        balance: 100,
        clientId: 'client-id',
        isActive: true,
      });

      accountRepository.findByAccountNumber.mockResolvedValue(account);

      const result = await service.updateActive('12345', false);

      expect(accountRepository.findByAccountNumber).toHaveBeenCalledWith(
        '12345',
      );
      expect(accountRepository.update).toHaveBeenCalledWith(account);
      expect(result.isActive).toBe(false);
    });
  });

  describe('transfer', () => {
    it('should throw BankAccountNotFoundException if source account does not exist', async () => {
      accountRepository.findByAccountNumber.mockResolvedValue(null);

      await expect(service.transfer('12345', '67890', 100)).rejects.toThrow(
        BankAccountNotFoundException,
      );
    });

    it('should throw BankAccountInactiveException if source account is inactive', async () => {
      const fromAccount = BankAccountEntity.new({
        balance: 1000,
        clientId: 'client-id',
        isActive: false,
      });

      const toAccount = BankAccountEntity.new({
        balance: 500,
        clientId: 'client-id',
        isActive: true,
      });

      accountRepository.findByAccountNumberWithDestinactionAccount.mockResolvedValue(
        fromAccount,
      );
      accountRepository.findByAccountNumber.mockResolvedValue(toAccount);

      await expect(service.transfer('12345', '67890', 100)).rejects.toThrow(
        BankAccountInactiveException,
      );
    });

    it('should throw BalanceInsufficientException if source account has insufficient balance', async () => {
      const fromAccount = BankAccountEntity.new({
        balance: 100,
        clientId: 'client-id',
        isActive: true,
      });

      const toAccount = BankAccountEntity.new({
        balance: 500,
        clientId: 'client-id',
        isActive: true,
      });

      accountRepository.findByAccountNumberWithDestinactionAccount.mockResolvedValue(
        fromAccount,
      );
      accountRepository.findByAccountNumber.mockResolvedValue(toAccount);

      await expect(service.transfer('12345', '67890', 200)).rejects.toThrow(
        BalanceInsufficientException,
      );
    });

    it('should throw BankAccountNotFoundException if destination account does not exist', async () => {
      const fromAccount = BankAccountEntity.new({
        balance: 1000,
        clientId: 'client-id',
        isActive: true,
      });

      accountRepository.findByAccountNumberWithDestinactionAccount.mockResolvedValue(
        fromAccount,
      );
      accountRepository.findByAccountNumber.mockResolvedValue(null);

      await expect(service.transfer('12345', '67890', 100)).rejects.toThrow(
        BankAccountNotFoundException,
      );
    });

    it('should throw BankAccountInactiveException if destination account is inactive', async () => {
      const fromAccount = BankAccountEntity.new({
        balance: 1000,
        clientId: 'client-id',
        isActive: true,
      });

      const toAccount = BankAccountEntity.new({
        balance: 500,
        clientId: 'client-id',
        isActive: false,
      });

      accountRepository.findByAccountNumberWithDestinactionAccount.mockResolvedValue(
        fromAccount,
      );
      accountRepository.findByAccountNumber.mockResolvedValue(toAccount);

      await expect(service.transfer('12345', '67890', 100)).rejects.toThrow(
        BankAccountInactiveException,
      );
    });

    it('should throw AmountMustBePositiveException if amount is negative', async () => {
      const fromAccount = BankAccountEntity.new({
        balance: 1000,
        clientId: 'client-id',
        isActive: true,
      });

      const toAccount = BankAccountEntity.new({
        balance: 500,
        clientId: 'client-id',
        isActive: true,
      });

      accountRepository.findByAccountNumberWithDestinactionAccount.mockResolvedValue(
        fromAccount,
      );
      accountRepository.findByAccountNumber.mockResolvedValue(toAccount);

      await expect(service.transfer('12345', '67890', -100)).rejects.toThrow(
        AmountMustBePositiveException,
      );
    });

    it('should transfer amount between accounts if all conditions are met', async () => {
      const fromAccount = BankAccountEntity.new({
        balance: 1000,
        clientId: 'client-id',
        isActive: true,
      });

      const toAccount = BankAccountEntity.new({
        balance: 500,
        clientId: 'client-id',
        isActive: true,
      });

      accountRepository.findByAccountNumberWithDestinactionAccount.mockResolvedValue(
        fromAccount,
      );
      accountRepository.findByAccountNumber.mockResolvedValue(toAccount);

      const result = await service.transfer('12345', '67890', 200);

      expect(accountRepository.update).toHaveBeenCalledTimes(2);
      expect(fromAccount.balance).toBe(800);
      expect(toAccount.balance).toBe(700);
      expect(result).toEqual(fromAccount);
    });

    it('should throw TransferToTheSameAccountException if source and destination accounts are the same', async () => {
      await expect(service.transfer('12345', '12345', 100)).rejects.toThrow(
        TransferToTheSameAccountException,
      );
    });

    it('should throw BalanceInsufficientException if source account has insufficient balance', async () => {
      const fromAccount = BankAccountEntity.new({
        balance: 100,
        clientId: 'client-id',
        isActive: true,
      });

      const toAccount = BankAccountEntity.new({
        balance: 500,
        clientId: 'client-id',
        isActive: true,
      });

      accountRepository.findByAccountNumberWithDestinactionAccount.mockResolvedValue(
        fromAccount,
      );

      accountRepository.findByAccountNumber.mockResolvedValue(toAccount);

      await expect(
        service.transfer(
          fromAccount.accountNumber,
          toAccount.accountNumber,
          200,
        ),
      ).rejects.toThrow(BalanceInsufficientException);
    });
  });
});
