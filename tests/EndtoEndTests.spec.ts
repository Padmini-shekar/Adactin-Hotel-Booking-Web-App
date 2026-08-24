import { test, expect } from '@playwright/test';
// removed unused imports

import { LoginPage } from '../pages/LoginPage';
import { LogoutPage } from '../pages/LogoutPage';
import { SearchHotelPage } from '../pages/SearchHotelPage';
import { GenericPage } from '../pages/GenericPageFormat';
import { readExcelDataSheet4 } from 'C:\\Users\\rsato\\OneDrive\\Desktop\\playwright-adactin-framework\\utils\\ExcelHelper';
import { readExcelDataSheet6 } from 'C:\\Users\\rsato\\OneDrive\\Desktop\\playwright-adactin-framework\\utils\\ExcelHelper';


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
    
    const bookHotelPage = new BookHotelPage(page);
    await searchHotelPage.goToSearchHotelPage();
});

test('End-to-End Test: Book a Hotel', async ({ page }) => {
    const searchHotelPage = new SearchHotelPage(page);
    const selectHotelPage = new SelectHotelPage(page);
    const bookHotelPage = new BookHotelPage(page);

    const testData_SRH = readExcelDataSheet4('C:\\Users\\rsato\\OneDrive\\Desktop\\playwright-adactin-framework\\testdata\\Test Data.xlsx', 'Search Hotel', 'TC_SRH_055_1');
    const testData_BAH = readExcelDataSheet6('C:\\Users\\rsato\\OneDrive\\Desktop\\playwright-adactin-framework\\testdata\\Test Data.xlsx', 'Book A Hotel', 'TC_BAH_031');
   
    searchHotelPage.goToSearchHotelPage();
    const dataSRH = testData_SRH[0];
    console.log(dataSRH.Location);
   await searchHotelPage.searchHotel(dataSRH.Location, dataSRH.Hotels, dataSRH.RoomType, dataSRH.NumberOfRooms, dataSRH.CheckInDate, dataSRH.CheckOutDate, dataSRH.AdultsPerRoom, dataSRH.ChildrenPerRoom);
    
    await searchHotelPage.validateSuccessfulSearch();
    await page.locator('#radiobutton_1').check();
    await page.locator('#continue').click();
    await selectHotelPage.validatesuccessfulselection();
   
    for (const dataBAH of testData_BAH) {
        console.log(dataBAH);
        console.log(`Processing Test Case ID: ${dataBAH.TestCaseId}`);
        await bookHotelPage.bookHotel((dataBAH as any).FirstName, (dataBAH as any).LastName, (dataBAH as any).Address, (dataBAH as any).CreditCardNo, (dataBAH as any).CreditCardType, (dataBAH as any).ExpiryMonth, (dataBAH as any).ExpiryYear, (dataBAH as any).CVVNo);
    }
    await bookHotelPage.validateBookingConfirmation();
});