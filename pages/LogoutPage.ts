import { Page, expect, Locator } from '@playwright/test';

export class LogoutPage {
    logoutLink: Locator;

    constructor(private page: Page) {
        this.logoutLink = this.page.locator('a[href="Logout.php"]');
    }

    async logout() {
        await this.logoutLink.click();
        await expect(this.page).toHaveURL('https://adactinhotelapp.com/Logout.php');
        await expect(this.page.getByText('You have successfully logged out. Click here to login again')).toBeVisible();
    }

}
   