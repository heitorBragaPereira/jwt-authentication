package utils

import (
	"crypto/sha256"
	"errors"
	"os"

	"golang.org/x/crypto/bcrypt"
)

func HashPassword(password string) (string, error) {
	bytes, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	return string(bytes), err
}

func CheckPasswordHash(password, hash string) bool {
	err := bcrypt.CompareHashAndPassword([]byte(hash), []byte(password))
	return err == nil
}

func GetSecurityKey() ([]byte, error) {
	rawKey := os.Getenv("VAULT_KEY")
	if rawKey == "" {
		return nil, errors.New("VAULT_KEY não está definida")
	}

	hash := sha256.Sum256([]byte(rawKey))
	key := hash[:]
	return key, nil
}
