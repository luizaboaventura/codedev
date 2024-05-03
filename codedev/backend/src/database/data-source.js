import "reflect-metadata";
import { DataSource } from "typeorm";
import UserEntity from "../app/entities/User.js";

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "root",
    database: "codedev",
    synchronize: true,
    logging: false,
    entities: [UserEntity],
    migrations: [],
    subscribers: []
})