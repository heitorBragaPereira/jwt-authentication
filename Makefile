# Caminhos e configurações
MIGRATE_BIN=migrate
DB_DRIVER=sqlite3
DB_PATH=sqlite3://data.db
MIGRATION_PATH=internal/migrations

.PHONY: migrate-create migrate-up migrate-down migrate-version

# Criar nova migration: make migrate-create NAME=create_users
migrate-create:
	$(MIGRATE_BIN) create -ext sql -dir $(MIGRATION_PATH) -seq $(NAME)

# Aplicar migrations
migrate-up:
	$(MIGRATE_BIN) -database "$(DB_PATH)" -path $(MIGRATION_PATH) up

# Reverter última migration
migrate-down:
	$(MIGRATE_BIN) -database "$(DB_PATH)" -path $(MIGRATION_PATH) down 1

# Ver versão atual das migrations
migrate-version:
	$(MIGRATE_BIN) -database "$(DB_PATH)" -path $(MIGRATION_PATH) version
