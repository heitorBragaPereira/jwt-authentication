package repository

import (
	"database/sql"
	"errors"
	"fmt"
	"jwt-authentication/internal/model/dto"

	_ "github.com/mattn/go-sqlite3"
)

type UserRepository interface {
	Create(user dto.UserDTO) error
	FindByUsername(username dto.LoginDTO) (*dto.UserDTO, error)
}

type sqliteUserRepository struct {
	db *sql.DB
}

func NewUserRepository(db *sql.DB) UserRepository {
	return &sqliteUserRepository{db: db}
}

func (r *sqliteUserRepository) Create(user dto.UserDTO) error {
	query := `
		INSERT INTO user (name, username, hashed_password)
		VALUES (?, ?, ?)
	`

	_, err := r.db.Exec(query, user.Name, user.Username, user.HashedPassword)
	if err != nil {
		return err
	}

	return nil
}

func (r *sqliteUserRepository) FindByUsername(u dto.LoginDTO) (*dto.UserDTO, error) {
	query := `
		SELECT name, username, hashed_password
		FROM user
		WHERE username = ?
		LIMIT 1
	`

	var user dto.UserDTO
	err := r.db.QueryRow(query, u.Username).Scan(
		&user.Name,
		&user.Username,
		&user.HashedPassword,
	)

	if err != nil {
		if errors.Is(err, sql.ErrNoRows) {
			return nil, nil
		}
		return nil, fmt.Errorf("falha ao buscar usuário no banco: %w", err)
	}

	return &user, nil
}

func (r *sqliteUserRepository) GetVaultItemsByUserID(userID int) ([]dto.VaultItemDTO, error) {
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
