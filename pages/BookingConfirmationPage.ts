import { Locator, Page, expect } from '@playwright/test';

export class BookingConfirmationPage{

    orderNo: Locator;

    logoutBtn: Locator;

    constructor(private page: Page){
        this.orderNo = this.page.locator('#order_no');
        this.logoutBtn = this.page.getByRole('button', { name: 'Logout' });
    }

    async verifyBooking(){
        await expect(this.page).toHaveURL('https://adactinhotelapp.com/BookingConfirm.php');
        await expect(this.orderNo).toBeVisible();
    }

    async getOrderNumber(){

        return await this.orderNo.inputValue();

    }

    async logout(){

        await this.logoutBtn.click();

    }

}

function If(arg0: void) {
    throw new Error('Function not implemented.');
}
