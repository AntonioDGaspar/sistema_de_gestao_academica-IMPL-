import db from '../config/database.js';

class Class {
    // Buscar todas as turmas
    static async findAll() {
        const [rows] = await db.query(
            'SELECT * FROM turmas ORDER BY nome ASC'
        );
        return rows;
    }

    // Buscar turma por ID
    static async findById(id) {
        const [rows] = await db.query(
            'SELECT * FROM turmas WHERE id = ?',
            [id]
        );
        return rows[0];
    }

    // Criar nova turma
    static async create(data) {
        const { nome, ano_lectivo, classe, curso } = data;

        const [result] = await db.query(
            'INSERT INTO turmas (nome, ano_lectivo, classe, curso) VALUES (?, ?, ?, ?)',
            [nome, ano_lectivo, classe, curso]
        );

        return this.findById(result.insertId);
    }

    // Atualizar turma
    static async update(id, data) {
        const { nome, ano_lectivo, classe, curso } = data;

        await db.query(
            'UPDATE turmas SET nome = ?, ano_lectivo = ?, classe = ?, curso = ? WHERE id = ?',
            [nome, ano_lectivo, classe, curso, id]
        );

        return this.findById(id);
    }

    // Eliminar turma
    static async delete(id) {
        const [result] = await db.query(
            'DELETE FROM turmas WHERE id = ?',
            [id]
        );
        return result.affectedRows > 0;
    }

    // Buscar turmas por classe (10ª, 11ª, 12ª, 13ª)
    static async findByClasse(classe) {
        const [rows] = await db.query(
            'SELECT * FROM turmas WHERE classe = ? ORDER BY nome ASC',
            [classe]
        );
        return rows;
    }

    // Contar estudantes numa turma
    static async countStudents(id) {
        const [rows] = await db.query(
            'SELECT COUNT(*) as total FROM estudantes WHERE turma_id = ?',
            [id]
        );
        return rows[0].total;
    }

    // Buscar turma com contagem de estudantes
    static async findWithStudentCount(id) {
        const [rows] = await db.query(
            `SELECT t.*, COUNT(e.id) as total_estudantes
             FROM turmas t
             LEFT JOIN estudantes e ON t.id = e.turma_id
             WHERE t.id = ?
             GROUP BY t.id`,
            [id]
        );
        return rows[0];
    }
}

export default Class;
