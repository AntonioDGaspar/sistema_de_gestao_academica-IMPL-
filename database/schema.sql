-- Schema de exemplo para o Sistema de Gestão Académica
-- Este é um exemplo. Ajuste conforme necessário com a equipa da base de dados.

-- Tabela de Utilizadores (para autenticação)
CREATE TABLE IF NOT EXISTS utilizadores (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role ENUM('admin', 'teacher', 'student', 'guardian') DEFAULT 'student',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Tabela de Turmas
CREATE TABLE IF NOT EXISTS turmas (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL,
    ano_lectivo VARCHAR(20) NOT NULL,
    classe ENUM('10', '11', '12', '13') NOT NULL,
    curso VARCHAR(100) DEFAULT 'Técnico de Informática',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de Estudantes
CREATE TABLE IF NOT EXISTS estudantes (
    id INT PRIMARY KEY AUTO_INCREMENT,
    numero VARCHAR(50) UNIQUE NOT NULL,
    nome VARCHAR(255) NOT NULL,
    data_nascimento DATE NOT NULL,
    genero ENUM('M', 'F') NOT NULL,
    turma_id INT,
    encarregado_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (turma_id) REFERENCES turmas(id) ON DELETE SET NULL,
    FOREIGN KEY (encarregado_id) REFERENCES utilizadores(id) ON DELETE SET NULL
);

-- Tabela de Disciplinas
CREATE TABLE IF NOT EXISTS disciplinas (
    id INT PRIMARY KEY AUTO_INCREMENT,
    codigo VARCHAR(20) UNIQUE NOT NULL,
    nome VARCHAR(255) NOT NULL,
    carga_horaria INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de Notas
CREATE TABLE IF NOT EXISTS notas (
    id INT PRIMARY KEY AUTO_INCREMENT,
    estudante_id INT NOT NULL,
    disciplina_id INT NOT NULL,
    trimestre ENUM('1', '2', '3') NOT NULL,
    tipo_avaliacao ENUM('MAC', 'PP', 'PT', 'Exame') NOT NULL,
    nota DECIMAL(5,2) NOT NULL CHECK (nota >= 0 AND nota <= 20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (estudante_id) REFERENCES estudantes(id) ON DELETE CASCADE,
    FOREIGN KEY (disciplina_id) REFERENCES disciplinas(id) ON DELETE CASCADE,
    UNIQUE KEY unique_nota (estudante_id, disciplina_id, trimestre, tipo_avaliacao)
);

-- Tabela de Professores
CREATE TABLE IF NOT EXISTS professores (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE,
    telefone VARCHAR(20),
    especialidade VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de Presenças
CREATE TABLE IF NOT EXISTS presencas (
    id INT PRIMARY KEY AUTO_INCREMENT,
    estudante_id INT NOT NULL,
    disciplina_id INT NOT NULL,
    data DATE NOT NULL,
    status ENUM('Presente', 'Falta', 'Justificada') NOT NULL,
    observacao TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (estudante_id) REFERENCES estudantes(id) ON DELETE CASCADE,
    FOREIGN KEY (disciplina_id) REFERENCES disciplinas(id) ON DELETE CASCADE
);

-- Índices para melhor performance
CREATE INDEX idx_estudantes_turma ON estudantes(turma_id);
CREATE INDEX idx_notas_estudante ON notas(estudante_id);
CREATE INDEX idx_notas_disciplina ON notas(disciplina_id);
CREATE INDEX idx_presencas_estudante ON presencas(estudante_id);
CREATE INDEX idx_presencas_data ON presencas(data);

-- Dados de exemplo (opcional - para testes)
-- Inserir utilizador admin padrão (password: admin123)
INSERT INTO utilizadores (nome, email, password, role) VALUES 
('Administrador', 'admin@escola.ao', '$2a$10$rZ5qYQYQYQYQYQYQYQYQYuGKGKGKGKGKGKGKGKGKGKGKGKGKGKGKG', 'admin');
