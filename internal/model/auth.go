package model

import (
	"time"

	"github.com/golang-jwt/jwt/v5"
)

type CustomClaims struct {
	UserID string `json:"userId"`
	Email  string `json:"email"`
	jwt.RegisteredClaims
}

type RefreshToken struct {
	ID         int        `db:"id"`
	UserID     int        `db:"user_id"`
	TokenHash  string     `db:"token_hash"`
	UserAgent  string     `db:"user_agent"`
	IPAddress  string     `db:"ip_address"`
	ExpiresAt  time.Time  `db:"expires_at"`
	CreatedAt  time.Time  `db:"created_at"`
	RevokedAt  *time.Time `db:"revoked_at"`
}