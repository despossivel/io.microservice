const request = require("supertest");
const app = require('../../../config/server');
const faker = require('faker');


describe("Ações de leilão ", () => {
  // const URI = `/api/pagamento/`;
  const _request_ = async (uri, data) => await request(app).post(uri).send(data);
  //const AUTENTICACAO = [];
  //


  it("Listar participantes", async () => {



    const AUTENTICACAO = await _request_(`/api/usuario/login`, {
      email: 'mattbmoller@gmail.com',
      senha: 'qazx123.'
    });


    const response = await _request_(`/api/leilao/historico/participantes`, {
      token: AUTENTICACAO.body[0].token,
      leilao: "5ce5e5a7f9195c034f170256"
    });

    expect(response.status).toBe(200);
  })




  it("Listar participantes LEILAO NÂO ENCONTRADO", async () => {



    const AUTENTICACAO = await _request_(`/api/usuario/login`, {
      email: 'mattbmoller@gmail.com',
      senha: 'qazx123.'
    });


    const response = await _request_(`/api/leilao/historico/participantes`, {
      token: AUTENTICACAO.body[0].token,
      leilao: "5cbdf657455e0c1a163e5f55"
    });

    expect(response.status).toBe(204);
  })



  it("Listar participantes FALTANDO PARAMETRO", async () => {



    const AUTENTICACAO = await _request_(`/api/usuario/login`, {
      email: 'mattbmoller@gmail.com',
      senha: 'qazx123.'
    });


    const response = await _request_(`/api/leilao/historico/participantes`, {
      token: AUTENTICACAO.body[0].token,
      leilao: null
    });

    expect(response.status).toBe(400);
  })


});