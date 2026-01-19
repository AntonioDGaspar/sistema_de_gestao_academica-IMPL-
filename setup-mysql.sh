#!/bin/bash

# Script para configurar o MySQL para o sistema de histórico escolar
# Este script cria a base de dados e configura o utilizador root

echo "=========================================="
echo "  Configuração do MySQL"
echo "=========================================="
echo ""

# Cores
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Verificar se MySQL está instalado
if ! command -v mysql &> /dev/null; then
    echo -e "${RED}✗ MySQL não está instalado!${NC}"
    echo "Por favor, instale o MySQL primeiro:"
    echo "  sudo apt install mysql-server -y"
    exit 1
fi

echo -e "${GREEN}✓ MySQL está instalado${NC}"
echo ""

# Configurar o utilizador root para usar senha
echo "Configurando autenticação do MySQL..."
echo ""

sudo mysql <<EOF
-- Desabilitar política de validação de senha (apenas para desenvolvimento)
SET GLOBAL validate_password.policy = LOW;
SET GLOBAL validate_password.length = 0;

-- Configurar root para usar senha nativa (sem senha para desenvolvimento)
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '';

-- Criar base de dados
CREATE DATABASE IF NOT EXISTS sistema_academico CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Dar permissões
GRANT ALL PRIVILEGES ON sistema_academico.* TO 'root'@'localhost';

-- Aplicar mudanças
FLUSH PRIVILEGES;

-- Mostrar bases de dados
SHOW DATABASES;
EOF

if [ $? -eq 0 ]; then
    echo ""
    echo -e "${GREEN}✓ MySQL configurado com sucesso!${NC}"
    echo ""
    echo "Base de dados 'sistema_academico' criada."
    echo ""
else
    echo ""
    echo -e "${RED}✗ Erro ao configurar MySQL${NC}"
    exit 1
fi

# Importar schema
echo "Importando schema da base de dados..."
if [ -f "database/schema.sql" ]; then
    mysql -u root sistema_academico < database/schema.sql
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}✓ Schema importado com sucesso!${NC}"
    else
        echo -e "${RED}✗ Erro ao importar schema${NC}"
        exit 1
    fi
else
    echo -e "${YELLOW}⚠ Arquivo database/schema.sql não encontrado${NC}"
fi

echo ""
echo "=========================================="
echo -e "${GREEN}  Configuração Concluída!${NC}"
echo "=========================================="
echo ""
echo "Agora você pode:"
echo "  1. Iniciar o servidor: npm start"
echo "  2. Executar os testes: node test-validations.js"
echo ""
