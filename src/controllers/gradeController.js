import Grade from '../models/Grade.js';

// Obter notas de um estudante
export const getStudentGrades = async (req, res, next) => {
    try {
        const grades = await Grade.findByStudent(req.params.studentId);

        res.json({
            success: true,
            data: grades,
            total: grades.length
        });
    } catch (error) {
        next(error);
    }
};

// Obter notas por disciplina e turma
export const getGradesByDisciplinaAndTurma = async (req, res, next) => {
    try {
        const { disciplinaId, turmaId } = req.params;
        const grades = await Grade.findByDisciplinaAndTurma(disciplinaId, turmaId);

        res.json({
            success: true,
            data: grades,
            total: grades.length
        });
    } catch (error) {
        next(error);
    }
};

// Criar ou atualizar nota
export const upsertGrade = async (req, res, next) => {
    try {
        const { estudante_id, disciplina_id, trimestre, nota, tipo_avaliacao } = req.body;

        // Validação
        if (!estudante_id || !disciplina_id || !trimestre || nota === undefined || !tipo_avaliacao) {
            return res.status(400).json({
                success: false,
                error: 'Campos obrigatórios: estudante_id, disciplina_id, trimestre, nota, tipo_avaliacao'
            });
        }

        // Validar nota (0-20)
        if (nota < 0 || nota > 20) {
            return res.status(400).json({
                success: false,
                error: 'A nota deve estar entre 0 e 20'
            });
        }

        const grade = await Grade.upsert(req.body);

        res.json({
            success: true,
            data: grade,
            message: 'Nota registada com sucesso'
        });
    } catch (error) {
        next(error);
    }
};

// Calcular média
export const calcularMedia = async (req, res, next) => {
    try {
        const { estudanteId, disciplinaId, trimestre } = req.params;

        const media = await Grade.calcularMedia(estudanteId, disciplinaId, trimestre);

        res.json({
            success: true,
            data: {
                estudante_id: estudanteId,
                disciplina_id: disciplinaId,
                trimestre: trimestre,
                media: parseFloat(media).toFixed(2)
            }
        });
    } catch (error) {
        next(error);
    }
};

// Eliminar nota
export const deleteGrade = async (req, res, next) => {
    try {
        const deleted = await Grade.delete(req.params.id);

        if (!deleted) {
            return res.status(404).json({
                success: false,
                error: 'Nota não encontrada'
            });
        }

        res.json({
            success: true,
            message: 'Nota eliminada com sucesso'
        });
    } catch (error) {
        next(error);
    }
};
