package controller

import "jwt-authentication/internal/services"

type ControllerContainer struct {
	User  *UserController
	Vault *VaultController
}

func NewControllerContainer(userService services.UserService, vaultService services.VaultService) *ControllerContainer {
	return &ControllerContainer{
		User:  NewUserController(userService),
		Vault: NewVaultController(vaultService),
	}
}
