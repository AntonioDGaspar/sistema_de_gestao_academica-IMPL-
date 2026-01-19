import express from 'express';
import {
    getAllClasses,
    getClassById,
    createClass,
    updateClass,
    deleteClass,
    getClassesByClasse
} from '../controllers/classController.js';
import { authenticate, authorize } from '../middlewares/auth.js';

const router = express.Router();

// Todas as rotas requerem autenticação
router.use(authenticate);

// GET /api/classes - Obter todas as turmas
router.get('/', getAllClasses);

// GET /api/classes/classe/:classe - Obter turmas por classe (10ª, 11ª, etc.)
router.get('/classe/:classe', getClassesByClasse);

// GET /api/classes/:id - Obter turma por ID
router.get('/:id', getClassById);

// POST /api/classes - Criar nova turma (apenas admin)
router.post('/', authorize('admin'), createClass);

// PUT /api/classes/:id - Atualizar turma (apenas admin)
router.put('/:id', authorize('admin'), updateClass);

// DELETE /api/classes/:id - Eliminar turma (apenas admin)
router.delete('/:id', authorize('admin'), deleteClass);

export default router;
