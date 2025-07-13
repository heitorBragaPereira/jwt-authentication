package routes

import (
	"jwt-authentication/internal/controller"

	"github.com/gin-gonic/gin"
)

func InitRoutes(r *gin.RouterGroup, ctrls *controller.ControllerContainer) {
	// Rotas de usuário
	userRoutes := r.Group("/user")
	{
		userRoutes.POST("/create", ctrls.User.CreateUser)
		userRoutes.POST("/login", controller.Login) // Observe que Login ainda é uma função direta
	}

	// Futuramente você pode adicionar outros grupos de rotas aqui
	/*
		authRoutes := r.Group("/auth")
		{
			authRoutes.POST("/refresh", ctrls.Auth.RefreshToken)
		}
	*/
}
