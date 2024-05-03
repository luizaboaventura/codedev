import "reflect-metadata";
import express from 'express';
import cors from 'cors';
import { AppDataSource } from "./database/data-source.js";
import routers from "./app/routes/routes.js";

const app = express();

// Habilitar o uso do cors
app.use(cors());

// Padrão de dados Json
app.use(express.json());

// Rotas
app.use(routers);

// Conexão com banco
AppDataSource.initialize().then(async (connection) => {
    console.log("Database OK");
    app.listen(3333, () => {
        console.log("Server started on http://localhost:3333");
    });
}).catch((error) => {
    console.error("Database connection error:", error);
});