import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

// Configuração do pool de conexões MySQL
const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'sistema_academico',
    port: process.env.DB_PORT || 3306,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    enableKeepAlive: true,
    keepAliveInitialDelay: 0
});

// Testar conexão
const testConnection = async () => {
    try {
        const connection = await pool.getConnection();
        console.log('✅ Conexão com MySQL estabelecida com sucesso!');
        connection.release();
    } catch (error) {
        console.error('❌ Erro ao conectar com MySQL:', error.message);
        process.exit(1);
    }
};

// Executar teste de conexão
testConnection();

export default pool;
