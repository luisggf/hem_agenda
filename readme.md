# CSI606 - Sistemas WEB I - SI-06

## Período Letivo 2024/1

### _Prof. Fernando Bernardes de Oliveira, Ph.D._

---

## **Atividades Práticas**

### Instruções/regras

1. As atividades são **INDIVIDUAIS**.

1. Em caso de caracterização de cópia entre pessoas e/ou da internet (sem a devida referência), **TODOS** os envolvidos terão **nota zero** (0). Códigos utilizados por pessoas de outros semestres também causam a eliminação da atividade.

1. **Entrega:**

   - **GitHub**: código-fonte e afins. Insira os arquivos criados nas pastas conforme a entrega no seu repositório no GitHub.  
      = **Atividades/atividade-pratica/sever**  
      = **Atividades/atividade-pratica/web**
   - As datas para as entregas estão disponíveis no Moodle.

## Desenvolvimento: Sistema de Agendamento de Doação de Sangue

O objetivo deste sistema é controlar o processo de agendamento de doação de sangue numa determina instituição. O diagrama do banco de dados completo é apresentado na [figura abaixo](./database-model/db_model.png). Você também pode acessar o modelo definido a partir do [DBDiagram](https://dbdiagram.io/d/CSI606-sistema-doacao-sangue-630d077e0911f91ba5ecf743).

![Diagrama completo do banco de dados](./database-model/CSI606-sistema-doacao-sangue.png)

---

# Hem Agenda Backend

O objetivo deste sistema é controlar o processo de agendamento de doação de sangue numa determina instituição. O diagrama do banco de dados completo é apresentado na [figura abaixo](./database-model/CSI606-sistema-doacao-sangue.png). Você também pode acessar o modelo definido a partir do [DBDiagram](https://dbdiagram.io/d/CSI606-sistema-doacao-sangue-630d077e0911f91ba5ecf743).

![Diagrama completo do banco de dados](./database-model/CSI606-sistema-doacao-sangue.png)

Aqui está o conteúdo formatado corretamente em Markdown para um arquivo `README.md`:

````md
## Conceitos Usados Neste Projeto

- REST API
- Docker
- PostgreSQL
- Redis
- Fastify
- Prisma
- Cookies
- WebSockets
- Pub/Sub

## Bibliotecas e Comandos Usados Para Fundar o Projeto

### 1. Inicializar um Projeto Node

Crie um novo projeto Node.js:

```bash
npm init -y
````

### 2. Configurar TypeScript

TypeScript é usado para tipagem de dados em JavaScript:

```bash
npm install typescript @types/node -D
npx tsc --init
```

### 3. Instalar `tsx` para Execução do TypeScript

Instale `tsx` como uma dependência de desenvolvimento para executar arquivos TypeScript:

```bash
npm install tsx -D
```

### 4. Configurar o ORM Prisma

O Prisma é um ORM que simplifica a manipulação de dados:

```bash
npm install prisma -D
npx prisma init
```

Para gerenciar o esquema do banco de dados, você pode usar (para visualização dos dados):

```bash
npx prisma studio
```

Para aplicar mudanças no schema e rodar migrações:

```bash
npx prisma migrate dev
```

## Para Rodar o Projeto

### 1. Clonar o Repositório e Instalar as Dependências via package.json

Clone este repositório para sua máquina local:

```bash
git clone https://github.com/luisggf/hem-agenda
cd <diretório-do-repositório>
```

### 2. Instalar Dependências do Projeto

O arquivo package.json já está configurado com todas as dependências necessárias. Para instalá-las, basta rodar:

```bash
npm install
```

### 3. Configurar Variáveis de Ambiente

Crie um arquivo `.env` no diretório raiz com o seguinte conteúdo (mantive meus arquivos locais .env e .yml neste repositório, mas você pode alterá-los para seus próprios). Exemplo:

```env
DATABASE_URL="postgresql://usuario:senha@localhost:5432/polls?schema=public"
```

## Configuração do Docker

O arquivo `docker-compose.yml` define os serviços para PostgreSQL:

```yaml
version: "3.7"

services:
  postgres:
    image: bitnami/postgresql:latest
    ports:
      - "5432:5432"
    environment:
      - POSTGRES_USER=usuario
      - POSTGRES_PASSWORD=senha
      - POSTGRES_DB=hem_agenda_db
    volumes:
      - hem_agenda_pg_data:/bitnami/postgresql

volumes:
  hem_agenda_pg_data:

```

### Notas Importantes:

- Certifique-se de que o `POSTGRES_USER` e `POSTGRES_PASSWORD` no arquivo `docker-compose.yml` correspondem às credenciais especificadas no arquivo `.env`.
- Use o `DATABASE_URL` no arquivo `.env` para conectar ao banco de dados PostgreSQL.

### 2. Executar o Docker para Criar os Containers do Banco de Dados

Use o Docker para iniciar os containers do PostgreSQL e Redis:

```bash
docker compose up -d
```

### 3. Aplicar Migrações do Banco de Dados

Após configurar os containers Docker, aplique as migrações mais recentes do banco de dados:

```bash
npx prisma migrate dev
```

Caso este comando não funcione, verifique se há alguma instância do PostGres rodando localmente em segundo plano. Esses programas interferem diretamente com a migração do Prisma para a VM do Docker.

### 4. Iniciar o Servidor de Desenvolvimento

Para iniciar o servidor, o seguinte comando inline pode ser usado:

```bash
npm run dev
```

### 5. Fim

Agora está tudo pronto, o servidor está rodando com sucesso e o Backend está pronto para aceitar/comunicar com a aplicação client.

**OBS:** Para reiniciar este servidor outras vezes, você precisará rodar, em sequência, estes comandos:

```bash
docker compose up
npm run dev
```

- Observe que o programa Docker Desktop deve estar rodando.
