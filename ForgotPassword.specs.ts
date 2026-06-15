import { test, expect, type Page } from '@playwright/test';
// removed unused imports

import { readExcelDataSheet3 } from 'C:\\Users\\rsato\\OneDrive\\Desktop\\Project_Playwright\\src\\utils\\ExcelHelper';
const testData = readExcelDataSheet3('C:\\Users\\rsato\\OneDrive\\Desktop\\Project_Playwright\\tests\\Test Data.xlsx', 'Forgot Password', 'TC_FPW_201');

test('TC_FPW_201', async ({ page }) => {
    test.setTimeout(50000);
    // Read test data from Excel file
const testData = readExcelDataSheet3('C:\\Users\\rsato\\OneDrive\\Desktop\\Project_Playwright\\tests\\Test Data.xlsx', 'Forgot Password', 'TC_FPW_201');
for (const data of testData) {
    console.log(data);
    console.log(`Processing Test Case ID: ${data.TestCaseId}`);
    await page.goto('http://www.adactinhotelapp.com/ForgotPassword.php');
    await page.locator('#emailadd_recovery').pressSequentially(data.EmailId, { delay: 50 });
    await page.getByRole('button', { name: 'Email Password' }).click();
    await expect(page.getByText('An email has been sent to your email address containing Username and Password. Please check your email.')).toBeVisible();
    await expect(page.getByRole('link', { name: 'Click here to login' })).toBeVisible();
    await page.getByRole('link', { name: 'Click here to login' }).click();
    await expect(page).toHaveURL('http://www.adactinhotelapp.com/index.php');
    await expect(page.getByRole('cell', { name: 'Existing User Login - Build 1' , exact: true  }));
}
    
console.log('Test execution completed for TC_FPW_201');
});

test('TC_FPW_202', async ({ page }) => {
    test.setTimeout(50000);
    // Read test data from Excel file
const testData = readExcelDataSheet3('C:\\Users\\rsato\\OneDrive\\Desktop\\Project_Playwright\\tests\\Test Data.xlsx', 'Forgot Password', 'TC_FPW_202');
for (const data of testData) {
    console.log(data);
    console.log(`Processing Test Case ID: ${data.TestCaseId}`);
    await page.goto('http://www.adactinhotelapp.com/ForgotPassword.php');
    await page.locator('#emailadd_recovery').pressSequentially(data.EmailId, { delay: 50 });
    await page.getByRole('button', { name: 'Email Password' }).click();
     await expect(page.locator('#emailadd_span')).toContainText('Email Address does not exsit in database');
}
    
console.log('Test execution completed for TC_FPW_202');
});

test('TC_FPW_203', async ({ page }) => {
    test.setTimeout(50000);
    // Read test data from Excel file
const testData = readExcelDataSheet3('C:\\Users\\rsato\\OneDrive\\Desktop\\Project_Playwright\\tests\\Test Data.xlsx', 'Forgot Password', 'TC_FPW_203');
for (const data of testData) {
    console.log(data);
    console.log(`Processing Test Case ID: ${data.TestCaseId}`);
    await page.goto('http://www.adactinhotelapp.com/ForgotPassword.php');
    await page.locator('#emailadd_recovery').pressSequentially(data.EmailId, { delay: 50 });
    await page.getByRole('button', { name: 'Email Password' }).click();
     await expect(page.locator('#emailadd_span')).toContainText('Invalid email, Please enter correct email.');
}
    
console.log('Test execution completed for TC_FPW_203');
});

test('TC_FPW_204', async ({ page }) => {
    test.setTimeout(100000);
    // Read test data from Excel file
const testData = readExcelDataSheet3('C:\\Users\\rsato\\OneDrive\\Desktop\\Project_Playwright\\tests\\Test Data.xlsx', 'Forgot Password', 'TC_FPW_204');
for (const data of testData) {
    console.log(data);
    console.log(`Processing Test Case ID: ${data.TestCaseId}`);
    await page.goto('http://www.adactinhotelapp.com/ForgotPassword.php');
    await page.locator('#emailadd_recovery').pressSequentially(data.EmailId, { delay: 50 });
    await page.getByRole('button', { name: 'Email Password' }).click();
     await expect(page.locator('#emailadd_span')).toContainText('Invalid email, Please enter correct email.');
}
    
console.log('Test execution completed for TC_FPW_204');
});

test('TC_FPW_205', async ({ page }) => {
    test.setTimeout(100000);
    // Read test data from Excel file
const testData = readExcelDataSheet3('C:\\Users\\rsato\\OneDrive\\Desktop\\Project_Playwright\\tests\\Test Data.xlsx', 'Forgot Password', 'TC_FPW_205');
for (const data of testData) {
    console.log(data);
    console.log(`Processing Test Case ID: ${data.TestCaseId}`);
    await page.goto('http://www.adactinhotelapp.com/ForgotPassword.php');
    await page.locator('#emailadd_recovery').pressSequentially(data.EmailId, { delay: 50 });
    await page.getByRole('button', { name: 'Email Password' }).click();
     await expect(page.locator('#emailadd_span')).toContainText('Invalid email, Please enter correct email.');
}
    
console.log('Test execution completed for TC_FPW_205');
});
