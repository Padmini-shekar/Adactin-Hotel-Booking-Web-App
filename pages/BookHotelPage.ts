import { expect, Page } from '@playwright/test';

export class BookHotelPage{

    firstName;

    lastName;

    address;

    ccNumber;

    ccType;

    expiryMonth;

    expiryYear;

    cvv;

    bookNow;

    constructor(private page: Page){
        this.firstName = this.page.locator('#first_name');
        this.lastName = this.page.locator('#last_name');
        this.address = this.page.locator('#address');
        this.ccNumber = this.page.locator('#cc_num');
        this.ccType = this.page.locator('#cc_type');
        this.expiryMonth = this.page.locator('#cc_exp_month');
        this.expiryYear = this.page.locator('#cc_exp_year');
        this.cvv = this.page.locator('#cc_cvv');
        this.bookNow = this.page.locator('#book_now');
    }

    async bookHotel(fn? : string, ln?: string, addr?: string, ccNum?: string, ccTyp?: string, expMon?: string, expYr?: string, cvvNum?: string){

        await this.firstName.fill(fn || 'John');

        await this.lastName.fill(ln || 'Smith');

        await this.address.fill(addr || 'Sydney NSW');

        await this.ccNumber.fill(ccNum || '4111111111111111');

        await this.ccType.selectOption(ccTyp || 'VISA');

        await this.expiryMonth.selectOption(expMon || '10');

        await this.expiryYear.selectOption(expYr || '2029');

        await this.cvv.fill(cvvNum || '123');

        await this.bookNow.click();

    }
    async validateBookingConfirmation(){
        await expect(this.page).toHaveURL('https://adactinhotelapp.com/BookingConfirm.php');
        
        await this.page.waitForSelector('#booking_form');
        await this.page.waitForSelector('#order_no');
        const orderNo = await this.page.locator('#order_no').inputValue();
        console.log(`Booking Confirmation Order Number: ${orderNo}`);
    }

}