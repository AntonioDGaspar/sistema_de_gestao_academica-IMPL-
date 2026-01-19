import db from '../config/database.js';

class Student {
    // Buscar todos os estudantes
    static async findAll() {
        const [rows] = await db.query(
            'SELECT * FROM estudantes ORDER BY nome ASC'
        );
        return rows;
    }

    // Buscar estudante por ID
    static async findById(id) {
        const [rows] = await db.query(
            'SELECT * FROM estudantes WHERE id = ?',
            [id]
        );
        return rows[0];
    }

    // Buscar estudante por número
    static async findByNumero(numero) {
        const [rows] = await db.query(
            'SELECT * FROM estudantes WHERE numero = ?',
            [numero]
        );
        return rows[0];
    }

    // Criar novo estudante
    static async create(data) {
        const { numero, nome, data_nascimento, genero, turma_id, encarregado_id } = data;

        const [result] = await db.query(
            `INSERT INTO estudantes (numero, nome, data_nascimento, genero, turma_id, encarregado_id) 
             VALUES (?, ?, ?, ?, ?, ?)`,
            [numero, nome, data_nascimento, genero, turma_id, encarregado_id]
        );

        return this.findById(result.insertId);
    }

    // Atualizar estudante
    static async update(id, data) {
        const { numero, nome, data_nascimento, genero, turma_id, encarregado_id } = data;

        await db.query(
            `UPDATE estudantes 
             SET numero = ?, nome = ?, data_nascimento = ?, genero = ?, 
                 turma_id = ?, encarregado_id = ?
             WHERE id = ?`,
            [numero, nome, data_nascimento, genero, turma_id, encarregado_id, id]
        );

        return this.findById(id);
    }

    // Eliminar estudante
    static async delete(id) {
        const [result] = await db.query(
            'DELETE FROM estudantes WHERE id = ?',
            [id]
        );
        return result.affectedRows > 0;
    }

    // Buscar estudantes por turma
    static async findByTurma(turmaId) {
        const [rows] = await db.query(
            'SELECT * FROM estudantes WHERE turma_id = ? ORDER BY nome ASC',
            [turmaId]
        );
        return rows;
    }

    // Buscar estudantes por encarregado
    static async findByEncarregado(encarregadoId) {
        const [rows] = await db.query(
            'SELECT * FROM estudantes WHERE encarregado_id = ? ORDER BY nome ASC',
            [encarregadoId]
        );
        return rows;
    }

    // Contar total de estudantes
    static async count() {
        const [rows] = await db.query('SELECT COUNT(*) as total FROM estudantes');
        return rows[0].total;
    }
}

export default Student;
