const request = require("supertest");
const app = require('../../../config/server');
const faker = require('faker');


describe("Ações de pagamento", () => {
  const _request_ = async (uri, data) => await request(app).post(uri).send(data);
 

  it("Comprar Lances", async () => {



    const AUTENTICACAO = await _request_(`/api/usuario/login`, {
      email: 'mattbmoller@gmail.com',
      senha: 'qazx123.'
    });

    const response = await _request_(`/api/pagamento/comprar/lances`, {
      "token":AUTENTICACAO.body[0].token,
     "_idUsuario":AUTENTICACAO.body[0]._id,
     "bandeira":"visa",
     "tipo":"CreditCard",
     "titular":faker.name.firstName(),
     "numero":"4485836989201111",
     "mes":"04",
     "ano":"2021",
     "cvv":"767",
     "valor":"2",
     "quantidade":"2"	
     });
 
    expect(response.status).toBe(200);



  });



  });