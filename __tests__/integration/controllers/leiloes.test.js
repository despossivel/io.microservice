const request = require("supertest");
const app = require('../../../config/server');
const faker = require('faker');


describe("Ações de leilões ", () => {
  const _request_ = async (uri, data) => await request(app).post(uri).send(data);
  

  it("Cadastrar leilão", async () => {
    const AUTENTICACAO = await _request_(`/api/usuario/login`, {
        email: 'mattbmoller@gmail.com',
        senha: 'qazx123.'
      });
  
  
      const response = await _request_(`/api/leiloes/cadastrar`, {
        token:AUTENTICACAO.body[0].token,
        dataFinal:"2019-12-21",
        dataInicio:"2019-12-21",
        detalhes:"teste",
        foto:"tteste.jpg",
        horarioFinal:"10:00",
        horarioInicio:"10:00",
        titulo:"LEILAO TESTE",
        valorUnitario:"12,00"
    });
  
      expect(response.status).toBe(200);



  });


  it("Cadastrar leilão FALTANDO PARAMETROS", async () => {
    const AUTENTICACAO = await _request_(`/api/usuario/login`, {
        email: 'mattbmoller@gmail.com',
        senha: 'qazx123.'
      });
  
  
      const response = await _request_(`/api/leiloes/cadastrar`, {
        token:AUTENTICACAO.body[0].token,
        dataFinal:null,
        dataInicio:null,
        detalhes:null,
        foto:null,
        horarioFinal:null,
        horarioInicio:null,
        titulo:null,
        valorUnitario:null
    });
  
      expect(response.status).toBe(400);



  });



  it("Listar Arrematados", async()=>{
    const AUTENTICACAO = await _request_(`/api/usuario/login`, {
        email: 'mattbmoller@gmail.com',
        senha: 'qazx123.'
      });
  
  
      const response = await _request_(`/api/leiloes/arrematados/listar`, {
        token:AUTENTICACAO.body[0].token
    });
  
      expect(response.status).toBe(200);
   
  });



  it("Listar Ganhos pelo usuario ", async()=>{
    const AUTENTICACAO = await _request_(`/api/usuario/login`, {
        email: 'mattbmoller@gmail.com',
        senha: 'qazx123.'
      });
  
  
      const response = await _request_(`/api/leiloes/historico/queGanhei`, {
        token:AUTENTICACAO.body[0].token,
        _idUsuario:AUTENTICACAO.body[0]._id
    });
  
      expect(response.status).toBe(200);
    //   expect(response.status).toBe(204);
   
  });



  it("Listar Ganhos pelo usuario NADA ENCONTRADO", async()=>{
    const AUTENTICACAO = await _request_(`/api/usuario/login`, {
        email: 'mattbmoller@gmail.com',
        senha: 'qazx123.'
      });
  
  
      const response = await _request_(`/api/leiloes/historico/queGanhei`, {
        token:AUTENTICACAO.body[0].token,
        _idUsuario:"5cbdf657455e0c1a163e5f55"
    });
  
      expect(response.status).toBe(204);
   
  });


  it("Listar Ganhos pelo usuario FALTANDO PARAMETROS", async()=>{
    const AUTENTICACAO = await _request_(`/api/usuario/login`, {
        email: 'mattbmoller@gmail.com',
        senha: 'qazx123.'
      });
  
  
      const response = await _request_(`/api/leiloes/historico/queGanhei`, {
        token:AUTENTICACAO.body[0].token,
        _idUsuario:null
    });
  
      expect(response.status).toBe(400);
   
  });





  // it("Listar Participados pelo usuario", async()=>{
  //   const AUTENTICACAO = await _request_(`/api/usuario/login`, {
  //       email: 'mattbmoller@gmail.com',
  //       senha: 'qazx123.'
  //     });
  
  
  //     const response = await _request_(`/api/leiloes/historico/queParticipei`, {
  //       token:AUTENTICACAO.body[0].token,
  //       _idUsuario:AUTENTICACAO.body[0]._id
  //   });
  
  //     expect(response.status).toBe(200);
   
  // });



  it("Listar Participados pelo usuario NADA ENCONTRADO", async()=>{
    const AUTENTICACAO = await _request_(`/api/usuario/login`, {
        email: 'mattbmoller@gmail.com',
        senha: 'qazx123.'
      });
  
  
      const response = await _request_(`/api/leiloes/historico/queParticipei`, {
        token:AUTENTICACAO.body[0].token,
        _idUsuario:"5cbdf657455e0c1a163e5f55"
    });
  
      expect(response.status).toBe(204);
   
  });



  it("Listar Participados pelo usuario FALTANDO PARAMETROS", async()=>{
    const AUTENTICACAO = await _request_(`/api/usuario/login`, {
        email: 'mattbmoller@gmail.com',
        senha: 'qazx123.'
      });
  
  
      const response = await _request_(`/api/leiloes/historico/queParticipei`, {
        token:AUTENTICACAO.body[0].token,
        _idUsuario:null
    });
  
      expect(response.status).toBe(400);
   
  });



  it("Listar todos", async()=>{
    const AUTENTICACAO = await _request_(`/api/usuario/login`, {
        email: 'mattbmoller@gmail.com',
        senha: 'qazx123.'
      });
  
  
      const response = await _request_(`/api/leiloes/listar`, {
        token:AUTENTICACAO.body[0].token,
        _idUsuario:null
    });
  
      expect(response.status).toBe(200);
   
  });


});