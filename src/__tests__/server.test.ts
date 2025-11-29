import request from "supertest";
import server, { connectDB } from '../server';
import db from '../config/db'

describe('GET /api', () => {
    it('should send back a json response', async () => {
        const res = await request(server).get('/api');

        expect(res.status).toBe(200);
        expect(res.headers['content-type']).toMatch(/json/);
        expect(res.body.msg).toBe('Desde API');
    })
});

jest.mock('../config/db');

describe('connectDB', () => {
    it('Should handle db connection error', async () => {
        jest.spyOn(db, 'authenticate').mockRejectedValueOnce(new Error('Algo salio mal en la conexion a la db'));
        const consoleSpy = jest.spyOn(console, 'log');

        await connectDB();

        expect(consoleSpy).toHaveBeenCalledWith(
            expect.stringContaining('Algo salio mal en la conexion a la db')
        );
    });
});

