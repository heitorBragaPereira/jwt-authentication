package services

import (
	"time"

	auth "jwt-authentication/internal/model"

	"github.com/golang-jwt/jwt/v5"
)

func GenerateJWT(userID, email string) (string, error) {
	claims := auth.CustomClaims{
		UserID: userID,
		Email:  email,
		RegisteredClaims: jwt.RegisteredClaims{
			ExpiresAt: jwt.NewNumericDate(time.Now().Add(24 * time.Hour)),
			IssuedAt:  jwt.NewNumericDate(time.Now()),
			NotBefore: jwt.NewNumericDate(time.Now()),
		},
	}
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	signedToken, err := token.SignedString([]byte("sua-chave-secreta"))
	if err != nil {
		return "", err
	}
	return signedToken, nil
}
