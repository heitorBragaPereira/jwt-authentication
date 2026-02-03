import { test, expect } from '@playwright/test';

test.describe('Navegação', () => {
    test('Deve navegar do Login para Cadastro', async ({ page }) => {
        await page.goto('/login');
        await page.getByRole('link', { name: 'Cadastrar um novo usuário?' }).click();
        await expect(page).toHaveURL(/\/create-user/);
        await expect(page.getByText('Cadastrar usuário')).toBeVisible();
    });

    test('Deve navegar do Cadastro para Login', async ({ page }) => {
        await page.goto('/create-user');
        await page.getByRole('link', { name: 'Voltar para a tela de login' }).click();
        await expect(page).toHaveURL(/\/login/);
        await expect(page.getByText('Acesso ao sistema')).toBeVisible();
    });
});
