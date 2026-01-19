import db from '../config/database.js';
import bcrypt from 'bcryptjs';

class User {
    // Buscar utilizador por email
    static async findByEmail(email) {
        const [rows] = await db.query(
            'SELECT * FROM utilizadores WHERE email = ?',
            [email]
        );
        return rows[0];
    }

    // Buscar utilizador por ID
    static async findById(id) {
        const [rows] = await db.query(
            'SELECT id, nome, email, role, created_at FROM utilizadores WHERE id = ?',
            [id]
        );
        return rows[0];
    }

    // Criar novo utilizador
    static async create(data) {
        const { nome, email, password, role } = data;

        // Hash da password
        const hashedPassword = await bcrypt.hash(password, 10);

        const [result] = await db.query(
            'INSERT INTO utilizadores (nome, email, password, role) VALUES (?, ?, ?, ?)',
            [nome, email, hashedPassword, role || 'student']
        );

        return this.findById(result.insertId);
    }

    // Verificar password
    static async verifyPassword(plainPassword, hashedPassword) {
        return await bcrypt.compare(plainPassword, hashedPassword);
    }

    // Atualizar utilizador
    static async update(id, data) {
        const { nome, email, role } = data;

        await db.query(
            'UPDATE utilizadores SET nome = ?, email = ?, role = ? WHERE id = ?',
            [nome, email, role, id]
        );

        return this.findById(id);
    }

    // Atualizar password
    static async updatePassword(id, newPassword) {
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        await db.query(
            'UPDATE utilizadores SET password = ? WHERE id = ?',
            [hashedPassword, id]
        );

        return true;
    }

    // Eliminar utilizador
    static async delete(id) {
        const [result] = await db.query(
            'DELETE FROM utilizadores WHERE id = ?',
            [id]
        );
        return result.affectedRows > 0;
    }

    // Buscar todos os utilizadores
    static async findAll() {
        const [rows] = await db.query(
            'SELECT id, nome, email, role, created_at FROM utilizadores ORDER BY nome ASC'
        );
        return rows;
    }
}

export default User;
