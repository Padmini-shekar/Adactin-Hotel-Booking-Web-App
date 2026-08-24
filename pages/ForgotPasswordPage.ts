import { Page, Locator, expect } from '@playwright/test';

export class ForgotPasswordPage {

    readonly page: Page;

    // Locators
    readonly forgotPasswordLink: Locator;
    readonly emailTextbox: Locator;
    readonly submitButton: Locator;
    readonly cancelButton: Locator;
    readonly successMessage: Locator;
    readonly errorMessage: Locator;

    constructor(page: Page) {

        this.page = page;

        this.forgotPasswordLink = page.locator('text=Forgot Password?');

        this.emailTextbox = page.locator('#emailadd_recovery');

        this.submitButton = page.locator('#Submit');

        this.cancelButton = page.locator('#Cancel');

        this.successMessage = page.locator('An email has been sent to your email address containing Username and Password. Please check your email.');   // Update if needed

        this.errorMessage = page.locator('#emailadd_span');     // Update if needed
    }

    async navigate() {

        await this.page.goto('https://adactinhotelapp.com/');
    }

    async clickForgotPassword() {

        await this.forgotPasswordLink.click();
    }

    async enterEmail(email: string) {

        await this.emailTextbox.fill(email);
    }

    async clickSubmit() {

        await this.submitButton.click();
    }

    async clickCancel() {

        await this.cancelButton.click();
    }

    async resetPassword(email: string) {

        await this.enterEmail(email);

        await this.clickSubmit();
    }

    async verifyForgotPasswordPage() {

        await expect(this.page).toHaveURL('https://adactinhotelapp.com/ForgotPassword.php');

        await expect(this.emailTextbox).toBeVisible();
    }

    async verifySuccessMessage(expectedMessage: string) {

        await expect(this.successMessage)
            .toContainText(expectedMessage);
    }

    async verifyErrorMessage(expectedMessage: string) {

        await expect(this.errorMessage)
            .toHaveText(expectedMessage);
    }

}