import jwt from 'jsonwebtoken';

// Middleware de autenticação - verifica se o utilizador está autenticado
export const authenticate = (req, res, next) => {
    try {
        // Obter token do header Authorization
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({
                success: false,
                error: 'Token não fornecido'
            });
        }

        const token = authHeader.substring(7); // Remove "Bearer "

        // Verificar e decodificar token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Adicionar dados do utilizador ao request
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({
            success: false,
            error: 'Token inválido ou expirado'
        });
    }
};

// Middleware de autorização - verifica se o utilizador tem a role necessária
export const authorize = (...roles) => {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({
                success: false,
                error: 'Utilizador não autenticado'
            });
        }

        if (!roles.includes(req.user.role)) {
            return res.status(403).json({
                success: false,
                error: 'Acesso negado. Permissões insuficientes.'
            });
        }

        next();
    };
};
