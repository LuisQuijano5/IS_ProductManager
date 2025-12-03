import { getPreparedAssociationOptions, Sequelize } from "sequelize-typescript";
import dotenv from 'dotenv';

dotenv.config()

const db = new Sequelize(process.env.DATABASE_URL!, {
    models: [__dirname + '/../models/**/*'],
    logging: false,
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false,
            ciphers: 'DEFAULT@SECLEVEL=0'
        }
    }
});

export default db;