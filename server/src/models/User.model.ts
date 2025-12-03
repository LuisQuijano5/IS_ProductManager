import { Table, Column, Model, DataType, Default, Unique } from "sequelize-typescript";

@Table({
    tableName: 'users'
})
class User extends Model {
    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    name: string;

    @Unique
    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    email: string;

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    password: string;

    @Column({
        type: DataType.STRING,
        allowNull: true
    })
    image: string; 

    @Default(false)
    @Column({
        type: DataType.BOOLEAN
    })
    declare confirmed: boolean;

    @Column({
        type: DataType.STRING,
        allowNull: true
    })
    declare token: string;
}

export default User;