import { test, expect } from '@playwright/test';
import { ForgotPasswordPage } from '../pages/ForgotPasswordPage';
import { readExcelDataSheet3} from 'C:\\Users\\rsato\\OneDrive\\Desktop\\playwright-adactin-framework\\utils\\ExcelHelper';
const testData = readExcelDataSheet3('C:\\Users\\rsato\\OneDrive\\Desktop\\playwright-adactin-framework\\testdata\\Test Data.xlsx', 'Forgot Password', 'TC_FPW_201');


test('TC_FPW_201', async ({ page }) => {
    test.setTimeout(50000);
    // Read test data from Excel file
const testData = readExcelDataSheet3('C:\\Users\\rsato\\OneDrive\\Desktop\\playwright-adactin-framework\\testdata\\Test Data.xlsx', 'Forgot Password', 'TC_FPW_201');
for (const data of testData) {
    console.log(data);
    console.log(`Processing Test Case ID: ${data.TestCaseId}`);

    const forgotPassword = new ForgotPasswordPage(page);

    await forgotPassword.navigate();

    await forgotPassword.clickForgotPassword();

    await forgotPassword.verifyForgotPasswordPage();

    await forgotPassword.resetPassword(data.EmailId);
    await forgotPassword.verifySuccessMessage('An email has been sent to your email address containing Username and Password. Please check your email.');

    await expect(page.getByRole('link', { name: 'Click here to login' })).toBeVisible();
    await page.getByRole('link', { name: 'Click here to login' }).click();
    await expect(page).toHaveURL('https://adactinhotelapp.com/index.php');
    await expect(page.getByRole('cell', { name: 'Existing User Login - Build 1' , exact: true  }));
}
    
console.log('Test execution completed for TC_FPW_201');
});

test('TC_FPW_202', async ({ page }) => {
    test.setTimeout(50000);
    // Read test data from Excel file
const testData = readExcelDataSheet3('C:\\Users\\rsato\\OneDrive\\Desktop\\playwright-adactin-framework\\testdata\\Test Data.xlsx', 'Forgot Password', 'TC_FPW_202');
for (const data of testData) {
    console.log(data);
    console.log(`Processing Test Case ID: ${data.TestCaseId}`);

     const forgotPassword = new ForgotPasswordPage(page);

    await forgotPassword.navigate();

    await forgotPassword.clickForgotPassword();

    await forgotPassword.verifyForgotPasswordPage();

    await forgotPassword.resetPassword(data.EmailId);
    await forgotPassword.verifyErrorMessage('Email Address does not exsit in database');
} 
    
console.log('Test execution completed for TC_FPW_202');
});

test('TC_FPW_203', async ({ page }) => {
    test.setTimeout(50000);
    // Read test data from Excel file
const testData = readExcelDataSheet3('C:\\Users\\rsato\\OneDrive\\Desktop\\playwright-adactin-framework\\testdata\\Test Data.xlsx', 'Forgot Password', 'TC_FPW_203');
for (const data of testData) {
    console.log(data);
    console.log(`Processing Test Case ID: ${data.TestCaseId}`);
     const forgotPassword = new ForgotPasswordPage(page);

    await forgotPassword.navigate();

    await forgotPassword.clickForgotPassword();

    await forgotPassword.verifyForgotPasswordPage();

    await forgotPassword.resetPassword(data.EmailId);
    await forgotPassword.verifyErrorMessage('Invalid email, Please enter correct email.');
}
    
console.log('Test execution completed for TC_FPW_203');
});

test('TC_FPW_204', async ({ page }) => {
    test.setTimeout(100000);
    // Read test data from Excel file
const testData = readExcelDataSheet3('C:\\Users\\rsato\\OneDrive\\Desktop\\playwright-adactin-framework\\testdata\\Test Data.xlsx', 'Forgot Password', 'TC_FPW_204');
for (const data of testData) {
    console.log(data);
    console.log(`Processing Test Case ID: ${data.TestCaseId}`);
     const forgotPassword = new ForgotPasswordPage(page);

    await forgotPassword.navigate();

    await forgotPassword.clickForgotPassword();

    await forgotPassword.verifyForgotPasswordPage();

    await forgotPassword.resetPassword(data.EmailId);
     await forgotPassword.verifyErrorMessage('Invalid email, Please enter correct email.');
}
    
console.log('Test execution completed for TC_FPW_204');
});

test('TC_FPW_205', async ({ page }) => {
    test.setTimeout(100000);
    // Read test data from Excel file
const testData = readExcelDataSheet3('C:\\Users\\rsato\\OneDrive\\Desktop\\playwright-adactin-framework\\testdata\\Test Data.xlsx', 'Forgot Password', 'TC_FPW_205');
for (const data of testData) {
    console.log(data);
    console.log(`Processing Test Case ID: ${data.TestCaseId}`);
    const forgotPassword = new ForgotPasswordPage(page);

    await forgotPassword.navigate();

    await forgotPassword.clickForgotPassword();

    await forgotPassword.verifyForgotPasswordPage();

    await forgotPassword.resetPassword(data.EmailId);
     await forgotPassword.verifyErrorMessage('Invalid email, Please enter correct email.');
}
    
console.log('Test execution completed for TC_FPW_205');
});
