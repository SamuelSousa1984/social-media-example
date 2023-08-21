const request = require('supertest');
const app = require('../server');

describe('teste de API', () => {
    test('Deve retornar status 200 ao fazer login válido', async () => {
        const response =  await request(app)
            .post('/api/login')
            .send({ email: 'usuario@example.com', password: 'senha123' });

        expect(response.status).toBe(200);
    });

    test('Deve retornar status 201 ao fazer registro de novo usuário', async () => {
        const response =  await request(app)
            .get('/api/register')
            .send({ username: 'novousuario', email: 'novousuario@example.com', password: 'novasenha' });

        expect(response.status).toBe(201);
    });

    test('Deve retornar status 200 ao acessar o perfil do usuario autenticado', async () => {
        const response = await request(app)
            .get('/api/users/profile')
            .set('Authorization', 'Bearer SEU_TOKEN_AQUI') //substituir por token válido

        expect(response.status).toBe(200)
    });

    test('Deve retornar status 200 ao acessar feed de notícias', async () => {
        const response = await request(app)
            .get('/api/newsfeed')
            .set('Authorization', 'Bearer SEU_TOKEN_AQUI') //substituir por token válido

        expect(response.status).toBe(200)
    });

    test('Deve retornar status 201 ao criar um novo post', async () => {
        const response = await request(app)
            .post('/api/posts')
            .set('Authorization', 'Bearer SEU_TOKEN_AQUI') //substituir por token válido
            .send({ content: 'Conteúdo do post' })

        expect(response.status).toBe(201)
    });
});