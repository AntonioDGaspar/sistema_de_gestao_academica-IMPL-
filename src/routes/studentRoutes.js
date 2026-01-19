import express from 'express';
import {
    getAllStudents,
    getStudentById,
    createStudent,
    updateStudent,
    deleteStudent,
    getStudentsByTurma
} from '../controllers/studentController.js';
import { authenticate, authorize } from '../middlewares/auth.js';

const router = express.Router();

// Todas as rotas requerem autenticação
router.use(authenticate);

// GET /api/students - Obter todos os estudantes
router.get('/', getAllStudents);

// GET /api/students/:id - Obter estudante por ID
router.get('/:id', getStudentById);

// GET /api/students/turma/:turmaId - Obter estudantes por turma
router.get('/turma/:turmaId', getStudentsByTurma);

// POST /api/students - Criar novo estudante (apenas admin e professor)
router.post('/', authorize('admin', 'teacher'), createStudent);

// PUT /api/students/:id - Atualizar estudante (apenas admin e professor)
router.put('/:id', authorize('admin', 'teacher'), updateStudent);

// DELETE /api/students/:id - Eliminar estudante (apenas admin)
router.delete('/:id', authorize('admin'), deleteStudent);

export default router;
