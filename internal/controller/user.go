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

func Login(c *gin.Context) {

}
