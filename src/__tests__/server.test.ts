import { connectDB } from '../server';
import db from '../config/db';


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

