import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import apiRoutes from './routes/index.js';
import { errorHandler, notFound } from './middlewares/errorHandler.js';
import './config/database.js'; // Inicializar conexão com a base de dados

const app = express();

// Middlewares globais
app.use(cors({
    origin: process.env.CORS_ORIGIN || '*',
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rota raiz
app.get("/", (req, res) => {
    res.json({
        message: "API do Sistema de Gestão Académica a funcionar 🚀",
        version: "1.0.0",
        endpoints: {
            auth: "/api/auth",
            students: "/api/students",
            classes: "/api/classes",
            grades: "/api/grades",
            status: "/api/status"
        }
    });
});

// Rotas da API
app.use('/api', apiRoutes);

// Middleware para rotas não encontradas
app.use(notFound);

// Middleware de tratamento de erros (deve ser o último)
app.use(errorHandler);

export default app;









