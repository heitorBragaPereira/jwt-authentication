package repository

import (
	"database/sql"
	"fmt"
	"jwt-authentication/internal/model/dto"
)

type VaultRepository interface {
	GetVaultItemsByUserId(userID int) ([]dto.VaultItemDTO, error)
}

type sqliteVaultRepository struct {
	db *sql.DB
}

func NewVaultRepository(db *sql.DB) VaultRepository {
	return &sqliteVaultRepository{db: db}
}

func (r *sqliteVaultRepository) GetVaultItemsByUserId(userID int) ([]dto.VaultItemDTO, error) {
	query := `
        SELECT id_item, description, username, url, encrypted_value, nonce, created_at, updated_at
        FROM vault_items
        WHERE id_user = ?
    `

	rows, err := r.db.Query(query, userID)
	if err != nil {
		return nil, fmt.Errorf("erro ao buscar vault items: %w", err)
	}
	defer rows.Close()

	var items []dto.VaultItemDTO

	for rows.Next() {
		var item dto.VaultItemDTO
		err := rows.Scan(
			&item.Id,
			&item.Description,
			&item.Username,
			&item.Url,
			&item.EncryptedValue,
			&item.Nonce,
			&item.CreatedAt,
			&item.UpdatedAt,
		)
		if err != nil {
			return nil, fmt.Errorf("erro ao ler vault item: %w", err)
		}
		items = append(items, item)
	}

	if err := rows.Err(); err != nil {
		return nil, fmt.Errorf("erro ao iterar sobre vault items: %w", err)
	}

	return items, nil
}
