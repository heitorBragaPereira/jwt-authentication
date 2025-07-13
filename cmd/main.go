package main

import (
	"jwt-authentication/internal/config"
	"jwt-authentication/internal/controller"
	"jwt-authentication/internal/repository"
	"jwt-authentication/internal/routes"
	"jwt-authentication/internal/services"
	"log"
	"os"

	"github.com/gin-gonic/gin"
	_ "github.com/golang-migrate/migrate/v4/database/sqlite3"
	_ "github.com/golang-migrate/migrate/v4/source/file"
	_ "github.com/mattn/go-sqlite3"

	"github.com/golang-migrate/migrate/v4"
)

func main() {
	if err := runMigrations(); err != nil {
		log.Fatalf("[ERROR] Erro ao aplicar migrations: %v", err)
	} else {
		log.Println("[INFO] Banco de dados criado e migrations aplicadas com sucesso.")
	}

	// Inicializa o banco de dados
	db, err := config.InitDB("db/vault.db")
	if err != nil {
		log.Fatalf("Erro ao conectar ao banco de dados: %v", err)
	}
	defer db.Close()

	userRepo := repository.NewUserRepository(db)
	userService := services.NewUserService(userRepo)
	controllers := controller.NewControllerContainer(userService)

	router := gin.Default()
	apiGroup := router.Group("/api")
	routes.InitRoutes(apiGroup, controllers)
	if err := router.Run(":8081"); err != nil {
		log.Fatal(err)
	}
}

func runMigrations() error {
	// Aqui eu crio a pasta db, caso ela não exista
	err := os.MkdirAll("db", os.ModePerm)
	if err != nil {
		return err
	}

	m, err := migrate.New(
		"file://../internal/migrations",
		"sqlite3://db/vault.db",
	)
	if err != nil {
		return err
	}

	err = m.Up()
	if err != nil && err.Error() != "no change" {
		return err
	}

	return nil
}
