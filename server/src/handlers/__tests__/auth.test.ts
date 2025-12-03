import request from 'supertest';
import server from '../../server';

describe('POST /api/auth/register', () => {
    it('should create a new user', async () => {
        const response = await request(server).post('/api/auth/register').send({
            name: "Test User",
            email: "dembow@email.com",
            password: "password123"
        });

        expect(response.status).toBe(201);
        expect(response.text).toBe('Cuenta creada correctamente');
    });

    it('should check for duplicate emails', async () => {
         const response = await request(server).post('/api/auth/register').send({
            name: "Test User",
            email: "dembow@email.com",
            password: "password123"
        });
        expect(response.status).toBe(409);
    });
});

jest.mock('../../emails/AuthEmail', () => ({
    AuthEmail: {
        sendPasswordResetToken: jest.fn()
    }
}));

describe('POST /api/auth/forgot-password', () => {
    it('Should return a 404 if user does not exist', async () => {
        const response = await request(server)
            .post('/api/auth/forgot-password')
            .send({ email: 'correo_no_existente@correo.com' });

        expect(response.status).toBe(404);
        expect(response.body).toHaveProperty('error');
        expect(response.body.error).toBe('El usuario no existe');
    });

    it('Should send an email if user exists', async () => {
        await request(server).post('/api/auth/register').send({
            name: 'Test Forgot',
            email: 'forgot@test.com',
            password: 'password123'
        });

        const response = await request(server)
            .post('/api/auth/forgot-password')
            .send({ email: 'forgot@test.com' });

        expect(response.status).toBe(200);
        expect(response.body).toBe('Hemos enviado un coreeo con las instrucciones');
    });
});

describe('POST /api/auth/validate-token', () => {
    it('Should return error for invalid token', async () => {
        const response = await request(server)
            .post('/api/auth/validate-token')
            .send({ token: 'TOKEN_FALSO_123' });

        expect(response.status).toBe(403);
        expect(response.body).toHaveProperty('error');
        expect(response.body.error).toBe('Token no válido');
    });
});