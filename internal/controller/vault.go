package controller

import (
	"jwt-authentication/internal/config/rest"
	"jwt-authentication/internal/model/dto"
	"jwt-authentication/internal/services"

	"github.com/gin-gonic/gin"
)

type VaultController struct {
	vaultService services.VaultService
}

func NewVaultController(service services.VaultService) *VaultController {
	return &VaultController{vaultService: service}
}

func (v *VaultController) CreateVaultItem(c *gin.Context) {
	var vaulItem dto.CreateVaultItemDTO
	if err := c.ShouldBindJSON(&vaulItem); err != nil {
		restErr := rest.NewBadRequestError("There are some incorrect filds")
		c.JSON(restErr.Code, restErr)
		return
	}
	if err := v.vaultService.VaultRegister(vaulItem); err != nil {
		c.JSON(500, gin.H{"error": err.Error()})
		return
	}
	c.JSON(201, gin.H{"message": "User created successfully"})
}
