import {
  ClientEntity,
  ClientProps,
} from '@domain/client/entities/client.entity';

export type ClientTokenProps = ClientProps & {
  token: string;
};

export class ClientTokenEntity extends ClientEntity {
  private _token: string;

  constructor(props: ClientTokenProps, id?: string) {
    super(props, id);
    this._token = props.token;
  }

  static new(
    props: Omit<ClientTokenProps, 'bankAccounts'>,
    id?: string,
  ): ClientTokenEntity {
    return new ClientTokenEntity(
      { ...props, bankAccounts: undefined, token: props.token },
      id,
    );
  }

  get token(): string {
    return this._token;
  }

  setToken(value: string) {
    this._token = value;
  }
}
