import { test as base, Page } from '@playwright/test';

import { LoginPage } from '../pages/LoginPage';

export const test = base.extend<{ loggedInPage: Page }>({

    loggedInPage: async ({ page }, use) => {

        const login = new LoginPage(page);

        await login.navigate();

        await login.login("Padminis","test@123");

        await use(page);

    }

});