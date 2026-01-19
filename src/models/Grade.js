import db from '../config/database.js';

class Grade {
    // Buscar todas as notas de um estudante
    static async findByStudent(studentId) {
        const [rows] = await db.query(
            `SELECT n.*, d.nome as disciplina_nome, d.codigo as disciplina_codigo
             FROM notas n
             JOIN disciplinas d ON n.disciplina_id = d.id
             WHERE n.estudante_id = ?
             ORDER BY d.nome ASC`,
            [studentId]
        );
        return rows;
    }

    // Buscar notas por disciplina e turma
    static async findByDisciplinaAndTurma(disciplinaId, turmaId) {
        const [rows] = await db.query(
            `SELECT n.*, e.nome as estudante_nome, e.numero as estudante_numero
             FROM notas n
             JOIN estudantes e ON n.estudante_id = e.id
             WHERE n.disciplina_id = ? AND e.turma_id = ?
             ORDER BY e.nome ASC`,
            [disciplinaId, turmaId]
        );
        return rows;
    }

    // Criar ou atualizar nota
    static async upsert(data) {
        const { estudante_id, disciplina_id, trimestre, nota, tipo_avaliacao } = data;

        // Verificar se já existe
        const [existing] = await db.query(
            `SELECT id FROM notas 
             WHERE estudante_id = ? AND disciplina_id = ? AND trimestre = ? AND tipo_avaliacao = ?`,
            [estudante_id, disciplina_id, trimestre, tipo_avaliacao]
        );

        if (existing.length > 0) {
            // Atualizar
            await db.query(
                'UPDATE notas SET nota = ? WHERE id = ?',
                [nota, existing[0].id]
            );
            return this.findById(existing[0].id);
        } else {
            // Criar
            const [result] = await db.query(
                `INSERT INTO notas (estudante_id, disciplina_id, trimestre, nota, tipo_avaliacao)
                 VALUES (?, ?, ?, ?, ?)`,
                [estudante_id, disciplina_id, trimestre, nota, tipo_avaliacao]
            );
            return this.findById(result.insertId);
        }
    }

    // Buscar nota por ID
    static async findById(id) {
        const [rows] = await db.query(
            'SELECT * FROM notas WHERE id = ?',
            [id]
        );
        return rows[0];
    }

    // Calcular média de um estudante numa disciplina
    static async calcularMedia(estudanteId, disciplinaId, trimestre) {
        const [rows] = await db.query(
            `SELECT AVG(nota) as media 
             FROM notas 
             WHERE estudante_id = ? AND disciplina_id = ? AND trimestre = ?`,
            [estudanteId, disciplinaId, trimestre]
        );
        return rows[0].media || 0;
    }

    // Eliminar nota
    static async delete(id) {
        const [result] = await db.query(
            'DELETE FROM notas WHERE id = ?',
            [id]
        );
        return result.affectedRows > 0;
    }
}

export default Grade;
