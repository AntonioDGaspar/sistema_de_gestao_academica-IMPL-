import Student from '../models/Student.js';

// Obter todos os estudantes
export const getAllStudents = async (req, res, next) => {
    try {
        const students = await Student.findAll();
        res.json({
            success: true,
            data: students,
            total: students.length
        });
    } catch (error) {
        next(error);
    }
};

// Obter estudante por ID
export const getStudentById = async (req, res, next) => {
    try {
        const student = await Student.findById(req.params.id);

        if (!student) {
            return res.status(404).json({
                success: false,
                error: 'Estudante não encontrado'
            });
        }

        res.json({
            success: true,
            data: student
        });
    } catch (error) {
        next(error);
    }
};

// Criar novo estudante
export const createStudent = async (req, res, next) => {
    try {
        const { numero, nome, data_nascimento, genero, turma_id, encarregado_id } = req.body;

        // Validação básica
        if (!numero || !nome || !data_nascimento || !genero) {
            return res.status(400).json({
                success: false,
                error: 'Campos obrigatórios: numero, nome, data_nascimento, genero'
            });
        }

        // Verificar se o número já existe
        const existing = await Student.findByNumero(numero);
        if (existing) {
            return res.status(400).json({
                success: false,
                error: 'Já existe um estudante com este número'
            });
        }

        const student = await Student.create(req.body);

        res.status(201).json({
            success: true,
            data: student,
            message: 'Estudante criado com sucesso'
        });
    } catch (error) {
        next(error);
    }
};

// Atualizar estudante
export const updateStudent = async (req, res, next) => {
    try {
        const student = await Student.findById(req.params.id);

        if (!student) {
            return res.status(404).json({
                success: false,
                error: 'Estudante não encontrado'
            });
        }

        const updatedStudent = await Student.update(req.params.id, req.body);

        res.json({
            success: true,
            data: updatedStudent,
            message: 'Estudante atualizado com sucesso'
        });
    } catch (error) {
        next(error);
    }
};

// Eliminar estudante
export const deleteStudent = async (req, res, next) => {
    try {
        const student = await Student.findById(req.params.id);

        if (!student) {
            return res.status(404).json({
                success: false,
                error: 'Estudante não encontrado'
            });
        }

        await Student.delete(req.params.id);

        res.json({
            success: true,
            message: 'Estudante eliminado com sucesso'
        });
    } catch (error) {
        next(error);
    }
};

// Obter estudantes por turma
export const getStudentsByTurma = async (req, res, next) => {
    try {
        const students = await Student.findByTurma(req.params.turmaId);

        res.json({
            success: true,
            data: students,
            total: students.length
        });
    } catch (error) {
        next(error);
    }
};
