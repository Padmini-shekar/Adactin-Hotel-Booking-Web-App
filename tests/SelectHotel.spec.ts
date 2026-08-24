import { test, expect } from '@playwright/test';
// removed unused imports

import { LoginPage } from '../pages/LoginPage';
import { LogoutPage } from '../pages/LogoutPage';
import { SearchHotelPage } from '../pages/SearchHotelPage';
import { GenericPage } from '../pages/GenericPageFormat';

import { readExcelDataSheet4 } from 'C:\\Users\\rsato\\OneDrive\\Desktop\\playwright-adactin-framework\\utils\\ExcelHelper';
const testData = readExcelDataSheet4('C:\\Users\\rsato\\OneDrive\\Desktop\\playwright-adactin-framework\\testdata\\Test Data.xlsx', 'Select Hotel', 'TC_SLH_017');

import { readExcelDataSheet2 } from 'C:\\Users\\rsato\\OneDrive\\Desktop\\playwright-adactin-framework\\utils\\ExcelHelper';
import { DateUtils } from '../utils/DateUtils';
import { SelectHotelPage } from '../pages/SelectHotelPage';
const loginTestData = readExcelDataSheet2('C:\\Users\\rsato\\OneDrive\\Desktop\\playwright-adactin-framework\\testdata\\Test Data.xlsx', 'Existing User Login', 'TC_EUL_001');
 
test.beforeEach(async ({ page }) => {
    const login = new LoginPage(page);
    await login.navigate();
    await login.login(loginTestData[0].Username, loginTestData[0].Password);
    const searchHotelPage = new SearchHotelPage(page);
    await searchHotelPage.goToSearchHotelPage();
});

test ('TC_SLH_017 - Cancel without selecting a hotel', async ({ page }) => {
   
    console.log(`Processing Test Case ID: TC_SLH_017`);
  
        const searchHotelPage = new SearchHotelPage(page);
        await searchHotelPage.goToSearchHotelPage();  
        await searchHotelPage.searchHotel('Sydney');
        await searchHotelPage.validateSuccessfulSearch();
   
        await page.locator('#cancel').click();
        await expect(page).toHaveURL(/SearchHotel/);     
  
    console.log('Completed TS_SLH_017');
    
});

test ('TC_SLH_018 - Cancel by selecting a hotel', async ({ page }) => {
   
    console.log(`Processing Test Case ID: TC_SLH_018`);
  
        const searchHotelPage = new SearchHotelPage(page);
        await searchHotelPage.goToSearchHotelPage();  
        await searchHotelPage.searchHotel('Sydney');
        await searchHotelPage.validateSuccessfulSearch();
   
        await page.locator('#radiobutton_1').check();
        await page.locator('#cancel').click();
        await expect(page).toHaveURL(/SearchHotel/);     
  
    console.log('Completed TS_SLH_018');
    
});

test ('TC_SLH_019 - Continue without selecting a hotel', async ({ page }) => {
   
    console.log(`Processing Test Case ID: TC_SLH_019`);
  
        const searchHotelPage = new SearchHotelPage(page);
        await searchHotelPage.goToSearchHotelPage();  
        await searchHotelPage.searchHotel('Sydney');
        await searchHotelPage.validateSuccessfulSearch();
   
        //await page.locator('#radiobutton_1').check();
        await page.locator('#continue').click();
        await expect(page.locator('#radiobutton_span')).toHaveText('Please Select a Hotel');  
  
    console.log('Completed TS_SLH_019');
    
});

test ('TC_SLH_020 - Continue by selecting a hotel', async ({ page }) => {
   
    console.log(`Processing Test Case ID: TC_SLH_020`);
  
        const searchHotelPage = new SearchHotelPage(page);
        await searchHotelPage.goToSearchHotelPage();  
        await searchHotelPage.searchHotel('Sydney');
        await searchHotelPage.validateSuccessfulSearch();
   
        await page.locator('#radiobutton_1').check();
        await page.locator('#continue').click();
        await expect(page).toHaveURL(/BookHotel/);
  
    console.log('Completed TS_SLH_020');
    
});

