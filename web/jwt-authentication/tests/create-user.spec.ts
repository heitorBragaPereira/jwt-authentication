import { test, expect } from '@playwright/test';

test.describe('Página de Cadastro de Usuário', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/create-user');
    });

    test('Deve renderizar os campos corretamente', async ({ page }) => {
        await expect(page.getByText('Cadastrar usuário')).toBeVisible();
        await expect(page.getByLabel('Nome')).toBeVisible();
        await expect(page.getByLabel('Usuário')).toBeVisible();
        await expect(page.getByLabel('Senha', { exact: true })).toBeVisible(); // Exact true para não confundir com "Confirme a senha"
        await expect(page.getByLabel('Confirme a senha')).toBeVisible();
        await expect(page.getByRole('button', { name: 'Cadastrar' })).toBeVisible();
    });

    test('Deve validar senhas não coincidentes', async ({ page }) => {
        await page.getByLabel('Senha', { exact: true }).fill('123456');
        await page.getByLabel('Confirme a senha').fill('654321');
        // Forçar validação (blur ou submit)
        await page.getByLabel('Confirme a senha').blur();

        // O react-hook-form valida no submit ou onBlur dependendo do mode. No código vi required, e validate function. 
        // Vamos tentar submeter.
        await page.getByRole('button', { name: 'Cadastrar' }).click();

        await expect(page.getByText('As senhas não conferem')).toBeVisible();
    });

    test('Deve exibir sucesso ao cadastrar', async ({ page }) => {
        // Mockar criação
        await page.route('**/users', async route => { // URL a verificar
            if (route.request().method() === 'POST') {
                await route.fulfill({
                    status: 201, // O código espera status 201
                    contentType: 'application/json',
                    body: JSON.stringify({})
                });
            } else {
                await route.continue();
            }
        });

        await page.getByLabel('Nome').fill('Novo Usuario');
        await page.getByLabel('Usuário').fill('novouser');
        await page.getByLabel('Senha', { exact: true }).fill('password');
        await page.getByLabel('Confirme a senha').fill('password');

        await page.getByRole('button', { name: 'Cadastrar' }).click();

        await expect(page.getByText('Usuário cadastrado ;)')).toBeVisible();
    });
});
