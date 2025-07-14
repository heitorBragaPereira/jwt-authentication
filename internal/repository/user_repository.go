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
