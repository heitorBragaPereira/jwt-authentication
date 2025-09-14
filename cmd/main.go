package main

import (
	"jwt-authentication/internal/config"
	"jwt-authentication/internal/controller"
	"jwt-authentication/internal/repository"
	"jwt-authentication/internal/routes"
	"jwt-authentication/internal/services"
	"log"
	"os"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	_ "github.com/golang-migrate/migrate/v4/database/sqlite"
	_ "github.com/golang-migrate/migrate/v4/source/file"
	"github.com/joho/godotenv"
	_ "modernc.org/sqlite"

	"github.com/golang-migrate/migrate/v4"
)

func main() {
	// Inicializa a variável de ambiente
	if err := godotenv.Load("../.env"); err != nil {
		log.Println("Aviso: não foi possível carregar .env")
	}

	// Executa as migrations
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
	vaultRepo := repository.NewVaultRepository(db)
	userService := services.NewUserService(userRepo, vaultRepo)
	vaultService := services.NewVaultService(vaultRepo)
	controllers := controller.NewControllerContainer(userService, vaultService)

	router := gin.Default()

	router.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://localhost:3000"},
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Authorization"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
	}))

	apiGroup := router.Group("/api")
	routes.InitRoutes(apiGroup, controllers)
	if err := router.Run(":8082"); err != nil {
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
		"sqlite://db/vault.db",
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
