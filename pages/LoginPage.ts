import { Page, expect } from '@playwright/test';

export class LoginPage {

    username;
    password;
    loginBtn;
  

    constructor(private page: Page) {
        this.username = this.page.locator('#username');
        this.password = this.page.locator('#password');
        this.loginBtn = this.page.locator('#login');
        
    }

    async navigate() {
        await this.page.goto('https://adactinhotelapp.com/');
    }


    async login(username?: string, password?: string) {

        if (username) await this.page.locator('#username').pressSequentially(username, { delay: 50 });
        if (password) await this.page.locator('#password').pressSequentially(password, { delay: 50 });
        await this.loginBtn.click();

    }

    async verifyLogin() {
        await expect(this.page).toHaveURL('https://adactinhotelapp.com/SearchHotel.php');
        await expect(this.page.getByRole('cell', { name: 'Welcome to Adactin Group of Hotels' })).toBeVisible();


    }

}