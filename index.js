const express = require('express');
const server = express();
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');


var bodyParser = require("body-parser");
server.use(bodyParser.json());

const options = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'API de usuarios - Etapa1-BD',
        version: '1.0.0',
        description: 'API para adicionar e pesquisar por um usuário',
      },
    },
    apis: ['./index.js'],
  };

  const swaggerSpec = swaggerJSDoc(options);
  server.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

var porta = 8007;
server.listen(porta,() => {
 console.log ('O servidor está funcionando na porta', porta)
});
let array_usuarios = []

// rota post : permite que clientes enviem dados para um servidor. 
//Essa rota é comumente utilizada para a criação de novos recursos 
//como criar um novo usuário em um sistema).


//Quando o cliente envia uma requisição POST com dados no corpo, esses dados são recebidos pelo servidor
// e armazenados no objeto req.body. 
//Esse objeto pode ser acessado dentro da rota para manipulação dos dados.

/**
 * @swagger
 * /usuarios:
 *   post:
 *     summary: Cria um novo usuário.
 *     description: Essa rota permite criar um novo usuário no sistema.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               cpf:
 *                 type: integer
 *                 description: CPF do usuário.
 *               nome:
 *                 type: string
 *                 description: Nome do usuário.
 *               data_nascimento:
 *                 type: string
 *                 format: date
 *                 description: Data de nascimento do usuário.
 *     responses:
 *       200:
 *         description: Usuário cadastrado com sucesso.
 *    
 */


server.post('/usuarios', function(req, res)  {
    const { cpf, nome, data_nascimento } = req.body;
    const usuario = { cpf, nome, data_nascimento };
    array_usuarios.push(usuario);
    res.send('Usuário cadastrado com sucesso!');
});

/**
 * @swagger
 * /usuarios/{cpf}:
 *   get:
 *     summary: Procura por um usuario.
 *     description: Essa rota permite procurar e mostrar as informações do usuário a partir do seu cpf.
 *     parameters:
 *       - cpf : cpf
 *         in: path
 *         required: true
 *         description: CPF do usuário a ser encontrado.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: As informações referentes ao dono daquele cpf.
 *       content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 cpf:
 *                   type: integer
 *                   description: CPF do usuário.
 *                 nome:
 *                   type: string
 *                   description: Nome do usuário.
 *                 data_nascimento:
 *                   type: string
 *                   format: date
 *                   description: Data de nascimento do usuário
 *       400:
 *         description: Esse usuario não foi encontrado.
 */


server.get('/usuarios/:cpf', function(req, res) {
   const cpf = req.params.cpf;
   for (let i = 0; i < array_usuarios.length; i++){
    if (array_usuarios[i].cpf == cpf){
        return res.json(array_usuarios[i]);
    } 
   }
   res.json({message: 'Esse usuário não foi encontrado'})

   });