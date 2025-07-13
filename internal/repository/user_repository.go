package repository

import (
	"database/sql"
	"jwt-authentication/internal/model"
	"jwt-authentication/internal/model/dto"

	_ "github.com/mattn/go-sqlite3"
)

type UserRepository interface {
	Create(user dto.UserDTO) error
	FindByUsername(username string) (*model.User, error)
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

func (r *sqliteUserRepository) FindByUsername(username string) (*model.User, error) {
	query := `
		SELECT id, name, username, hashed_password, created_at
		FROM user
		WHERE username = ?
	`

	var user model.User
	err := r.db.QueryRow(query, username).Scan(
		&user.Id_user,
		&user.Name,
		&user.Username,
		&user.HashedPassword,
		&user.CreatedAt,
	)

	if err != nil {
		if err == sql.ErrNoRows {
			return nil, nil
		}
		return nil, err
	}

	return &user, nil
}
