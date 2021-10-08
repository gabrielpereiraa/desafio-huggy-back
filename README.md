<br />
<br/>
<p align="center" id="nome-do-projeto">
  <h3 align="center">Desafio Huggy: Back End (API)</h3>
  <p align="center">
    Backend do desafio técnico proposto pela Huggy.
    <br />
    <a href="https://github.com/gabrielpereiraa/basic-login"><strong>Front End »</strong></a>
    <br />
    <br />
    &nbsp
    <img src="https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white" />
    &nbsp
    <img src="https://img.shields.io/badge/MySQL-00000F?style=for-the-badge&logo=mysql&logoColor=white" />
    &nbsp
    <img src="https://img.shields.io/badge/Express.js-404D59?style=for-the-badge" />
  </p>
</p>
<br/>
<br/>

## 🖥️ Sobre o projeto
Este projeto contém todas as API's que vão ser necessárias para realizar as operações do CRUD.

> Este projeto foi desenvolvido apenas avalição de aptidão.

## 📃 Funcionalidades

Funcionalidades desenvolvidas:

- [x] Cadastro de contatos  | POST /contacts
- [x] Alteração de contatos | PUT /contacts
- [x] Exclusão de contatos | DELETE /contacts
- [x] Listagem de contatos | GET /contacts
- [x] Autenticação (JWT) para operações do CRUD |  POST /auth
- [ ] ??

## 🛠️ Tecnologias utilizadas
<p align="left">
  💻 Linguagem: Javascript (Node.js) <br>
  💾 Banco de Dados: MySQL (SQL) <br>
  📚 Framework: Express.js <br>
  📑 Framework para teste: Jest <br>
</p>

## 📋 Observações
Como este projeto não tem um parte de login de usuários, deve-se utilizar <b>{development.authorization}</b> para armazenar um token de autenticação. Assim o front-end ou qualquer outra aplicação, deve enviar no HEADER o Authorization = <b>{development.authorization}</b> para a api <b>/auth</b> e assim irá retornar um <b>JWT</b> para realizar as operações do CRUD.

## 🚀 Configuração e execução
1) Para clonar o projeto, utilizaremos:

```
$ git clone https://github.com/gabrielpereiraa/desafio-huggy-back.git
$ cd desafio-huggy-back
```
2) Se o banco de dados ainda não existe, ele precisa ser criado.

3) Antes de continuar, precisamos checar as configurações presentes no arquivo config/config.json:

```
{
  "development": {
    "authorization": "8e38f3f9da795fdf1fce678dad01c967",
    "jwtPrivateKey" : "huggyjwt",
    "username": "root",
    "password": "root",
    "database": "desafio_huggy",
    "host": "localhost",
    "dialect": "mysql",
    "pool": {
      "max": 5,
      "min": 0,
      "acquire": 30000,
      "idle": 10000
    }
  }
 }
```

4) É necessário executar a migration do module Contact. Para isso executamos o seguinte comando:
```
$ npx sequelize db:migrate
```

5) Rodar!
```
$ node src/server.js
```

6) Insomnia v4 (.json) com todas as requisições.<br>
https://github.com/gabrielpereiraa/desafio-huggy-back/blob/bf67c26930290b1d0ff75b78da73fd8fdda8ceb3/Insomnia

## 👷‍♂️ Contribuidores<br>
<table>
  <tr>
    <td align="center">
      <a href="#">
        <img src="https://avatars3.githubusercontent.com/u/31936044" width="100px;"/><br>
        <sub>
          <b>Gabriel da Silva Pereira</b>
        </sub>
      </a>
    </td>
  </tr>
</table>
<br>

[⬆ Voltar ao topo](#nome-do-projeto)<br>
