import { test, expect } from '@playwright/test';

test.describe('Página de Login', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/login');
    });

    test('Deve renderizar o formulário de login corretamente', async ({ page }) => {
        await expect(page.getByText('Acesso ao sistema')).toBeVisible();
        await expect(page.getByLabel('Usuário')).toBeVisible();
        await expect(page.getByLabel('Senha')).toBeVisible();
        await expect(page.getByRole('button', { name: 'Entrar' })).toBeVisible();
    });

    test('Deve exibir erro ao tentar submeter formulário vazio', async ({ page }) => {
        await page.getByRole('button', { name: 'Entrar' }).click();

        // O formulário usa required do HTML ou react-hook-form trigger?
        // O código usa react-hook-form com required: "Campo obrigatório"
        // e renderiza erros em spans.

        await expect(page.getByText('Campo obrigatório').first()).toBeVisible();
    });

    test('Deve permitir digitar nos campos', async ({ page }) => {
        await page.getByLabel('Usuário').fill('testuser');
        await page.getByLabel('Senha').fill('123456');

        await expect(page.getByLabel('Usuário')).toHaveValue('testuser');
        await expect(page.getByLabel('Senha')).toHaveValue('123456');
    });

    test('Deve exibir erro com credenciais inválidas', async ({ page }) => {
        // Mockando a resposta da API de login se possível ou testando fluxo real se backend estiver rodando
        // Como não sei se o backend está rodando, vou assumir que o teste E2E pode bater no backend ou falhar.
        // Mas o ideal para "foco em comportamento da interface" é mockar.

        await page.route('**/login', async route => {
            // Ajustar a URL da rota conforme necessário. A aplicação usa axios provavelmente apontando para localhost:8080 ou algo assim?
            // Vou inspecionar services depois se falhar, por enquanto vou assumir que a requisição sai.
            // Se não quiser mockar, o teste vai depender do backend.
            // Vou tentar mockar para garantir estabilidade da interface.
            await route.fulfill({
                status: 401,
                contentType: 'application/json',
                body: JSON.stringify({ success: false })
            });
        });

        // Se o hook useLoginUser usar uma URL específica, o mock acima pode precisar de ajuste.
        // Mas vamos testar inputs primeiro.

        await page.getByLabel('Usuário').fill('wronguser');
        await page.getByLabel('Senha').fill('wrongpass');
        await page.getByRole('button', { name: 'Entrar' }).click();

        await expect(page.getByText('Usuário ou senha incorretos!')).toBeVisible();
    });

    test('Deve redirecionar para home após login com sucesso', async ({ page }) => {
        await page.route('**/login', async route => { // Cuidado com a URL exata
            await route.fulfill({
                status: 200,
                contentType: 'application/json',
                body: JSON.stringify({ success: true, token: 'fake-token' })
            });
        });

        await page.getByLabel('Usuário').fill('validuser');
        await page.getByLabel('Senha').fill('validpass');
        await page.getByRole('button', { name: 'Entrar' }).click();

        await expect(page).toHaveURL(/\/home/);
    });
});
