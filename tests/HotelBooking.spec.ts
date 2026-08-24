import { test, expect } from '@playwright/test';
// removed unused imports

import { LoginPage } from '../pages/LoginPage';
import { LogoutPage } from '../pages/LogoutPage';
import { SearchHotelPage } from '../pages/SearchHotelPage';
import { GenericPage } from '../pages/GenericPageFormat';

import { readExcelDataSheet6 } from 'C:\\Users\\rsato\\OneDrive\\Desktop\\playwright-adactin-framework\\utils\\ExcelHelper';
const testData = readExcelDataSheet6('C:\\Users\\rsato\\OneDrive\\Desktop\\playwright-adactin-framework\\testdata\\Test Data.xlsx', 'Book A Hotel', 'TC_BAH_022');

import { readExcelDataSheet2 } from 'C:\\Users\\rsato\\OneDrive\\Desktop\\playwright-adactin-framework\\utils\\ExcelHelper';
import { DateUtils } from '../utils/DateUtils';
import { SelectHotelPage } from '../pages/SelectHotelPage';
import { BookHotelPage } from '../pages/BookHotelPage';
const loginTestData = readExcelDataSheet2('C:\\Users\\rsato\\OneDrive\\Desktop\\playwright-adactin-framework\\testdata\\Test Data.xlsx', 'Existing User Login', 'TC_EUL_001');

test.beforeEach(async ({ page }) => {
    const login = new LoginPage(page);
    await login.navigate();     
    await login.login(loginTestData[0].Username, loginTestData[0].Password);
    const searchHotelPage = new SearchHotelPage(page);
    const selectHotelPage = new SelectHotelPage(page);
    await searchHotelPage.goToSearchHotelPage();
    await searchHotelPage.searchHotel();
    await searchHotelPage.validateSuccessfulSearch();
    await selectHotelPage.selectHotel();
    await selectHotelPage.validatesuccessfulselection();
});

test('TC_BAH_022 - Cancel button without completing the booking form', async ({ page }) => {
    console.log(`Processing Test Case ID: TC_BAH_022`);
    await page.locator('#cancel').click();
    await expect(page).toHaveURL(/SelectHotel/);
});

test('TC_BAH_023 - Cancel button by completing the booking form', async ({ page }) => {
    console.log(`Processing Test Case ID: TC_BAH_023`);
    const testData_SRH = readExcelDataSheet6('C:\\Users\\rsato\\OneDrive\\Desktop\\playwright-adactin-framework\\testdata\\Test Data.xlsx', 'Book A Hotel', 'TC_BAH_023');
    console.log(`Processing Test Case ID: TC_BAH_023`);

    const bookHotelPage = new BookHotelPage(page);
    for(const dataSRH of testData_SRH) {
        console.log(dataSRH);
        console.log(`Processing Test Case ID: ${dataSRH.TestCaseId}`);
    
    await bookHotelPage.bookHotel(
        dataSRH.FirstName,
        dataSRH.LastName,
        dataSRH.BillingAddress,
        dataSRH.CreditCardNo,
        dataSRH.CreditCardType,
        String(dataSRH.ExpiryMonth),
        String(dataSRH.ExpiryYear),
        String(dataSRH.CVV)
    );
}
    await page.locator('#cancel').click();
    await expect(page).toHaveURL(/SelectHotel/);
});

test('TC_BAH_024 - Book without completing the booking form', async ({ page }) => {
    console.log(`Processing Test Case ID: TC_BAH_024`);
    await page.locator('#book_now').click();
    await expect(page.locator('#first_name_span')).toHaveText('Please Enter your First Name');
    await expect(page.locator('#last_name_span')).toHaveText('Please Enter you Last Name');
    await expect(page.locator('#address_span')).toHaveText('Please Enter your Address');
    await expect(page.locator('#cc_num_span')).toHaveText('Please Enter your 16 Digit Credit Card Number');
    await expect(page.locator('#cc_type_span')).toHaveText('Please Select your Credit Card Type');
    await expect(page.locator('#cc_expiry_span')).toHaveText('Please Select your Credit Card Expiry Month');
   
    await expect(page.locator('#cc_cvv_span')).toHaveText('Please Enter your Credit Card CVV Number');
});

test('TC_BAH_025 - Book Now button by completing the booking form', async ({ page }) => {
    console.log(`Processing Test Case ID: TC_BAH_025`);
    const testData_SRH = readExcelDataSheet6('C:\\Users\\rsato\\OneDrive\\Desktop\\playwright-adactin-framework\\testdata\\Test Data.xlsx', 'Book A Hotel', 'TC_BAH_025');
    console.log(`Processing Test Case ID: TC_BAH_025`);

    const bookHotelPage = new BookHotelPage(page);
    for(const dataSRH of testData_SRH) {
        console.log(dataSRH);
        console.log(`Processing Test Case ID: ${dataSRH.TestCaseId}`);
    
    await bookHotelPage.bookHotel(
        dataSRH.FirstName,
        dataSRH.LastName,
        dataSRH.BillingAddress,
        dataSRH.CreditCardNo,
        dataSRH.CreditCardType,
        String(dataSRH.ExpiryMonth),
        String(dataSRH.ExpiryYear),
        String(dataSRH.CVV)
    );
}
    await page.locator('#book_now').click();
    await page.waitForTimeout(5000);
    await bookHotelPage.validateBookingConfirmation();
});

test('TC_BAH_027_1 - Invalid Credit Card Number', async ({ page }) => {
    console.log(`Processing Test Case ID: TC_BAH_027_1`);
    const testData_SRH = readExcelDataSheet6('C:\\Users\\rsato\\OneDrive\\Desktop\\playwright-adactin-framework\\testdata\\Test Data.xlsx', 'Book A Hotel', 'TC_BAH_027_1');
    console.log(`Processing Test Case ID: TC_BAH_027_1`);

    const bookHotelPage = new BookHotelPage(page);
    for(const dataSRH of testData_SRH) {
        console.log(dataSRH);
        console.log(`Processing Test Case ID: ${dataSRH.TestCaseId}`);
    
    await bookHotelPage.bookHotel(
        dataSRH.FirstName,
        dataSRH.LastName,
        dataSRH.BillingAddress,
        String(dataSRH.CreditCardNo),
        dataSRH.CreditCardType,
        String(dataSRH.ExpiryMonth),
        String(dataSRH.ExpiryYear),
        String(dataSRH.CVV)
    );
}
    await page.locator('#book_now').click();
     await expect(page.locator('#cc_num_span')).toHaveText('Please Enter your 16 Digit Credit Card Number');
});

test('TC_BAH_029_2 - Select Expiry Month only', async ({ page }) => {
    console.log(`Processing Test Case ID: TC_BAH_029_2`);
    const testData_SRH = readExcelDataSheet6('C:\\Users\\rsato\\OneDrive\\Desktop\\playwright-adactin-framework\\testdata\\Test Data.xlsx', 'Book A Hotel', 'TC_BAH_029_2');
    console.log(`Processing Test Case ID: TC_BAH_029_2`);

    const bookHotelPage = new BookHotelPage(page);
    for(const dataSRH of testData_SRH) {
        console.log(dataSRH);
        console.log(`Processing Test Case ID: ${dataSRH.TestCaseId}`);
    
    await bookHotelPage.bookHotel(
        dataSRH.FirstName,
        dataSRH.LastName,
        dataSRH.BillingAddress,
        String(dataSRH.CreditCardNo),
        dataSRH.CreditCardType,
        String(dataSRH.ExpiryMonth),
        String('- Select Year -'),
        String(dataSRH.CVV)
    );
}
    await page.locator('#book_now').click();
    await expect(page.locator('#cc_expiry_span')).toHaveText('Please Select your Credit Card Expiry Year');
});

test('TC_BAH_029_3 - Select Expiry Year only', async ({ page }) => {
    console.log(`Processing Test Case ID: TC_BAH_029_3`);
    const testData_SRH = readExcelDataSheet6('C:\\Users\\rsato\\OneDrive\\Desktop\\playwright-adactin-framework\\testdata\\Test Data.xlsx', 'Book A Hotel', 'TC_BAH_029_3');
    console.log(`Processing Test Case ID: TC_BAH_029_3`);

    const bookHotelPage = new BookHotelPage(page);
    for(const dataSRH of testData_SRH) {
        console.log(dataSRH);
        console.log(`Processing Test Case ID: ${dataSRH.TestCaseId}`);
    
    await bookHotelPage.bookHotel(
        dataSRH.FirstName,
        dataSRH.LastName,
        dataSRH.BillingAddress,
        String(dataSRH.CreditCardNo),
        dataSRH.CreditCardType,
        String('- Select Month -'),
        String(dataSRH.ExpiryYear),
        
        String(dataSRH.CVV)
    );
}
    await page.locator('#book_now').click();
    await expect(page.locator('#cc_expiry_span')).toHaveText('Please Select your Credit Card Expiry Month');
});

