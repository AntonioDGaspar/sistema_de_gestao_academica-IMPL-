import express from 'express';
import {
    getStudentGrades,
    getGradesByDisciplinaAndTurma,
    upsertGrade,
    calcularMedia,
    deleteGrade
} from '../controllers/gradeController.js';
import { authenticate, authorize } from '../middlewares/auth.js';

const router = express.Router();

// Todas as rotas requerem autenticação
router.use(authenticate);

// GET /api/grades/student/:studentId - Obter notas de um estudante
router.get('/student/:studentId', getStudentGrades);

// GET /api/grades/disciplina/:disciplinaId/turma/:turmaId - Obter notas por disciplina e turma
router.get('/disciplina/:disciplinaId/turma/:turmaId', getGradesByDisciplinaAndTurma);

// GET /api/grades/media/:estudanteId/:disciplinaId/:trimestre - Calcular média
router.get('/media/:estudanteId/:disciplinaId/:trimestre', calcularMedia);

// POST /api/grades - Criar ou atualizar nota (apenas admin e professor)
router.post('/', authorize('admin', 'teacher'), upsertGrade);

// DELETE /api/grades/:id - Eliminar nota (apenas admin)
router.delete('/:id', authorize('admin'), deleteGrade);

export default router;
