Implementação inicial de hackatoon

Execução criar arquivo .env e adicionar string de conexão. Antes de executar a migration, deve ser criado com nome do banco de dados que você informou na string de conexão

O projeto se apoia no ORM Drizzle, para execução de migrations e schemas. Em caso de dúvidas para a execução das migration, segue o link da documentação.

https://orm.drizzle.team/docs/get-started/postgresql-new

## Como Instalar

Suba o banco de dados PostgreSQL com o docker compose
```sh
docker-compose up -d
```

Execute as migrations do Drizzle
```sh
npx drizzle-kit push
```
