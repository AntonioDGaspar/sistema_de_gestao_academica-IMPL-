import express from 'express';
import authRoutes from './authRoutes.js';
import studentRoutes from './studentRoutes.js';
import classRoutes from './classRoutes.js';
import gradeRoutes from './gradeRoutes.js';

const router = express.Router();

// Rotas de autenticação
router.use('/auth', authRoutes);

// Rotas de estudantes
router.use('/students', studentRoutes);

// Rotas de turmas
router.use('/classes', classRoutes);

// Rotas de notas
router.use('/grades', gradeRoutes);

// Rota de status da API
router.get('/status', (req, res) => {
    res.json({
        success: true,
        message: 'API do Sistema de Gestão Académica está a funcionar',
        version: '1.0.0',
        timestamp: new Date().toISOString()
    });
});

export default router;
