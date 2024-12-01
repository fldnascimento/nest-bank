<p align="center">
  <img src="https://i.ibb.co/Khrb6WJ/Nest-bank.png" width="220" alt="Nest Bank Logo" />
</p>

  <p align="center">
<b>Sistema bancário em NestJS com DDD, SOLID e Clean Code, focado no domínio do problema 💰</b>
</p>
<p float="left">
<img src="https://img.shields.io/badge/coverage-100%25-green" alt="Coverage" />
<img src="https://img.shields.io/github/license/fldnascimento/nest-bank" alt="License" />
</p>

<p align="center">
 <a href="#description">Descrição</a> • 
 <a href="#tech">Tecnologias</a> • 
  <a href="#setup">Instalação</a> • 
  <a href="#routes">Instruções de uso</a>
</p>

<h2 id="description"> 🗒️ Descrição</h2>

Este projeto é um backend desenvolvido em [NestJS](https://nestjs.com) que simula o funcionamento de um sistema bancário. Ele organiza e gerencia clientes, contas bancárias e transações financeiras. Foi construído aplicando os conceitos de Domain-Driven Design (DDD), SOLID e Clean Code.

### Arquitetura

A arquitetura foi modelada em camadas, separando suas responsabilidades.

- <b>`Application:`</b> Camada responsável por orquestrar o fluxo de informações entre a camada de apresentação e o domínio.
- <b>`Domain:`</b> Está camada é o coração do sistema, onde reside toda a lógica de negócios, incluindo definições de contratos.
- <b>`Infrastructure:`</b> Camada que realiza as implementações concretas para a persistência dos dados.
- <b>`Presentation:`</b> Camada responsável por expor a aplicação para interação com o usuário.

A camada `Domain` está com 100% de cobertura nos testes de unidade.

### SOLID

<b>Princípio da Responsabilidade Única (SRP)</b>

- Aplicado às entidades `ClientEntity` e `BankAccountEntity`. Ambas têm apenas uma responsabilidade: `ClientEntity` lida com as coisas pertinentes ao cliente, enquanto `BankAccountEntity` lida apenas com a conta bancária.

<b>Princípio Aberto/Fechado (OCP)</b>

- Aplicado na entidade `ClientTokenEntity`, que estende `ClientEntity` para implementar a lógica de login do cliente.

<b>Princípio da Substituição de Liskov (LSP)</b>

- Aplicado nos `services` e `repositories`, que podem ser substituídos pela base (interface), sem modificar o comportamento esperado.

<b>Princípio de Segregação de Interface (ISP)</b>

- Aplicado nas interfaces de `repositories`, onde há `BankAccountRepository` e `ClientRepository`, em vez de uma única interface genérica.

<b>Princípio da Inversão de Dependência (DIP)</b>

- Aplicado em todo o sistema utilizando a injeção de dependência do NestJS, onde as dependências são injetadas através do construtor. Exemplos: `ClientService`, `BankAccountService`, `BankAccountRepository` e `ClientRepository`.

### Documentação

O projeto foi documentado usando o swagger. A documentação estará disponível em http://localhost:3003/api após executar a aplicação.

Todos os endpoints estão com exemplos de `request` e exemplo de `response`.

<h2 id="tech">💻 Tecnologias</h2>

![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![NestJS](https://img.shields.io/badge/nestjs-%23E0234E.svg?style=for-the-badge&logo=nestjs&logoColor=white)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![MySQL](https://img.shields.io/badge/mysql-4479A1.svg?style=for-the-badge&logo=mysql&logoColor=white)
![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)
![Sequelize](https://img.shields.io/badge/Sequelize-52B0E7?style=for-the-badge&logo=Sequelize&logoColor=white)
![Jest](https://img.shields.io/badge/-jest-%23C21325?style=for-the-badge&logo=jest&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens)
![Swagger](https://img.shields.io/badge/-Swagger-%23Clojure?style=for-the-badge&logo=swagger&logoColor=white)

<h2 id="setup">🔧 Instalação</h2>

### 🐳 Docker

```bash
# clone o projeto
git clone https://github.com/fldnascimento/nest-bank

# entre na pasta do projeto
cd nest-bank

# crie o arquivo .env na raiz do projeto
cp .env.example .env

# execute o projeto
docker compose up
```

O projeto será executado em http://localhost:3003/api/

### 💪🏻 Sem-Docker

Requisitos:

- **Node.js**: Certifique-se de ter a versão **18.x** ou superior instalada para garantir a compatibilidade com as dependências.
- **MySQL**: O projeto utiliza o MySQL como banco de dados. Certifique-se de que um servidor MySQL8.4 esteja instalado e em execução.

```bash
# clone o projeto
git clone https://github.com/fldnascimento/nest-bank

# entre na pasta do projeto
cd nest-bank

# instale as dependências do projeto
npm install

# crie o arquivo .env na raiz do projeto
cp .env.example .env

# garanta que o banco de dados esteja disponível
# crie o banco de dados
npm run db:create

# execute as migrations
npm run db:migrate

# execute o projeto
npm run start:dev
```

O projeto será executado em http://localhost:3003/api/

<h2 id="routes">📍 Instruções de uso</h2>

- Crie um cliente em `{URL}/client`
- Crie uma conta bancária em `{URL}/bank-account`
- Realize transações usando os endpoints de `{URL}/transaction`

Para criar um novo cliente é necessário um CPF válido. </br> Use esse site para gerar um CPF: 👉🏽 <a href="https://www.4devs.com.br/gerador_de_cpf" target="_blank">Gerar CPF</a>

| rota                                  | descrição                                                                       |
| ------------------------------------- | ------------------------------------------------------------------------------- |
| <kbd>GET /client/:id</kbd>            | consulta cliente por id veja os [detalhes do response](#get-client)             |
| <kbd>POST /client</kbd>               | cria um novo cliente veja os [detalhes do request](#create-client)              |
| <kbd>POST /client/login</kbd>         | login do cliente veja os [detalhes do request](#login-client)                   |
| <kbd>GET /bank-account/:id</kbd>      | consulta conta por id veja os [detalhes do response](#get-account)              |
| <kbd>POST /bank-account</kbd>         | cria uma nova conta veja os [detalhes do request](#create-account)              |
| <kbd>PATCH /bank-account</kbd>        | atualiza status da conta veja os [detalhes do request](#update-account)         |
| <kbd>POST /transaction/deposit</kbd>  | realiza um depósito em uma conta veja os [detalhes do request](#deposit)        |
| <kbd>POST /transaction/withdraw</kbd> | realiza um saque em uma conta veja os [detalhes do request](#withdraw)          |
| <kbd>POST /transaction/transfer</kbd> | realiza uma transferência entre contas veja os [detalhes do request](#transfer) |

<h3 id="get-client">GET /client/:id</h3>

**RESPONSE**

```json
{
  "id": "776f802b-6393-475c-aaac-32175f200f65",
  "fullName": "Felipe Nascimento",
  "cpf": "12345678901",
  "birthDate": "1991-01-01",
  "bankAccounts": [
    {
      "id": "8190336d-a44c-474d-a056-33c822b575bb",
      "accountNumber": "0c6d46ee",
      "clientId": "776f802b-6393-475c-aaac-32175f200f65",
      "balance": 1000,
      "isActive": true
    }
  ]
}
```

<h3 id="create-client">POST /client</h3>

**REQUEST**

```json
{
  "fullName": "Felipe Nascimento",
  "cpf": "000.000.000-00",
  "birthDate": "1990-01-01",
  "password": "123456"
}
```

**RESPONSE**

```json
{
  "id": "8656c567-2acd-4b07-bf25-5fa9bf43f929",
  "fullName": "Felipe Nascimento",
  "cpf": "00000000000",
  "birthDate": "1990-01-01",
  "bankAccounts": []
}
```

<h3 id="login-client">POST /client/login</h3>

**REQUEST**

```json
{
  "cpf": "12345678901",
  "password": "123456"
}
```

**RESPONSE**

```json
{
  "id": "776f802b-6393-475c-aaac-32175f200f65",
  "cpf": "12345678901",
  "fullName": "Felipe Nascimento",
  "token": "eyJhbGciOiJIU....",
  "birthDate": "1990-01-01"
}
```

<h3 id="get-account">GET /bank-account/:id</h3>

**RESPONSE**

```json
{
  "id": "8190336d-a44c-474d-a056-33c822b575bb",
  "accountNumber": "0c6d46ee",
  "clientId": "776f802b-6393-475c-aaac-32175f200f65",
  "balance": 1500,
  "isActive": true,
  "transactions": [
    {
      "id": "97526696-06e1-45df-84b6-f564fe383160",
      "type": "DEBIT",
      "amount": 10,
      "date": "2024-11-28T20:41:59.000Z"
    },
    {
      "id": "6c5014c2-ceec-483f-829b-585e01fc404c",
      "type": "CREDIT",
      "amount": 24.5,
      "date": "2024-11-28T20:41:59.000Z"
    }
  ]
}
```

<h3 id="create-account">POST /bank-account</h3>

**REQUEST**

```json
{
  "balance": 10,
  "isActive": true
}
```

**RESPONSE**

```json
{
  "id": "8190336d-a44c-474d-a056-33c822b575bb",
  "accountNumber": "0c6d46ee",
  "balance": 10,
  "isActive": true,
  "clientId": "776f802b-6393-475c-aaac-32175f200f65"
}
```

<h3 id="update-account">PATCH /bank-account</h3>

**REQUEST**

```json
{
  "isActive": false,
  "accountNumber": "0c6d46ee"
}
```

**RESPONSE**

```json
{
  "id": "8190336d-a44c-474d-a056-33c822b575bb",
  "accountNumber": "0c6d46ee",
  "balance": 10,
  "isActive": false,
  "clientId": "776f802b-6393-475c-aaac-32175f200f65"
}
```

<h3 id="deposit">POST /transaction/deposit</h3>

**REQUEST**

```json
{
  "amount": 10,
  "accountNumber": "9e4b9383"
}
```

**RESPONSE**

```json
{
  "id": "4824579b-716a-49b5-8c64-98b97b1ac94b",
  "accountNumber": "9e4b9383",
  "clientId": "6c5014c2-ceec-483f-829b-585e01fc404c",
  "balance": 10,
  "isActive": true,
  "transactions": [
    {
      "type": "CREDIT",
      "amount": 10,
      "date": "2024-11-28T22:24:54.571Z"
    }
  ]
}
```

<h3 id="withdraw">POST /transaction/withdraw</h3>

**REQUEST**

```json
{
  "amount": 10,
  "accountNumber": "9e4b9383"
}
```

**RESPONSE**

```json
{
  "id": "4824579b-716a-49b5-8c64-98b97b1ac94b",
  "accountNumber": "9e4b9383",
  "clientId": "6c5014c2-ceec-483f-829b-585e01fc404c",
  "balance": 10,
  "isActive": true,
  "transactions": [
    {
      "type": "DEBIT",
      "amount": 10,
      "date": "2024-11-28T22:27:51.481Z"
    }
  ]
}
```

<h3 id="transfer">POST /transaction/transfer</h3>

**REQUEST**

```json
{
  "amount": 10,
  "toAccountNumber": "8a5a71a7",
  "fromAccountNumber": "9e4b9383"
}
```

**RESPONSE**

```json
{
  "id": "4824579b-716a-49b5-8c64-98b97b1ac94b",
  "accountNumber": "9e4b9383",
  "clientId": "6c5014c2-ceec-483f-829b-585e01fc404c",
  "balance": 10,
  "isActive": true,
  "transactions": [
    {
      "type": "TRANSFER",
      "amount": 10,
      "destinationAccount": "8a5a71a7",
      "date": "2024-11-28T22:32:22.656Z"
    }
  ]
}
```

## License

Nest Bank is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
