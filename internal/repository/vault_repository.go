package repository

import (
	"database/sql"
	"fmt"
	"jwt-authentication/internal/model/dto"
)

type VaultRepository interface {
	GetVaultItemsByUserId(userID int) ([]dto.VaultItemDTO, error)
	RegisterNewVaultItem(vaultItem dto.CreateVaultItemDTO) error
	UpdateVaultItem(vaultItem dto.UpdateVaultItemDTO) error
	DeleteVaultItem(vaultItem dto.DeleteVaultItemDTO) error
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
			&item.Id_item,
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

func (r *sqliteVaultRepository) RegisterNewVaultItem(vaultItem dto.CreateVaultItemDTO) error {
	query := `
	INSERT INTO vault_items (id_user, description, username, url, encrypted_value, nonce) 
	VALUES (?, ?, ?, ?, ?, ?);
`
	_, err := r.db.Exec(query,
		vaultItem.IdUser,
		vaultItem.Description,
		vaultItem.Username,
		vaultItem.Url,
		vaultItem.HashedPassword,
		vaultItem.Nonce,
	)

	if err != nil {
		return err
	}
	return nil
}

func (r *sqliteVaultRepository) UpdateVaultItem(vaultItem dto.UpdateVaultItemDTO) error {
	query := `
	UPDATE vault_items SET
	description = ?, 
	url = ?, 
	encrypted_value = ?, 
	nonce = ?
	WHERE id_item = ? AND id_user = ?;
`
	_, err := r.db.Exec(query,
		vaultItem.Description,
		vaultItem.Url,
		vaultItem.HashedPassword,
		vaultItem.Nonce,
		vaultItem.IdItem,
		vaultItem.IdUser,
	)

	if err != nil {
		return err
	}
	return nil
}

func (r *sqliteVaultRepository) DeleteVaultItem(vaultItem dto.DeleteVaultItemDTO) error {
	query := `
	DELETE FROM vault_items WHERE id_item = ? AND id_user = ?;
`
	_, err := r.db.Exec(query,
		vaultItem.IdItem,
		vaultItem.IdUser,
	)

	if err != nil {
		return err
	}
	return nil
}
