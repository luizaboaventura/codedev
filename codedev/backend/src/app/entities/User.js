import { EntitySchema } from 'typeorm';

const UserEntity = new EntitySchema({
    name: 'user',
    tableName: 'users',
    columns: {
        id: {
            primary: true,
            type: 'int',
            generated: true,
        },
        name: {
            type: 'varchar',
            length: 255,
            nullable: false
        },
        email: {
            type: 'varchar',
            length: 255,
            nullable: false
        },
        password: {
            type: 'varchar',
            length: 255,
            nullable: false
        },
    }
});

export default UserEntity;
