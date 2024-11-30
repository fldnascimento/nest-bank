<p align="center">
  <img src="https://i.ibb.co/g9tDB72/Nest-bank123.png" width="220" alt="Nest Bank Logo" />
</p>

  <p align="center">
<b>Sistema bancário em NestJS com DDD, SOLID e Clean Code, focado no domínio do problema 💰</b>
</p>
<img src="https://img.shields.io/badge/coverage-100%25-green" alt="Coverage" />
<img src="https://img.shields.io/github/license/fldnascimento/nest-bank
" alt="License" />


## Descrição

Este projeto é um backend desenvolvido em [NestJS](https://nestjs.com) que simula o funcionamento de um sistema bancário. Ele organiza e gerencia clientes, contas bancárias e transações financeiras. Foi construído aplicando os conceitos de Domain-Driven Design (DDD), SOLID e Clean Code.

A arquetura foi modelada em comadas separando suas reponsábilidades.

- <b>Application:</b> Camada responsável por orquestrar o fluxo de informações entre a camada de apresentação e o domínio.
- <b>Domain:</b> Está camada é o coração do sistema, onde reside toda a lógica de negócios, incluindo definições de contratos.
- <b>Infrastructure:</b> Camada que realiza as implementações concretas para a persistência dos dados.
- <b>Presentation:</b> Camada responsável por expor a aplicação para interação com o usuário.

## Tecnologias
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![NestJS](https://img.shields.io/badge/nestjs-%23E0234E.svg?style=for-the-badge&logo=nestjs&logoColor=white)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![MySQL](https://img.shields.io/badge/mysql-4479A1.svg?style=for-the-badge&logo=mysql&logoColor=white)
![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)
![Sequelize](https://img.shields.io/badge/Sequelize-52B0E7?style=for-the-badge&logo=Sequelize&logoColor=white)
![Jest](https://img.shields.io/badge/-jest-%23C21325?style=for-the-badge&logo=jest&logoColor=white)

## Instalação

<h2 id="routes">📍 Instruções de uso</h2>

​
| route               | description                                          
|----------------------|-----------------------------------------------------
| <kbd>GET /client/:id</kbd>     | consulta cliente por id veja os [detalhes do response](#get-client)
| <kbd>POST /client</kbd>     | cria um novo cliente veja os [detalhes do request](#create-client)

<h3 id="get-client">GET /client/:id</h3>

**RESPONSE**
```json
{
  "id": "2ce8474b-20ba-4383-af39-2285182cbc97",
  "fullName": "Felipe Nascimento",
  "cpf": "12345678901",
  "birthDate": "1991-01-01",
  "bankAccounts": []
}
```

<h3 id="create-client">POST /client</h3>

**RESPONSE**
```json
{
  "fullName": "Felipe Nascimento",
  "cpf": "000.000.000-00",
  "birthDate": "1990-01-01",
  "password": "123456"
}
```
##

## License

Nest Bank is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
