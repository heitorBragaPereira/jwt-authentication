package repository

import "jwt-authentication/internal/model/dto"

type VaultRepository interface {
	Create(user dto.CreateVaultItemDTO) error
}
