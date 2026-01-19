# 🚀 Guia Rápido de Início

## Problema Atual: MySQL não conecta

**Erro**: `Access denied for user 'root'@'localhost'`

### ✅ Solução Rápida (Recomendada)

Execute o script de configuração automática:

```bash
./setup-mysql.sh
```

Digite sua senha do sistema quando solicitado. O script irá:
- ✅ Configurar o usuário root do MySQL
- ✅ Criar a base de dados `sistema_academico`
- ✅ Importar o schema automaticamente

Após o script terminar, execute:

```bash
npm start
```

---

### 🔧 Solução Manual (Alternativa)

Se preferir configurar manualmente:

```bash
# 1. Acessar MySQL
sudo mysql

# 2. Executar dentro do MySQL:
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '';
CREATE DATABASE IF NOT EXISTS sistema_academico CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
GRANT ALL PRIVILEGES ON sistema_academico.* TO 'root'@'localhost';
FLUSH PRIVILEGES;
EXIT;

# 3. Importar schema
mysql -u root sistema_academico < database/schema.sql

# 4. Iniciar servidor
npm start
```

---

## 🧪 Testar o Sistema

Após o servidor iniciar com sucesso:

```bash
# Em outro terminal
node test-validations.js
```

Deve mostrar 6 testes passando ✓

---

## 📚 Documentação Completa

- **README.md** - Documentação completa do sistema
- **INSTALL_MYSQL.md** - Guia detalhado de instalação do MySQL
- **walkthrough.md** - Alterações implementadas e como testar

---

## ⚡ Comandos Úteis

```bash
# Iniciar servidor
npm start

# Executar testes
node test-validations.js

# Ver status do MySQL
sudo systemctl status mysql

# Acessar MySQL
sudo mysql
```
