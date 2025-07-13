package controller

import "jwt-authentication/internal/services"

type ControllerContainer struct {
	User *UserController
	// outros controladores
}

func NewControllerContainer(userService services.UserService) *ControllerContainer {
	return &ControllerContainer{
		User: NewUserController(userService),
	}
}
