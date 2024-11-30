import {
  ClientTokenEntity,
  ClientTokenProps,
} from '@domain/client/entities/client-token.entity';

describe('ClientTokenEntity', () => {
  it('should create a ClientTokenEntity with valid properties', () => {
    const props: ClientTokenProps = {
      fullName: 'Felipe Nascimento',
      birthDate: new Date('2000-01-01'),
      cpf: '12345678909',
      token: 'token',
      password: '123456',
    };

    const clientTokenEntity = ClientTokenEntity.new(props);

    expect(clientTokenEntity).toBeInstanceOf(ClientTokenEntity);
    expect(clientTokenEntity.fullName).toBe('Felipe Nascimento');
    expect(clientTokenEntity.birthDate).toEqual(new Date('2000-01-01'));
    expect(clientTokenEntity.cpf).toBe('12345678909');
    expect(clientTokenEntity.token).toBe('token');
    expect(clientTokenEntity.password).toBe('123456');
  });

  it('should allow updating the token property', () => {
    const props: ClientTokenProps = {
      fullName: 'Felipe Nascimento',
      birthDate: new Date('2000-01-01'),
      cpf: '12345678909',
      token: 'token',
      password: '123456',
    };

    const clientTokenEntity = new ClientTokenEntity(props);

    clientTokenEntity.setToken('newToken');

    expect(clientTokenEntity.token).toBe('newToken');
  });

  //   it('should throw an error if token is not provided', () => {
  //     const props = {
  //       fullName: 'Felipe Nascimento',
  //       birthDate: new Date('2000-01-01'),
  //       //   cpf: '12345678909',
  //       //   password: '123456',
  //     };

  //     expect(() => new ClientTokenEntity(props as any)).toThrow();
  //   });
});
