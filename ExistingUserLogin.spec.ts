import { test, expect, type Page } from '@playwright/test';
// removed unused imports

import { readExcelDataSheet2 } from 'C:\\Users\\rsato\\OneDrive\\Desktop\\Project_Playwright\\src\\utils\\ExcelHelper';
const testData = readExcelDataSheet2('C:\\Users\\rsato\\OneDrive\\Desktop\\Project_Playwright\\tests\\Test Data.xlsx', 'Existing User Login', 'TC_EUL_001');

test('TC_EUL_001', async ({ page }) => {
const testData = readExcelDataSheet2('C:\\Users\\rsato\\OneDrive\\Desktop\\Project_Playwright\\tests\\Test Data.xlsx', 'Existing User Login', 'TC_EUL_001');
for (const data of testData) {
    console.log(data);
    console.log(`Processing Test Case ID: ${data.TestCaseId}`);
    // Only create tests for matching TestCaseId and ensure unique title
    // Read test data from Excel file
    //if (data.TestCaseId == 'TC_NUR_001') {
    await page.goto('http://www.adactinhotelapp.com/');    
    await page.locator('#username').click();
    await page.locator('#username').pressSequentially(data.Username, { delay: 50 });
    await page.locator('#password').click();
    await page.locator('#password').pressSequentially(data.Password, { delay: 50 });
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page.getByRole('cell', { name: 'Welcome to Adactin Group of Hotels' })).toBeVisible();
    
    //Logout and verify logout success message
    await page.getByRole('link', { name: 'Logout' }).click();    
    await page.getByText('You have successfully logged out.').waitFor({ state: 'visible', timeout: 5000 });
    const reLogin = page.getByRole('link', { name: 'Click here to login again' });
    await expect(reLogin).toHaveAttribute('href', 'index.php');
    await expect(reLogin).toBeVisible();
    await reLogin.click();
    await expect(page).toHaveURL('http://www.adactinhotelapp.com/index.php');
    await expect(page.getByRole('cell', { name: 'Existing User Login - Build 1' , exact: true  }));
    
}

console.log('Test execution completed for TC_EUL_001');
});


test('TC_EUL_002', async ({ page }) => {
const testData = readExcelDataSheet2('C:\\Users\\rsato\\OneDrive\\Desktop\\Project_Playwright\\tests\\Test Data.xlsx', 'Existing User Login', 'TC_EUL_002');       
for (const data of testData) {
    console.log(data);
    console.log(`Processing Test Case ID: ${data.TestCaseId}`);
    await page.goto('http://www.adactinhotelapp.com/');    
    await page.locator('#password').click();
    await page.locator('#password').pressSequentially(data.Password, { delay: 50 });
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page.locator('#username_span')).toContainText('Enter Username');
   
}

console.log('Test execution completed for TC_EUL_002');
});

test('TC_EUL_003', async ({ page }) => {
const testData = readExcelDataSheet2('C:\\Users\\rsato\\OneDrive\\Desktop\\Project_Playwright\\tests\\Test Data.xlsx', 'Existing User Login', 'TC_EUL_003');       
for (const data of testData) {
    console.log(data);
    console.log(`Processing Test Case ID: ${data.TestCaseId}`);
    await page.goto('http://www.adactinhotelapp.com/');    
    await page.locator('#username').click();
    await page.locator('#username').pressSequentially(data.Username, { delay: 50 });
    await page.getByRole('button', { name: 'Login' }).click();
     await expect(page.locator('#password_span')).toContainText('Enter Password');

   
}

console.log('Test execution completed for TC_EUL_003');
});

test('TC_EUL_004', async ({ page }) => {
const testData = readExcelDataSheet2('C:\\Users\\rsato\\OneDrive\\Desktop\\Project_Playwright\\tests\\Test Data.xlsx', 'Existing User Login', 'TC_EUL_004');
for (const data of testData) {
    console.log(data);
    console.log(`Processing Test Case ID: ${data.TestCaseId}`);
    // Only create tests for matching TestCaseId and ensure unique title
    // Read test data from Excel file
    //if (data.TestCaseId == 'TC_NUR_001') {
    await page.goto('http://www.adactinhotelapp.com/');    
    await page.locator('#username').click();
    await page.locator('#username').pressSequentially(data.Username, { delay: 50 });
    await page.locator('#password').click();
    await page.locator('#password').pressSequentially(data.Password, { delay: 50 });
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page.getByText('Invalid Login details or Your Password might have expired. ').waitFor({ state: 'visible', timeout: 5000 }));
    await expect(page.getByRole('link', { name: 'Click here' })).toBeVisible();
    await page.getByRole('link', { name: 'Click here' }).click();
    await expect(page).toHaveURL('http://adactinhotelapp.com/ForgotPassword.php');
}
console.log('Test execution completed for TC_EUL_004');
});