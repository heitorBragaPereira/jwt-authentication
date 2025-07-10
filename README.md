# Autenticação JWT usando GO e React.js

## Estrutura de pastas do projeto

```text
my-app/
├── cmd/                     # entrypoint: main.go
├── internal/
│   ├── handler/             # Controllers (→ pattern: Facade)
│   ├── service/             # Regras de negócio (→ pattern: Strategy)
│   ├── repository/          # Acesso a dados (→ pattern: Repository + Singleton)
│   ├── middleware/          # JWT, logs (→ pattern: Proxy)
│   └── model/               # Entidades e DTOs
├── pkg/
│   ├── jwt/                 # Geração/validação de tokens
│   └── utils/               # Helpers
├── web/                     # Projeto React com Vite
│   └── dist/                # Arquivos estáticos pós-build
├── go.mod

```
