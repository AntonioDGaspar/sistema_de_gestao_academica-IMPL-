import Class from '../models/Class.js';

// Obter todas as turmas
export const getAllClasses = async (req, res, next) => {
    try {
        const classes = await Class.findAll();

        res.json({
            success: true,
            data: classes,
            total: classes.length
        });
    } catch (error) {
        next(error);
    }
};

// Obter turma por ID
export const getClassById = async (req, res, next) => {
    try {
        const turma = await Class.findWithStudentCount(req.params.id);

        if (!turma) {
            return res.status(404).json({
                success: false,
                error: 'Turma não encontrada'
            });
        }

        res.json({
            success: true,
            data: turma
        });
    } catch (error) {
        next(error);
    }
};

// Criar nova turma
export const createClass = async (req, res, next) => {
    try {
        const { nome, ano_lectivo, classe, curso } = req.body;

        // Validação de campos obrigatórios
        if (!nome || !ano_lectivo || !classe) {
            return res.status(400).json({
                success: false,
                error: 'Campos obrigatórios: nome, ano_lectivo, classe'
            });
        }

        // Validação: apenas classes 10, 11, 12 e 13 são permitidas
        const classesPermitidas = ['10', '11', '12', '13'];
        if (!classesPermitidas.includes(classe)) {
            return res.status(400).json({
                success: false,
                error: 'Classe inválida. Este sistema suporta apenas as classes 10, 11, 12 e 13.'
            });
        }

        const turma = await Class.create(req.body);

        res.status(201).json({
            success: true,
            data: turma,
            message: 'Turma criada com sucesso'
        });
    } catch (error) {
        next(error);
    }
};

// Atualizar turma
export const updateClass = async (req, res, next) => {
    try {
        const turma = await Class.findById(req.params.id);

        if (!turma) {
            return res.status(404).json({
                success: false,
                error: 'Turma não encontrada'
            });
        }

        // Validação: apenas classes 10, 11, 12 e 13 são permitidas
        if (req.body.classe) {
            const classesPermitidas = ['10', '11', '12', '13'];
            if (!classesPermitidas.includes(req.body.classe)) {
                return res.status(400).json({
                    success: false,
                    error: 'Classe inválida. Este sistema suporta apenas as classes 10, 11, 12 e 13.'
                });
            }
        }

        const updatedClass = await Class.update(req.params.id, req.body);

        res.json({
            success: true,
            data: updatedClass,
            message: 'Turma atualizada com sucesso'
        });
    } catch (error) {
        next(error);
    }
};

// Eliminar turma
export const deleteClass = async (req, res, next) => {
    try {
        const turma = await Class.findById(req.params.id);

        if (!turma) {
            return res.status(404).json({
                success: false,
                error: 'Turma não encontrada'
            });
        }

        // Verificar se a turma tem estudantes
        const studentCount = await Class.countStudents(req.params.id);
        if (studentCount > 0) {
            return res.status(400).json({
                success: false,
                error: 'Não é possível eliminar uma turma com estudantes'
            });
        }

        await Class.delete(req.params.id);

        res.json({
            success: true,
            message: 'Turma eliminada com sucesso'
        });
    } catch (error) {
        next(error);
    }
};

// Obter turmas por classe (10ª, 11ª, etc.)
export const getClassesByClasse = async (req, res, next) => {
    try {
        const { classe } = req.params;

        // Validação: apenas classes 10, 11, 12 e 13 são permitidas
        const classesPermitidas = ['10', '11', '12', '13'];
        if (!classesPermitidas.includes(classe)) {
            return res.status(400).json({
                success: false,
                error: 'Classe inválida. Este sistema suporta apenas as classes 10, 11, 12 e 13.'
            });
        }

        const classes = await Class.findByClasse(req.params.classe);

        res.json({
            success: true,
            data: classes,
            total: classes.length
        });
    } catch (error) {
        next(error);
    }
};
