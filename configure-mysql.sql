-- Configuração Manual do MySQL para Sistema Acadêmico
-- Execute este arquivo com: sudo mysql < configure-mysql.sql

-- Configurar root com senha forte
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'Academico@2026';

-- Criar base de dados
CREATE DATABASE IF NOT EXISTS sistema_academico CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Dar permissões
GRANT ALL PRIVILEGES ON sistema_academico.* TO 'root'@'localhost';

-- Aplicar mudanças
FLUSH PRIVILEGES;

-- Mostrar bases de dados criadas
SHOW DATABASES;
