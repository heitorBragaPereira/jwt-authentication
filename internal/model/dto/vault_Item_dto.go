package dto

type VaultItemDTO struct {
	Description    string `json:"description"`
	Username       string `json:"username"`
	Url            string `json:"url"`
	EncryptedValue string `json:"encryptedValue"`
	Nonce          string `json:"nonce"`
	CreatedAt      string `json:"createdAt"`
	UpdatedAt      string `json:"updatedAt"`
}

type CreateVaultItemDTO struct {
	IdUser         int     `json:"idUser"`
	Username       string  `json:"username"`
	Url            string  `json:"url"`
	Description    string  `json:"description"`
	HashedPassword string  `json:"hashedPassword"`
	Nonce          *string `json:"nonce"`
}
