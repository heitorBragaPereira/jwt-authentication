package rest

import "net/http"

type RestErr struct {
	Message string `json:"message"`
	Code    int    `json:"code"`
	Error   string `json:"error"`
}

// Função para erro 400 - Bad Request
func NewBadRequestError(message string) *RestErr {
	return &RestErr{
		Message: message,
		Code:    http.StatusBadRequest,
		Error:   "bad_request",
	}
}

// Função para erro 404 - Not Found
func NewNotFoundError(message string) *RestErr {
	return &RestErr{
		Message: message,
		Code:    http.StatusNotFound,
		Error:   "not_found",
	}
}

// Função para erro 500 - Internal Server Error
func NewInternalServerError(message string) *RestErr {
	return &RestErr{
		Message: message,
		Code:    http.StatusInternalServerError,
		Error:   "internal_server_error",
	}
}

// Função para erro 401 - Unauthorized
func NewUnauthorizedError(message string) *RestErr {
	return &RestErr{
		Message: message,
		Code:    http.StatusUnauthorized,
		Error:   "unauthorized",
	}
}
