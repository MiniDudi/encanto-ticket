# Encanto Telecom Ticket
Projeto prático para a etapa do processo seletivo da Encanto Telecom.   
O projeto e documentação foram desenvolvidos em um período de 3 dias e deverá ser entregue dia 31/07 às 18:00

### Desenvolvedor - Eduardo Henrique Natividade Pinese

# Lista de Stacks obrigatórias

### Frontend
- [x] TypeScript (~6.0.2)
- [x] React 18 (hooks) (^18.3.1)
- [x] Tailwind CSS (^4.3.3)
- [x] Formik (^2.4.9) - Gerenciamento e controle de formulários. Login / Registro / New Ticket / Edit Ticket
- [x] Yup (^1.7.1) - Validação de dados dos formulários. 
- [x] Axios (^1.18.1) - Consumo e integração com APIs REST desenvolvido com Nestjs.
- [x] React Router (^7.18.1) - Navegação entre páginas da aplicação.

### Backend
- [x] TypeScript (^5.7.3)
- [x] NestJS (^11.0.1)
- [x] PostgreSQL (17) - Banco de dados relacional da aplicação.
- [x] TypeORM (^0.3.27) - Mapeamento das entidades e comunicação com o banco.
- [x] class-validator (^0.15.1) - Validação dos DTOs de entrada e retorno.
- [x] JWT (^11.0.2) - Autenticação e autorização baseada em tokens. Token definido após o login e segurança das rotas de Tickets com JwtGuard.
- [x] bcrypt (^6.0.0) - Criptografia e proteção das senhas. Implementado no módulo de Auth.
- [x] Jest (^30.0.0) - Testes unitários dos serviços backend. Auth / Tickets.

### Infra
- [x] Docker (4.84.0) - Criação de containers para padronizar o ambiente de desenvolvimento.
- [x] docker-compose (3.8) - Gerenciamento dos serviços e configuração do banco PostgreSQL.

### Extra
- [x] IA HuggingFace (^4.13.23) - Integração com a API gratuita da HuggingFace para sugerir soluções automáticas aos usuários com base na descrição do ticket.

# Funcionalidades

- Cadastro de usuário
- Login com JWT
- Logout
- Rotas protegidas
- Listagem de tickets
- Criação de tickets
- Edição de tickets
- Exclusão de tickets
- Filtros por título, prioridade e status
- Sugestão automática de resposta utilizando IA (Hugging Face)

# Fluxo de dados

```mermaid
flowchart TD
    A[Usuário] --> B[React]
    B --> C[Pages / Components]
    C --> D[Axios API]

    D --> E[NestJS Controller]
    E --> F[Service]
    F --> G[TypeORM]
    G --> H[(PostgreSQL)]

    E --> I[JWT Guard]
    I --> F

    F --> J[Hugging Face Inference API]
    J --> F
```

# Estratégias

#### Frontend
- O frontend utiliza uma arquitetura **Feature-Based**, onde cada funcionalidade possui sua própria estrutura de páginas, componentes, schemas e camada de comunicação com a API. As requisições são realizadas via Axios, utilizando autenticação JWT para acesso às rotas protegidas.

- A componentização de itens foi colocado em evidência, a fim de evitar repetição de código e melhor manipulação dos componentes criados. Na pasta `src/shared`, há Utils e Components para a reutilização global no Frontend.

#### Beckend
- No backend, os **Controllers** recebem as requisições, os **Services** aplicam as regras de negócio e o **TypeORM** realiza a persistência dos dados no PostgreSQL.

- Na construção do Backend, dividi as responsabilidades de Auth e User em dois módulos separados. Sendo que o módulo de Auth importa a service de User para implementação da funcionalidade de Register. O módulo de User possui o CRUD estruturado, mas temporariamente sem uma Controller própria para a API.

#### I.A.
- A funcionalidade de **Sugestão de Resposta com IA** segue o mesmo fluxo de arquitetura. O frontend envia apenas a descrição do ticket ao backend, que é responsável por consumir a API da Hugging Face. Dessa forma, o token de acesso permanece protegido no servidor e não é exposto ao cliente. Após receber a resposta da IA, o backend retorna a sugestão ao frontend para exibição ao usuário.

- Foi utilizado a Inteligência Artificial ChatGPT da OpenAI para Início do projeto, desenvolvimento de ideias, sanar dúvidas, correção de bugs e falhas durante o processo de trabalho. 

#### Infra
- Utilizei **Docker** para containerizar o backend, frontend e banco de dados PostgreSQL. Dessa forma, toda a aplicação pode ser iniciada com um único comando (docker compose up --build), facilitando a configuração do ambiente.

#### DevOps
- Implementei **Github Actions** para validação do código em ambas frentes do projeto. Para cada `push` ou `Merge Request` realizado nas branches develop e main é executado um workflow que instala as dependências do projeto e roda o ESLint, garantindo padronização da qualidade e evitando que alterações com problemas sejam integradas às branches principais.



# Gerando uma API token da HuggingFace AI

1. Acesse o site `https://huggingface.co/`
2. Crie uma conta ou faça login em uma conta existente
3. Após o login, acesse a seção de Tokens em: `https://huggingface.co/settings/tokens`
4. Clique em `Create new Token`
5. Dê o nome desejado e selecione `Read-only`
6. Gerencie as permissões e marque:
```
 - [x] Make calls to Inference Providers
 - [x] Make calls to your Inference Endpoints
```
7. Confirme a criação e copie a chave gerada
8. Atribua a nova chave ao campo `HUGGINGFACE_TOKEN=` no .env do Backend

# Como executar

1. Clone o projeto
    - Escolha a pasta em que será instalado o projeto
    - Abra o CMD e execute: `git clone https://github.com/MiniDudi/encanto-ticket.git`
    - Entre na branch develop com: `git checkout develop`
    - Puxe as alterações recentes: `git pull`

2. Instalação do node_modules 
    - Acesse pelo terminal `cd /backend/`
    - Execute: `npm install`
    - Faça o mesmo para o Frontend

3. Adicione os `.env`:

    - Crie um `.env` na root da pasta Backend e Frontend e adicione o seguinte conteúdo:

### Backend (.env)

(O `HUGGINGFACE_TOKEN` pode estar expirado na hora do teste. Caso a página emita um alerta de token expirado, é recomendado seguir o próximo passo `Gerando um token HuggingFace`)

```env
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_DB=helpdesk

DATABASE_HOST=postgres
DATABASE_PORT=5432
DATABASE_USER=postgres
DATABASE_PASSWORD=postgres
DATABASE_NAME=helpdesk

JWT_SECRET=4f4db2c735d2b3f0a2d6c4c1aee1d8ef7b7d90d34d9aafee8a2cdb6d8c8f93b2f7b92b4b6e6a8b8f3f8c9d2c6d7a9b3e
JWT_EXPIRES_IN=1d
PORT=3000

HUGGINGFACE_TOKEN=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
```

### Frontend (.env)

```env
VITE_API_URL=http://localhost:3000
```

4. Na root do projeto e com o Docker Desktop LTS aberto, rode:

```bash
docker compose up --build  
```

A partir disso, as aplicações já estarão rodando nas URLs:

Backend:
`http://localhost:3000/`

Frontend:
`http://localhost:5173/`

# Aprendizados / Facilidades
1. Durante o desenvolvimento do Frontend em React, notei familiaridade com frameworks que trabalhei no passado.
Além disso, é muito interessante a forma como o React facilita a componentização das views.

2. Vi grande importância na utilização da biblioteca Yup, já que padroniza e deixa explicito em código quais campos os formulários devem possuir, suas tipagens e possíveis erros. Como comparação de campos em `Repetir senha`, tipagem errada durante o input e mínimo de caracteres.

3. Apliquei para esse projeto a estrutura orientada à Features, onde se dá destaque para as Features existentes.
Pelo projeto ser pequeno em features, não trouxe complexidade à estrutura visual dos arquivos e facilitou a organização do código e a manutenção da aplicação conforme novas funcionalidades foram sendo adicionadas.

4. Nestjs e a biblioteca TypeORM possui uma certa semelhança com a criação da API e definição de rotas e lógica comparado ao Java Springboot.

# Problemas e Bugs
1. Na instalação do Docker, encontrei muitos problemas de permisão ao acesso de pastas internas do computador. Utilizando o auxílio de IA para resolver, a instalação e setup do Docker foi bem-sucedido.

2. Jest não veio configurado corretamente. Arquivos de teste automaticamente gerados pelo Nest.js quebraram. Precisei criar "tsconfig.specs.json" na root e adicionar tipos de compilação no "tsconfig.json".

3. A listagem de tickets estava me retornando e-mail e senha encriptografada do usuário logar. Por problemas de privacidade, decidi remover esses dados do retorno alterando a DTO de tickets-response.

# Melhorias futuras

O que poderia ser implementado:

- Listagem de tickets no padrão Kanban, sendo filtrado por status e dividido por colunas por suas prioridades
- Refresh Token para autenticação;
- Upload de anexos;
- Deploy da aplicação;
- Testes E2E com Playwright;
