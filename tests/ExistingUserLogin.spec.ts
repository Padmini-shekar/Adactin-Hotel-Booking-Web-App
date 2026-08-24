import { test, expect } from '@playwright/test';
// removed unused imports

import { LoginPage } from '../pages/LoginPage';
import { LogoutPage } from '../pages/LogoutPage';
//import { SearchHotelPage } from '../pages/SearchHotelPage';

import { readExcelDataSheet2 } from 'C:\\Users\\rsato\\OneDrive\\Desktop\\playwright-adactin-framework\\utils\\ExcelHelper';
const testData = readExcelDataSheet2('C:\\Users\\rsato\\OneDrive\\Desktop\\playwright-adactin-framework\\testdata\\Test Data.xlsx', 'Existing User Login', 'TC_EUL_001');

test('TC_EUL_001', async ({ page }) => {
const testData = readExcelDataSheet2('C:\\Users\\rsato\\OneDrive\\Desktop\\playwright-adactin-framework\\testdata\\Test Data.xlsx', 'Existing User Login', 'TC_EUL_001');
for (const data of testData) {
    console.log(data);
    console.log(`Processing Test Case ID: ${data.TestCaseId}`);
    const login = new LoginPage(page);
    const logout = new LogoutPage(page);
    
    
    await login.navigate();

    await login.login(data.Username,data.Password);
    
    await login.verifyLogin();

    await logout.logout();
}

console.log('Test execution completed for TC_EUL_001');
});


test('TC_EUL_002', async ({ page }) => {
const testData = readExcelDataSheet2('C:\\Users\\rsato\\OneDrive\\Desktop\\playwright-adactin-framework\\testdata\\Test Data.xlsx', 'Existing User Login', 'TC_EUL_002');
for (const data of testData) {
    console.log(data);
    console.log(`Processing Test Case ID: ${data.TestCaseId}`);
    const login = new LoginPage(page);
    const logout = new LogoutPage(page);
        
    await login.navigate();

    await login.login(data.Username,data.Password);
    await expect(page.locator('#username_span')).toContainText('Enter Username');
   
}

console.log('Test execution completed for TC_EUL_002');
});

test('TC_EUL_003', async ({ page }) => {
const testData = readExcelDataSheet2('C:\\Users\\rsato\\OneDrive\\Desktop\\playwright-adactin-framework\\testdata\\Test Data.xlsx', 'Existing User Login', 'TC_EUL_003');
for (const data of testData) {
    console.log(data);
    console.log(`Processing Test Case ID: ${data.TestCaseId}`);
    const login = new LoginPage(page);
    const logout = new LogoutPage(page);
        
    await login.navigate();

    await login.login(data.Username,data.Password);
   await expect(page.locator('#password_span')).toContainText('Enter Password');
   
}

console.log('Test execution completed for TC_EUL_003');
});

test('TC_EUL_004', async ({ page }) => {
const testData = readExcelDataSheet2('C:\\Users\\rsato\\OneDrive\\Desktop\\playwright-adactin-framework\\testdata\\Test Data.xlsx', 'Existing User Login', 'TC_EUL_004');
for (const data of testData) {
    console.log(data);
    console.log(`Processing Test Case ID: ${data.TestCaseId}`);
    const login = new LoginPage(page);
    const logout = new LogoutPage(page);
        
    await login.navigate();

    await login.login(data.Username,data.Password);
    await expect(page.getByText('Invalid Login details or Your Password might have expired. ').waitFor({ state: 'visible', timeout: 5000 }));
    await expect(page.getByRole('link', { name: 'Click here' })).toBeVisible();
    await page.getByRole('link', { name: 'Click here' }).click();
    await expect(page).toHaveURL('http://adactinhotelapp.com/ForgotPassword.php');
   
}

console.log('Test execution completed for TC_EUL_004');
});
