package services

import (
	"jwt-authentication/internal/config/rest"
	"jwt-authentication/internal/model/dto"
	"jwt-authentication/internal/repository"
)

type UserService interface {
	CreateUser(user dto.UserDTO) *rest.RestErr
}

type userService struct {
	userRepo repository.UserRepository
}

func NewUserService(repo repository.UserRepository) UserService {
	return &userService{userRepo: repo}
}

func (s *userService) CreateUser(user dto.UserDTO) *rest.RestErr {
	// hashed := hashPassword(user.HashedPassword)
	userEntity := dto.UserDTO{
		Name:           user.Name,
		Username:       user.Username,
		HashedPassword: user.HashedPassword,
	}

	if err := s.userRepo.Create(userEntity); err != nil {
		return rest.NewInternalServerError("Failed to create user")
	}

	return nil
}
