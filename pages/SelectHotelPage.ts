import { expect, Locator, Page } from '@playwright/test';

export class SelectHotelPage{

    private readonly firstHotel: Locator;

    private readonly continueBtn: Locator;

    constructor(private page: Page){
        this.firstHotel = this.page.locator('#radiobutton_1');
        this.continueBtn = this.page.locator('#continue');
    }

    async selectHotel(){

        await this.firstHotel.check();

        await this.continueBtn.click();

    }

    async validatesuccessfulselection(){
        await expect(this.page).toHaveURL(/BookHotel/);
    }

}