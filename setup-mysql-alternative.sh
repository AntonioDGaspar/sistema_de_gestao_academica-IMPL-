#!/bin/bash

# Script alternativo para configurar o MySQL com senha forte
# Use este script se o setup-mysql.sh falhar devido à política de senha

echo "=========================================="
echo "  Configuração do MySQL (Alternativa)"
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
    exit 1
fi

echo -e "${GREEN}✓ MySQL está instalado${NC}"
echo ""

# Definir senha forte para desenvolvimento
DB_PASSWORD="Academico@2026"

echo "Configurando MySQL com senha forte..."
echo -e "${YELLOW}Senha do banco de dados: ${DB_PASSWORD}${NC}"
echo ""

sudo mysql <<EOF
-- Configurar root para usar senha forte
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '${DB_PASSWORD}';

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
    
    # Atualizar arquivo .env
    echo "Atualizando arquivo .env com a senha..."
    sed -i "s/^DB_PASSWORD=.*/DB_PASSWORD=${DB_PASSWORD}/" .env
    
    echo -e "${GREEN}✓ Arquivo .env atualizado${NC}"
    echo ""
else
    echo ""
    echo -e "${RED}✗ Erro ao configurar MySQL${NC}"
    exit 1
fi

# Importar schema
echo "Importando schema da base de dados..."
if [ -f "database/schema.sql" ]; then
    mysql -u root -p"${DB_PASSWORD}" sistema_academico < database/schema.sql
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
echo -e "Senha do MySQL: ${YELLOW}${DB_PASSWORD}${NC}"
echo ""
echo "Agora você pode:"
echo "  1. Iniciar o servidor: npm start"
echo "  2. Executar os testes: node test-validations.js"
echo ""
