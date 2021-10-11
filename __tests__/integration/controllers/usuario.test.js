const request = require("supertest");
const app = require('../../../config/server');
const faker = require('faker');


describe("Ações de Usuario", () => {
  const URI = `/api/usuario/`;
  const _request_ = async (uri, data) => await request(app).post(uri).send(data);
  const AUTENTICACAO = [];


  it("Efetuar login usuario", async () => {
    const response = await _request_(`${URI}login`, { email: 'mattbmoller@gmail.com',
                                                              senha: 'qazx123.'
                                                            });
    AUTENTICACAO.push(response.body[0]);
    expect(response.status).toBe(200);

  });

 
  it("Efetuar login usuario não encontrado ou senha errada", async () => {

    const response = await _request_(`${URI}login`, { email: 'mattbmoller@gmail.com',
                                                              senha: 'qazx1'
                                                            });

    expect(response.status).toBe(204);
  });


  // //AMDINSTRADOR
  it("Efetuar login usuario ADMISTRADOR", async () => {

    const response = await _request_(`${URI}login/admin`, { email: 'mattbmoller@gmail.com',
                                                                    senha: 'qazx123.'
                                                                  });
    expect(response.status).toBe(200);
  });



  it("Efetuar login usuario ADMISTRADOR não encontrado ou senha errada", async () => {

    const response = await _request_(`${URI}login/admin`, { email: 'mattbmoller@gmail.com',
                                                                    senha: 'qazx1'
                                                                  });

    expect(response.status).toBe(204);
  });



  it("Cadastrar novo usuario", async () => {

    const response = await _request_(`${URI}cadastro`, {
                                                                nome: "Matheus",
                                                                usuario: "despossivel",
                                                                telefone: "(94) 9 9138-4960",
                                                                email: "matheus@centavus.com",
                                                                senha: "teste#048@"
                                                              });
                                                          
    expect(response.status).toBe(200);


  });




  it("Editar usuario",async ()=>{

    const response = await _request_(`${URI}editar`, {
      token:AUTENTICACAO[0].token,
      nome: "Matheus",
      usuario: "despossivel",
      telefone: "(94) 9 9138-4960",
      email: "matheus@centavus.com",
      senha: "teste#048@"
    });

    expect(response.status).toBe(200);

  })
  


  it("Editar usuario TOKEN INVALIDO/FALTANDO PARAMETRO",async ()=>{

    const response = await _request_(`${URI}editar`, {
      nome: "Matheus",
      usuario: "despossivel",
      telefone: "(94) 9 9138-4960",
      email: "matheus@centavus.com",
      senha: "teste#048@"
    });

    expect(response.status).toBe(400);

  })
  
 
  it("Comprar lances", async () => {
 
    const response = await _request_(`${URI}comprar/lances`, {
      token: AUTENTICACAO[0].token,
      _id: AUTENTICACAO[0]._id,
      quantidade: "23"
    });
 
    expect(response.status).toBe(200);


  });

  // //Comprar Lances não permitido
  it("Comprar lances TOKEN INVALIDO/NÃO PERMITIDO", async () => {
 
    const response = await _request_(`${URI}comprar/lances`, {
      token: "AiOjE1NTc2ODc4NTd9.81t9myofQJxOjN1aLq6bmklHnl_UaIsdm-TAaIT-Qgo",
      _id: "5cbdf657455e0c1a163e5f55",
      quantidade: "23"
    });
 
    expect(response.status).toBe(401);


  });


  it("Confirmar trocar premio", async ()=>{
 
    const response = await _request_(`${URI}troca/confirmar`, {
      token:AUTENTICACAO[0].token,
      _idUsuario:AUTENTICACAO[0]._id,
      _idLeilao:"5cbdf657455e0c1a163e5f55",
      });
 
    expect(response.status).toBe(200);
  })
 

  it("Confirmar trocar premio FALTANDO PARAMETRO", async ()=>{
 
    const response = await _request_(`${URI}troca/confirmar`, {
      token:AUTENTICACAO[0].token,
      _idUsuario:AUTENTICACAO[0]._id,
      _idLeilao:"",
      });
 
    expect(response.status).toBe(400);
  })
 




it("Criar novo endereço", async ()=>{

  const response = await _request_(`${URI}novo/endereco`, {
    token:AUTENTICACAO[0].token,
    _idUsuario:AUTENTICACAO[0]._id,
    endereco:faker.address.streetName(),
    numero:faker.address.streetPrefix(),
    cep:faker.address.zipCode(),
    cidade:faker.address.city(),
    estado:faker.address.state()
  });

  expect(response.status).toBe(200);


})




it("Criar novo endereço FALTANDO PARAMETRO", async ()=>{

  const response = await _request_(`${URI}novo/endereco`, {
    token:AUTENTICACAO[0].token,
    _idUsuario:AUTENTICACAO[0]._id,
    endereco:faker.address.streetName(),
    numero:faker.address.streetPrefix(),
    cep:faker.address.zipCode(),
    estado:faker.address.state()
  });

  expect(response.status).toBe(400);


})

it("Listar endereços", async()=>{

  const response = await _request_(`${URI}enderecos`, {
    token:AUTENTICACAO[0].token,
    _idUsuario:AUTENTICACAO[0]._id
    });

  expect(response.status).toBe(200);

});


it("Listar endereços TOKEN INVALIDO/FALTANDO PARAMETROS", async()=>{

  const response = await _request_(`${URI}enderecos`, {
    token:"sdasdasdasd",
    _idUsuario:AUTENTICACAO[0]._id
    });

  expect(response.status).toBe(401);

});






it("Alterar foto perfil", async ()=>{

  const response = await _request_(`${URI}alterar/foto`, {
    token:AUTENTICACAO[0].token,
	  _idUsuario:AUTENTICACAO[0]._id,
	  file:"foto"
});

  expect(response.status).toBe(200);


})


it("Alterar foto perfil TOKEN INVALIDO/FALTANDO PARAMETRO", async ()=>{

  const response = await _request_(`${URI}alterar/foto`, {
    token:AUTENTICACAO[0].token,
	  _idUsuario:AUTENTICACAO[0]._id,
	  file:""
});

  expect(response.status).toBe(400);


})


it("Receber premio em casa", async()=>{

  const response = await _request_(`${URI}receber/produto`, {
    token:AUTENTICACAO[0].token,
    _idUsuario:AUTENTICACAO[0]._id,
    _idLeilao:"5cbdf657455e0c1a163e5f55",
    _idEndereco:"5cbdf657455e0c1a163e5f55"
    });

  expect(response.status).toBe(200);

})



it("Receber premio em casa FALTANDO PARAMETRO", async()=>{

  const response = await _request_(`${URI}receber/produto`, {
    token:AUTENTICACAO[0].token,
    _idUsuario:AUTENTICACAO[0]._id,
    _idLeilao:"",
    _idEndereco:""
    });

  expect(response.status).toBe(400);

})



it("Recuperar senha", async()=>{
  const response = await _request_(`${URI}recuperar/senha`, {
    email:AUTENTICACAO[0].email
    });

  expect(response.status).toBe(200);

});

it("Recuperar senha USUARIO NÃO ENCONTRADO", async()=>{
  const response = await _request_(`${URI}recuperar/senha`, {
    email:faker.internet.email()
    });

  expect(response.status).toBe(204);

});


it("Recuperar senha FALTANDO PARAMETRO", async()=>{
  const response = await _request_(`${URI}recuperar/senha`, {
    email:null
    });

  expect(response.status).toBe(400);

});

it("Salvar OneSignalId", async ()=>{
  const response = await _request_(`${URI}notificacao/salvar/id`, {
    token:AUTENTICACAO[0].token,
    OneSignalId:"3MDU3LCJleHAiOjE1NTc2",
    _id:AUTENTICACAO[0]._id
  });

  expect(response.status).toBe(200);


});


it("Salvar OneSignalId FALTANDO PARAMETRO", async ()=>{
  const response = await _request_(`${URI}notificacao/salvar/id`, {
    token:AUTENTICACAO[0].token,
    OneSignalId:null,
    _id:AUTENTICACAO[0]._id
  });

  expect(response.status).toBe(400);


});



});

