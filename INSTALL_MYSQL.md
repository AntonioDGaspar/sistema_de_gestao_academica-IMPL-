# Guia de Instalação do MySQL

## 🚨 Problema Identificado

O servidor Node.js não consegue conectar ao MySQL porque o MySQL não está instalado ou não está rodando no sistema.

**Erro**: `connect ECONNREFUSED 127.0.0.1:3306`

---

## 📦 Instalação do MySQL no Ubuntu/Debian

### Opção 1: Instalar MySQL Server

```bash
# Atualizar lista de pacotes
sudo apt update

# Instalar MySQL Server
sudo apt install mysql-server -y

# Iniciar o serviço MySQL
sudo systemctl start mysql

# Habilitar MySQL para iniciar automaticamente
sudo systemctl enable mysql

# Verificar status
sudo systemctl status mysql
```

### Opção 2: Instalar MariaDB (alternativa compatível)

```bash
# Atualizar lista de pacotes
sudo apt update

# Instalar MariaDB Server
sudo apt install mariadb-server -y

# Iniciar o serviço
sudo systemctl start mariadb

# Habilitar para iniciar automaticamente
sudo systemctl enable mariadb

# Verificar status
sudo systemctl status mariadb
```

---

## 🔒 Configuração Inicial de Segurança

Após instalar, execute o script de segurança:

```bash
sudo mysql_secure_installation
```

**Respostas sugeridas**:
- Set root password? **Y** (defina uma senha forte)
- Remove anonymous users? **Y**
- Disallow root login remotely? **Y**
- Remove test database? **Y**
- Reload privilege tables? **Y**

---

## 🗄️ Criar Base de Dados e Utilizador

### 1. Aceder ao MySQL

```bash
sudo mysql -u root -p
```

### 2. Criar a base de dados

```sql
CREATE DATABASE sistema_academico CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

### 3. Criar utilizador (opcional, mas recomendado)

```sql
-- Criar utilizador
CREATE USER 'academico'@'localhost' IDENTIFIED BY 'sua_senha_segura';

-- Dar permissões
GRANT ALL PRIVILEGES ON sistema_academico.* TO 'academico'@'localhost';

-- Aplicar mudanças
FLUSH PRIVILEGES;

-- Sair
EXIT;
```

### 4. Importar o schema

```bash
# Se usar root sem senha (desenvolvimento)
sudo mysql -u root sistema_academico < database/schema.sql

# Se usar root com senha
mysql -u root -p sistema_academico < database/schema.sql

# Se criou o utilizador 'academico'
mysql -u academico -p sistema_academico < database/schema.sql
```

---

## ⚙️ Atualizar Arquivo .env

Edite o arquivo `.env` com as credenciais corretas:

```env
# Configurações do MySQL
DB_HOST=localhost
DB_USER=root
# OU se criou utilizador específico:
# DB_USER=academico

DB_PASSWORD=sua_senha_aqui
DB_NAME=sistema_academico
DB_PORT=3306
```

---

## ✅ Verificar Instalação

### 1. Verificar se MySQL está rodando

```bash
sudo systemctl status mysql
# OU
sudo systemctl status mariadb
```

### 2. Testar conexão

```bash
mysql -u root -p -e "SELECT VERSION();"
```

### 3. Verificar se a base de dados existe

```bash
mysql -u root -p -e "SHOW DATABASES;"
```

Deve aparecer `sistema_academico` na lista.

---

## 🚀 Iniciar o Sistema

Após configurar o MySQL:

### 1. Iniciar o servidor Node.js

```bash
npm start
```

Deve aparecer:
```
Server is running on port 4000
✅ Conectado ao MySQL com sucesso!
```

### 2. Executar os testes

Em outro terminal:

```bash
node test-validations.js
```

---

## 🔧 Comandos Úteis do MySQL

```bash
# Iniciar MySQL
sudo systemctl start mysql

# Parar MySQL
sudo systemctl stop mysql

# Reiniciar MySQL
sudo systemctl restart mysql

# Ver status
sudo systemctl status mysql

# Ver logs de erro
sudo tail -f /var/log/mysql/error.log
```

---

## 🐛 Troubleshooting

### Problema: "Access denied for user 'root'@'localhost'"

**Solução 1**: Usar sudo
```bash
sudo mysql -u root
```

**Solução 2**: Resetar senha do root
```bash
sudo mysql
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'nova_senha';
FLUSH PRIVILEGES;
EXIT;
```

### Problema: MySQL não inicia

```bash
# Ver logs de erro
sudo journalctl -u mysql -n 50

# Verificar configuração
sudo mysqld --verbose --help | grep -A 1 'Default options'
```

### Problema: Porta 3306 já em uso

```bash
# Ver o que está usando a porta
sudo lsof -i :3306

# OU
sudo netstat -tulpn | grep 3306
```

---

## 📋 Checklist Rápido

- [ ] MySQL/MariaDB instalado
- [ ] Serviço MySQL rodando (`systemctl status mysql`)
- [ ] Base de dados `sistema_academico` criada
- [ ] Schema importado (`database/schema.sql`)
- [ ] Arquivo `.env` configurado com credenciais corretas
- [ ] Servidor Node.js inicia sem erros
- [ ] Testes executam com sucesso

---

## 🎯 Próximos Passos

Após seguir este guia:

1. ✅ MySQL instalado e rodando
2. ✅ Base de dados criada e schema importado
3. ✅ Servidor Node.js conecta com sucesso
4. ✅ Executar testes: `node test-validations.js`
5. ✅ Sistema pronto para uso!
