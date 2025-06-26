# Pontos Turísticos

Aplicação web completa para cadastro, listagem, busca e detalhamento de pontos turísticos do Brasil. O sistema é composto por um backend em .NET 8 (C#) com banco SQLite e um frontend moderno em React.

## Demonstração

## Funcionalidades

- Cadastro de pontos turísticos com nome, descrição, referência, cidade e estado.
- Listagem paginada e ordenada dos pontos cadastrados.
- Busca por nome, referência ou descrição.
- Visualização detalhada de cada ponto turístico.
- Sugestão automática de cidades via integração com o IBGE.
- Interface responsiva e intuitiva.

---

## Tecnologias Utilizadas

- **Backend:** .NET 8, Entity Framework Core, SQLite, Dapper, Swagger
- **Frontend:** React 18, Vite, Axios, React Router, React Paginate, React Modal, React Icons
- **Banco de Dados:** SQLite (padrão) ou SQL Server (opcional)
- **Estilização:** CSS moderno e responsivo

---

## Como Executar Localmente

### 1. Clone o repositório

```bash
git clone https://github.com/maiscafe/pontos-turisticos.git
```

### 2. Backend (.NET 8 + SQLite)

> Requisitos: [.NET 8 SDK](https://dotnet.microsoft.com/download/dotnet/8.0)

- Entre na pasta do backend:
  ```bash
  cd backend/PontosTuristicosAPI/PontosTuristicosAPI
  ```
- O banco SQLite será criado automaticamente ao rodar a API.
- Execute a API:
  ```bash
  dotnet run
  ```
- Acesse a documentação Swagger em: [http://localhost:5232/swagger](http://localhost:5232/swagger)

#### Configuração opcional para SQL Server

Se preferir usar SQL Server, ajuste a string de conexão no `appsettings.json` e utilize os scripts/backup em `/database`.

---

### 3. Frontend (React + Vite)

> Requisitos: [Node.js 18+](https://nodejs.org/)

- Entre na pasta do frontend:
  ```bash
  cd frontend/pontos-turisticos
  ```
- Instale as dependências:
  ```bash
  npm install
  ```
- Ajuste a URL da API em `config.js` se necessário.
- Rode o frontend:
  ```bash
  npm run dev
  ```
- Acesse em: [http://localhost:5173](http://localhost:5173)

---

## Estrutura das Pastas

```
backend/
  PontosTuristicosAPI/   # API .NET 8 + SQLite
frontend/
  pontos-turisticos/     # Aplicação React
database/                # Scripts e backups do banco
```

---

## Endpoints Principais da API

- `GET /api/v1/pontosturisticos/lista` — Lista todos os pontos turísticos
- `POST /api/v1/pontosturisticos/cadastrar` — Cadastra um novo ponto turístico
- `GET /api/v1/pontosturisticos/ponto?id={id}` — Detalhes de um ponto turístico
- `GET /api/v1/pontosturisticos/ping` — Teste de saúde da API

---

## Personalização

- Para alterar a URL da API no frontend, edite o arquivo `frontend/pontos-turisticos/config.js`.
- Para popular o banco com dados iniciais, edite o script `Database/SeedData.sql` no backend.

---

## Contribuição

Pull requests são bem-vindos! Sinta-se à vontade para abrir issues ou sugerir melhorias.

---

## Licença

Este projeto está sob a licença MIT.

---

## Repositório Oficial

[https://github.com/maiscafe/pontos-turisticos](https://github.com/maiscafe/pontos-turisticos)
 