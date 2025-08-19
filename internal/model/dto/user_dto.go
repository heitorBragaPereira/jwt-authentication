package dto

type UserDTO struct {
	Id             int    `json:"idUser"`
	Name           string `json:"name" binding:"required"`
	Username       string `json:"username" binding:"required"`
	HashedPassword string `json:"password" binding:"required"`
}

type LoginDTO struct {
	Username       string `json:"username" binding:"required"`
	HashedPassword string `json:"password" binding:"required"`
}

type GetUserDTO struct {
	Id       int    `json:"idUser"`
	Name     string `json:"name"`
	Username string `json:"username"`
}
