# Sistema de Histórico Escolar

## 📋 Descrição

Sistema de gestão de histórico escolar desenvolvido para acompanhar o desempenho académico de estudantes durante as **classes 10ª, 11ª, 12ª e 13ª**.

O sistema permite:
- ✅ Gestão de estudantes e turmas
- ✅ Registo de notas por disciplina e trimestre
- ✅ Controlo de presenças
- ✅ Acompanhamento por encarregados de educação
- ✅ Cálculo automático de médias

## 🎓 Classes Suportadas

O sistema é **exclusivamente** para estudantes das seguintes classes:
- **10ª Classe**
- **11ª Classe**
- **12ª Classe**
- **13ª Classe**

## 🏗️ Estrutura do Projeto

```
historico_Estudante/
├── database/
│   ├── schema.sql          # Estrutura da base de dados
│   └── seed.sql            # Dados de exemplo
├── src/
│   ├── config/
│   │   └── database.js     # Configuração da conexão MySQL
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── classController.js
│   │   ├── gradeController.js
│   │   └── studentController.js
│   ├── middlewares/
│   │   └── auth.js         # Middleware de autenticação
│   ├── models/
│   │   ├── Class.js
│   │   ├── Grade.js
│   │   └── Student.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── classRoutes.js
│   │   ├── gradeRoutes.js
│   │   └── studentRoutes.js
│   ├── app.js              # Configuração do Express
│   └── server.js           # Servidor principal
├── .env                    # Variáveis de ambiente
└── package.json
```

## 📊 Estrutura da Base de Dados

### Tabelas Principais

#### 1. **utilizadores**
Gestão de utilizadores do sistema com diferentes perfis:
- `admin` - Administrador do sistema
- `teacher` - Professor
- `student` - Estudante
- `guardian` - Encarregado de educação

#### 2. **turmas**
Gestão de turmas por classe (10, 11, 12, 13):
- Nome da turma
- Ano lectivo
- Classe (ENUM: '10', '11', '12', '13')
- Curso (padrão: Técnico de Informática)

#### 3. **estudantes**
Informações dos estudantes:
- Número único
- Nome completo
- Data de nascimento
- Género (M/F)
- Turma associada
- Encarregado de educação

#### 4. **disciplinas**
Disciplinas do curso:
- Código único
- Nome da disciplina
- Carga horária

#### 5. **notas**
Registo de avaliações:
- Estudante
- Disciplina
- Trimestre (1, 2, 3)
- Tipo de avaliação (MAC, PP, PT, Exame)
- Nota (0-20 valores)

#### 6. **presencas**
Controlo de assiduidade:
- Estudante
- Disciplina
- Data
- Status (Presente, Falta, Justificada)

## 🚀 Instalação e Configuração

### Pré-requisitos
- Node.js (v14 ou superior)
- MySQL (v5.7 ou superior)
- npm ou yarn

### Passos de Instalação

1. **Clone o repositório**
```bash
cd /home/amorim/Amorim/Projects/NodeJS/historico_Estudante
```

2. **Instale as dependências**
```bash
npm install
```

3. **Configure as variáveis de ambiente**
Edite o arquivo `.env`:
```env
DB_HOST=localhost
DB_USER=seu_usuario
DB_PASSWORD=sua_senha
DB_NAME=historico_escolar
DB_PORT=3306

JWT_SECRET=sua_chave_secreta
PORT=3000
```

4. **Crie a base de dados**
```bash
mysql -u seu_usuario -p < database/schema.sql
```

5. **Execute o servidor**
```bash
npm start
```

O servidor estará disponível em `http://localhost:3000`

## 📡 API Endpoints

### Autenticação
- `POST /api/auth/login` - Login de utilizador
- `POST /api/auth/register` - Registo de novo utilizador

### Turmas
- `GET /api/turmas` - Listar todas as turmas
- `GET /api/turmas/:id` - Obter turma por ID
- `POST /api/turmas` - Criar nova turma (apenas classes 10-13)
- `PUT /api/turmas/:id` - Atualizar turma
- `DELETE /api/turmas/:id` - Eliminar turma
- `GET /api/turmas/classe/:classe` - Filtrar por classe (10, 11, 12 ou 13)

### Estudantes
- `GET /api/estudantes` - Listar todos os estudantes
- `GET /api/estudantes/:id` - Obter estudante por ID
- `POST /api/estudantes` - Criar novo estudante
- `PUT /api/estudantes/:id` - Atualizar estudante
- `DELETE /api/estudantes/:id` - Eliminar estudante
- `GET /api/estudantes/turma/:turmaId` - Estudantes por turma

### Notas
- `GET /api/notas/estudante/:studentId` - Notas de um estudante
- `GET /api/notas/disciplina/:disciplinaId/turma/:turmaId` - Notas por disciplina e turma
- `POST /api/notas` - Registar/atualizar nota
- `DELETE /api/notas/:id` - Eliminar nota
- `GET /api/notas/media/:estudanteId/:disciplinaId/:trimestre` - Calcular média

## 📝 Sistema de Avaliação

### Tipos de Avaliação
- **MAC** - Média de Avaliação Contínua
- **PP** - Prova Prática
- **PT** - Prova Teórica
- **Exame** - Exame Final

### Trimestres
O ano lectivo é dividido em **3 trimestres**:
1. Primeiro Trimestre
2. Segundo Trimestre
3. Terceiro Trimestre

### Escala de Notas
- Notas de **0 a 20 valores**
- Nota mínima de aprovação: **10 valores**

## 👥 Perfis de Utilizador

### Administrador
- Gestão completa do sistema
- Criar/editar turmas e disciplinas
- Gerir utilizadores
- Acesso a todos os relatórios

### Professor
- Registar notas e presenças
- Visualizar turmas atribuídas
- Gerar relatórios de desempenho

### Estudante
- Visualizar próprias notas
- Consultar presenças
- Ver histórico académico

### Encarregado de Educação
- Acompanhar desempenho dos educandos
- Visualizar notas e presenças
- Receber notificações

## 🔒 Segurança

- Autenticação via JWT (JSON Web Tokens)
- Passwords encriptadas com bcrypt
- Middleware de autorização por perfil
- Validação de dados em todas as operações

## 🛠️ Tecnologias Utilizadas

- **Backend**: Node.js + Express.js
- **Base de Dados**: MySQL
- **Autenticação**: JWT + bcrypt
- **Validação**: Express Validator

## 📄 Licença

Este projeto é propriedade da instituição de ensino e destina-se exclusivamente ao uso interno.

## 👨‍💻 Suporte

Para questões ou problemas, contacte a equipa de desenvolvimento.

---

**Versão**: 1.0.0  
**Última Atualização**: Janeiro 2026
