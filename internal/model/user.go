package model

import "time"

type User struct {
	Id_user        int       `db:"id_user"`
	Name           string    `db:"name"`
	Username       string    `db:"username"`
	HashedPassword string    `db:"hashed_password"`
	CreatedAt      time.Time `db:"created_at"`
	UpdatedAt      time.Time `db:"updated_at"`
}
