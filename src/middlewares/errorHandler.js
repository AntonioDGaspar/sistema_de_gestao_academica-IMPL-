// Middleware global de tratamento de erros
const errorHandler = (err, req, res, next) => {
    console.error('Erro capturado:', err);

    // Erro de validação
    if (err.name === 'ValidationError') {
        return res.status(400).json({
            success: false,
            error: 'Erro de validação',
            details: err.message
        });
    }

    // Erro de autenticação
    if (err.name === 'UnauthorizedError' || err.name === 'JsonWebTokenError') {
        return res.status(401).json({
            success: false,
            error: 'Não autorizado',
            message: 'Token inválido ou expirado'
        });
    }

    // Erro de base de dados
    if (err.code && err.code.startsWith('ER_')) {
        return res.status(500).json({
            success: false,
            error: 'Erro na base de dados',
            message: process.env.NODE_ENV === 'development' ? err.message : 'Erro interno do servidor'
        });
    }

    // Erro genérico
    const statusCode = err.statusCode || 500;
    res.status(statusCode).json({
        success: false,
        error: err.message || 'Erro interno do servidor',
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
    });
};

// Middleware para rotas não encontradas
const notFound = (req, res, next) => {
    const error = new Error(`Rota não encontrada - ${req.originalUrl}`);
    error.statusCode = 404;
    next(error);
};

export { errorHandler, notFound };
