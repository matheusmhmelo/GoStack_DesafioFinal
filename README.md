# GoStack_DesafioFinal

Matheus H. R. de Melo - ma_hrm@hotmail.com
(14) 99633-0887

Aplicação final do bootcamp GoStack - FastFeet

Última atualização - 22/04/2020

## Instalação e execução - API

1. Faça um clone desse repositório;
2. Entre na pasta backend rodando `cd backend`;
3. Rode `yarn` para instalar as dependências;
4. Crie um banco de dados no `postgres` com o nome de `fastfeet`;
5. Instancie uma base de dados `redis` (será usado para fila de e-mails);
6. Renomeie o arquivo `.env.example` para `.env`;
7. Coloque as suas credenciais dentro do `.env`;
8. Rode `yarn sequelize db:migrate` para executar as migrations;
9. Rode `yarn sequelize db:seed:all` para adicionar o administrador no banco de dados:  `e-mail: 'admin@fastfeet.com' | senha: '123456'`
10. Rode `yarn dev` para iniciar o servidor.
11. Rode `yarn queue` para iniciar o servidor de filas.

Rotas:

<a href="https://documenter.getpostman.com/view/7792112/SzS2wTao?version=latest" target="_blank">Documentação Postman<a/>

## Instalação e execução - Web

1. Faça um clone desse repositório.
2. Entre na pasta rodando `cd frontend`.
3. Rode `yarn` para instalar as dependências.
4. Rode `yarn start` para iniciar a aplicação.

## Instalação e execução - Mobile

1. Faça um clone desse repositório.
2. Entre na pasta rodando `cd FastFeet_Web`.
3. Rode `yarn` para instalar as dependências.
4. Edite o arquivo `src/global.js` e coloque o IP da API (localhost - iOS, 10.0.3.2 - Genymotion)
5. Rode `react-native run ios` para iniciar a aplicação iOS ou `react-native run android` para iniciar a aplicação Android.
