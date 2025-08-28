package services

import (
	"crypto/sha256"
	"encoding/base64"
	"fmt"
	"jwt-authentication/internal/model/dto"
	"jwt-authentication/internal/repository"
	"jwt-authentication/internal/utils"
	"os"
)

type VaultService interface {
	VaultRegister(vaultItem dto.CreateVaultItemDTO) error
	GetVaultItem(idUser int) ([]dto.VaultItemDTO, error)
}

type vaultService struct {
	vaultRepo repository.VaultRepository
}

func NewVaultService(vaultRepo repository.VaultRepository) VaultService {
	return &vaultService{
		vaultRepo: vaultRepo,
	}
}

func (s *vaultService) VaultRegister(vaultItem dto.CreateVaultItemDTO) error {
	rawKey := os.Getenv("VAULT_KEY")
	hash := sha256.Sum256([]byte(rawKey))
	key := hash[:]

	encryptedValue, nonce, err := utils.Encrypt(key, []byte(vaultItem.HashedPassword))
	if err != nil {
		return err
	}

	encryptedStr := base64.StdEncoding.EncodeToString(encryptedValue)
	nonceStr := base64.StdEncoding.EncodeToString(nonce)

	return s.vaultRepo.RegisterNewVaultItem(dto.CreateVaultItemDTO{
		IdUser:         vaultItem.IdUser,
		Description:    vaultItem.Description,
		Username:       vaultItem.Username,
		Url:            vaultItem.Url,
		HashedPassword: encryptedStr,
		Nonce:          &nonceStr,
	})
}

func (s *vaultService) GetVaultItem(idUser int) ([]dto.VaultItemDTO, error) {
	items, err := s.vaultRepo.GetVaultItemsByUserId(idUser)
	if err != nil {
		return nil, err
	}

	if len(items) == 0 {
		return nil, fmt.Errorf("nenhum vault item encontrado para o usuário %d", idUser)
	}

	return items, nil

}
