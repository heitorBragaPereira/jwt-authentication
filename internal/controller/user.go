package controller

import (
	"jwt-authentication/internal/config/rest"
	"jwt-authentication/internal/model/dto"
	"jwt-authentication/internal/services"

	"github.com/gin-gonic/gin"
)

type UserController struct {
	userService services.UserService
}

func NewUserController(service services.UserService) *UserController {
	return &UserController{userService: service}
}

func (uc *UserController) CreateUser(c *gin.Context) {
	var userRequest dto.UserDTO
	if err := c.ShouldBindJSON(&userRequest); err != nil {
		restErr := rest.NewBadRequestError("There are some incorrect filds")
		c.JSON(restErr.Code, restErr)
		return
	}
	err := uc.userService.CreateUser(userRequest)
	if err != nil {
		c.JSON(err.Code, err)
		return
	}

	c.JSON(201, gin.H{"message": "User created successfully"})
}

func (uc *UserController) Login(c *gin.Context) {
	var userRequest dto.LoginDTO
	if err := c.ShouldBindJSON(&userRequest); err != nil {
		restErr := rest.NewBadRequestError("There are some incorrect fields")
		c.JSON(restErr.Code, restErr)
		return
	}
	loginResp, err := uc.userService.Login(userRequest)
	if err != nil {
		c.JSON(err.Code, err)
		return
	}

	// 🧠 Define o cookie HttpOnly com o token JWT
	c.SetCookie(
		"token",         // nome do cookie
		loginResp.Token, // valor: o JWT gerado
		3600,            // tempo de expiração (em segundos) → 1h
		"/",             // path
		"",              // domínio ("" = atual)
		true,            // secure (HTTPS em produção!)
		true,            // httpOnly (impede acesso via JS)
	)

	c.JSON(200, gin.H{"message": "Login realizado com sucesso"})
}
