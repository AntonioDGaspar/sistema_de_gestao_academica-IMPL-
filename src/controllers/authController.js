import User from '../models/User.js';
import jwt from 'jsonwebtoken';

// Registar novo utilizador
export const register = async (req, res, next) => {
    try {
        const { nome, email, password, role } = req.body;

        // Validação
        if (!nome || !email || !password) {
            return res.status(400).json({
                success: false,
                error: 'Campos obrigatórios: nome, email, password'
            });
        }

        // Verificar se o email já existe
        const existingUser = await User.findByEmail(email);
        if (existingUser) {
            return res.status(400).json({
                success: false,
                error: 'Email já registado'
            });
        }

        // Criar utilizador
        const user = await User.create({ nome, email, password, role });

        // Gerar token
        const token = jwt.sign(
            { id: user.id, email: user.email, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES_IN || '24h' }
        );

        res.status(201).json({
            success: true,
            data: {
                user,
                token
            },
            message: 'Utilizador registado com sucesso'
        });
    } catch (error) {
        next(error);
    }
};

// Login
export const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        // Validação
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                error: 'Email e password são obrigatórios'
            });
        }

        // Buscar utilizador com password
        const [rows] = await User.findByEmail(email);
        const user = rows;

        if (!user) {
            return res.status(401).json({
                success: false,
                error: 'Credenciais inválidas'
            });
        }

        // Verificar password
        const isPasswordValid = await User.verifyPassword(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({
                success: false,
                error: 'Credenciais inválidas'
            });
        }

        // Gerar token
        const token = jwt.sign(
            { id: user.id, email: user.email, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES_IN || '24h' }
        );

        // Remover password da resposta
        delete user.password;

        res.json({
            success: true,
            data: {
                user,
                token
            },
            message: 'Login realizado com sucesso'
        });
    } catch (error) {
        next(error);
    }
};

// Obter perfil do utilizador autenticado
export const getProfile = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id);

        if (!user) {
            return res.status(404).json({
                success: false,
                error: 'Utilizador não encontrado'
            });
        }

        res.json({
            success: true,
            data: user
        });
    } catch (error) {
        next(error);
    }
};

// Atualizar perfil
export const updateProfile = async (req, res, next) => {
    try {
        const { nome, email } = req.body;

        const updatedUser = await User.update(req.user.id, { nome, email, role: req.user.role });

        res.json({
            success: true,
            data: updatedUser,
            message: 'Perfil atualizado com sucesso'
        });
    } catch (error) {
        next(error);
    }
};

// Alterar password
export const changePassword = async (req, res, next) => {
    try {
        const { currentPassword, newPassword } = req.body;

        if (!currentPassword || !newPassword) {
            return res.status(400).json({
                success: false,
                error: 'Password atual e nova password são obrigatórias'
            });
        }

        // Buscar utilizador com password
        const user = await User.findByEmail(req.user.email);

        // Verificar password atual
        const isPasswordValid = await User.verifyPassword(currentPassword, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({
                success: false,
                error: 'Password atual incorreta'
            });
        }

        // Atualizar password
        await User.updatePassword(req.user.id, newPassword);

        res.json({
            success: true,
            message: 'Password alterada com sucesso'
        });
    } catch (error) {
        next(error);
    }
};
