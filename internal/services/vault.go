package services

import (
	"encoding/base64"
	"fmt"
	"jwt-authentication/internal/model/dto"
	"jwt-authentication/internal/repository"
	"jwt-authentication/internal/utils"
)

type VaultService interface {
	VaultRegister(vaultItem dto.CreateVaultItemDTO) error
	GetVaultItem(idUser int) ([]dto.VaultItemDTO, error)
	VaultUpdate(vaultItem dto.UpdateVaultItemDTO) error
	VaultDelete(vaultItem dto.DeleteVaultItemDTO) error
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
	key, err := utils.GetSecurityKey()
	if err != nil {
		panic(err)
	}

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

func (s *vaultService) VaultUpdate(vaultItem dto.UpdateVaultItemDTO) error {
	key, err := utils.GetSecurityKey()
	if err != nil {
		panic(err)
	}

	encryptedValue, nonce, err := utils.Encrypt(key, []byte(vaultItem.HashedPassword))
	if err != nil {
		return err
	}

	encryptedStr := base64.StdEncoding.EncodeToString(encryptedValue)
	nonceStr := base64.StdEncoding.EncodeToString(nonce)

	return s.vaultRepo.UpdateVaultItem(dto.UpdateVaultItemDTO{
		IdItem:         vaultItem.IdItem,
		IdUser:         vaultItem.IdUser,
		Description:    vaultItem.Description,
		Username:       vaultItem.Username,
		Url:            vaultItem.Url,
		HashedPassword: encryptedStr,
		Nonce:          &nonceStr,
	})

}

func (s *vaultService) VaultDelete(vaultItem dto.DeleteVaultItemDTO) error {
	return s.vaultRepo.DeleteVaultItem(vaultItem)

}

func (s *vaultService) GetVaultItem(idUser int) ([]dto.VaultItemDTO, error) {
	items, err := s.vaultRepo.GetVaultItemsByUserId(idUser)
	if err != nil {
		return nil, err
	}

	if len(items) == 0 {
		return nil, nil
	}

	key, err := utils.GetSecurityKey()
	if err != nil {
		panic(err)
	}

	var result []dto.VaultItemDTO
	for _, item := range items {
		encryptedValue, err := base64.StdEncoding.DecodeString(item.EncryptedValue)
		if err != nil {
			return nil, err
		}

		nonce, err := base64.StdEncoding.DecodeString(item.Nonce)
		if err != nil {
			return nil, err
		}

		if len(nonce) != 12 {
			return nil, fmt.Errorf("nonce inválido: esperado 12 bytes, obtido %d", len(nonce))
		}

		decryptedValue, err := utils.Decrypt(key, encryptedValue, nonce)
		if err != nil {
			return nil, err
		}

		result = append(result, dto.VaultItemDTO{
			Id_item:        item.Id_item,
			Description:    item.Description,
			Username:       item.Username,
			Url:            item.Url,
			EncryptedValue: string(decryptedValue), // aqui já é a senha real
			CreatedAt:      item.CreatedAt,
			UpdatedAt:      item.UpdatedAt,
		})
	}

	return result, nil

}
