# Back-end User Api com JWT

### Tecnologias Utilizadas

Linguagem: TypeScript
Framework: Node.js e Express.js
Banco de Dados: PostgreSQL com PrismaORM

Na base do projeto tem o docker-compose.yml, Documento de Design de API.md, Melhores práticas e implementação de segurança.md, diagrama do projeto,
curl.txt para testes das rotas e o arquivo do insomnia.json caso usar o Insomnia.

## Instalação e Uso

```bash
git clone https://github.com/murilocb/user-api-jwt.git
```

```bash
cd user-api-jwt
```

```bash
docker compose up -d
```

```bash
npx prisma migrate dev
```

```bash
npx prisma generate
```

```bash
npm install
```

```bash
npm run dev
```

Para rodar os testes

```bash
npm run test
```
