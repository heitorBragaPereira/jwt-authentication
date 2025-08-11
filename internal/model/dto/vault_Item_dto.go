package dto

type VaultItemDTO struct {
	Id             int    `json:"id"`
	Description    string `json:"description"`
	Username       string `json:"username"`
	Url            string `json:"url"`
	EncryptedValue string `json:"encrypted_value"`
	Nonce          string `json:"nonce"`
	CreatedAt      string `json:"created_at"`
	UpdatedAt      string `json:"updated_at"`
}

type CreateVaultItemDTO struct {
	IdUser   int    `json:"idUser"`
	Username string `json:"username"`
	Url      string `json:"url"`
}
