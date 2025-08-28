package routes

import (
	"jwt-authentication/internal/controller"
	"jwt-authentication/internal/middleware"

	"github.com/gin-gonic/gin"
)

func InitRoutes(r *gin.RouterGroup, c *controller.ControllerContainer) {
	// Rotas de usuário
	userRoutes := r.Group("/user")
	{
		userRoutes.POST("/create", c.User.CreateUser)
		userRoutes.POST("/login", c.User.Login) // Observe que Login ainda é uma função direta
	}

	protected := r.Group("/vault")
	protected.Use(middleware.AuthMiddleware())
	{
		protected.POST("/create", c.Vault.CreateVaultItem)
		protected.GET("/items", c.Vault.GetVaultItem)
	}
}
