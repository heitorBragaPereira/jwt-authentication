package services

import (
	"jwt-authentication/internal/config/rest"
	"jwt-authentication/internal/model/dto"
	"jwt-authentication/internal/repository"
	"jwt-authentication/internal/utils"
)

type UserService interface {
	CreateUser(user dto.UserDTO) *rest.RestErr
	Login(user dto.LoginDTO) (dto.LoginResponseDTO, *rest.RestErr)
}

type userService struct {
	userRepo repository.UserRepository
}

func NewUserService(repo repository.UserRepository) UserService {
	return &userService{userRepo: repo}
}

func (s *userService) CreateUser(user dto.UserDTO) *rest.RestErr {
	hashedPassword, err := utils.HashPassword(user.HashedPassword)
	if err != nil {
		return rest.NewInternalServerError("Failed to hash password")
	}

	userEntity := dto.UserDTO{
		Name:           user.Name,
		Username:       user.Username,
		HashedPassword: hashedPassword,
	}

	if err := s.userRepo.Create(userEntity); err != nil {
		return rest.NewInternalServerError("Failed to create user")
	}

	return nil
}

func (s *userService) Login(user dto.LoginDTO) (dto.LoginResponseDTO, *rest.RestErr) {
	foundUser, err := s.userRepo.FindByUsername(user)
	if err != nil {
		return dto.LoginResponseDTO{}, rest.NewInternalServerError("Erro ao buscar usuário")
	}
	if foundUser == nil {
		return dto.LoginResponseDTO{}, rest.NewUnauthorizedError("Usuário não encontrado")
	}

	// Verifica a senha
	if !utils.CheckPasswordHash(user.HashedPassword, foundUser.HashedPassword) {
		return dto.LoginResponseDTO{}, rest.NewUnauthorizedError("Senha incorreta")
	}

	// Gera token JWT
	token, err := GenerateJWT(foundUser.Username, foundUser.Username)
	if err != nil {
		return dto.LoginResponseDTO{}, rest.NewInternalServerError("Erro ao gerar token")
	}

	if err != nil {
		return dto.LoginResponseDTO{}, rest.NewInternalServerError("Erro ao buscar vault items")
	}

	return dto.LoginResponseDTO{Token: token}, nil
}
