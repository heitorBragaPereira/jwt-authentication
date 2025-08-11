package dto

type LoginResponseDTO struct {
	Token string         `json:"token"`
	User  GetUserDTO     `json:"user"`
	Vault []VaultItemDTO `json:"vault_items"`
}
