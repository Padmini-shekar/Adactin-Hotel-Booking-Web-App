import { test, expect, type Page } from '@playwright/test';
// removed unused imports

import { readExcelData } from 'C:\\Users\\rsato\\OneDrive\\Desktop\\Project_Playwright\\src\\utils\\ExcelHelper';
const testData = readExcelData('C:\\Users\\rsato\\OneDrive\\Desktop\\Project_Playwright\\tests\\Test Data.xlsx', 'New User Registration', 'TC_NUR_001');

test('TC_NUR_001', async ({ page }) => {
const testData = readExcelData('C:\\Users\\rsato\\OneDrive\\Desktop\\Project_Playwright\\tests\\Test Data.xlsx', 'New User Registration', 'TC_NUR_001');
for (const data of testData) {
    console.log(data);
    console.log(`Processing Test Case ID: ${data.TestCaseId}`);
    // Only create tests for matching TestCaseId and ensure unique title
    // Read test data from Excel file
    //if (data.TestCaseId == 'TC_NUR_001') {
    await page.goto('https://www.adactinhotelapp.com/Register.php');    
    await page.locator('#username').click();
    await page.locator('#username').pressSequentially(data.Username, { delay: 50 });
    await page.locator('#password').click();
    await page.locator('#password').pressSequentially(data.Password, { delay: 50 });
    await page.locator('#re_password').click();
    await page.locator('#re_password').pressSequentially(data.ConfirmPassword, { delay: 50 });
    await page.locator('#full_name').click();
    await page.locator('#full_name').pressSequentially(data.FullName, { delay: 50 });
    if (await page.locator('#full_name_span').isVisible()) {
      await expect(page.locator('#full_name_span').textContent()).not.toContain('Full Name is Empty');
    }
    await page.locator('#email_add').click();
    await page.locator('#email_add').pressSequentially(data.Email, { delay: 50 });
    await page.locator('#tnc_box').check();
    const captchaHTML = await page.locator('#captcha_span').innerHTML();
    //console.log('CAPTCHA HTML:', captchaHTML);
    const captchaValue = await page.locator('#ct-captcha').getAttribute('value');
    console.log('Captcha value found:', captchaValue);
    await page.locator('#captcha-form').fill(captchaValue || '');
    console.log('Captcha filled with:', captchaValue);
    //const captchaText = await page  .locator('#captcha_span')   .textContent();
    //console.log('CAPTCHA TEXT:', captchaText);
    await page.locator('#Submit').click();
    await expect(page.locator('#captcha_span')).not.toContainText('Captcha is Invalid');
}

console.log('Test execution completed for TC_NUR_001');
});

test('TC_NUR_002', async ({ page }) => {
const testData = readExcelData('C:\\Users\\rsato\\OneDrive\\Desktop\\Project_Playwright\\tests\\Test Data.xlsx', 'New User Registration', 'TC_NUR_002');       
for (const data of testData) {
    console.log(data);
    console.log(`Processing Test Case ID: ${data.TestCaseId}`);
    await page.goto('https://www.adactinhotelapp.com/Register.php');    
    await page.locator('#password').click();
    await page.locator('#password').pressSequentially(data.Password, { delay: 50 });
    await page.locator('#re_password').click();
    await page.locator('#re_password').pressSequentially(data.ConfirmPassword, { delay: 50 });
    await page.locator('#full_name').click();
    await page.locator('#full_name').pressSequentially(data.FullName, { delay: 50 });
    await page.locator('#email_add').click();
    await page.locator('#email_add').pressSequentially(data.Email, { delay: 50 });
    await page.locator('#tnc_box').check();
    await page.locator('#Submit').click();
    await expect(page.locator('#username_span')).toBeVisible();
    await expect(page.locator('#username_span')).toContainText('Username is Empty');
    await expect(page.locator('#captcha_span')).toBeVisible();
    await expect(page.locator('#captcha_span')).toContainText('Captcha is Empty');
}

console.log('Test execution completed for TC_NUR_002');
});

test('TC_NUR_003', async ({ page }) => {
const testData = readExcelData('C:\\Users\\rsato\\OneDrive\\Desktop\\Project_Playwright\\tests\\Test Data.xlsx', 'New User Registration', 'TC_NUR_003');       
for (const data of testData) {
    console.log(data);
    console.log(`Processing Test Case ID: ${data.TestCaseId}`);
    await page.goto('https://www.adactinhotelapp.com/Register.php');   
    await page.locator('#username').click();
    await page.locator('#username').pressSequentially(data.Username, { delay: 50 }); 
    await page.locator('#password').click();
    await page.locator('#password').pressSequentially(data.Password, { delay: 50 });
    await page.locator('#re_password').click();
    await page.locator('#re_password').pressSequentially(data.ConfirmPassword, { delay: 50 });
    await page.locator('#full_name').click();
    await page.locator('#full_name').pressSequentially(data.FullName, { delay: 50 });
    await page.locator('#email_add').click();
    await page.locator('#email_add').pressSequentially(data.Email, { delay: 50 });
    await page.locator('#tnc_box').check();
    await page.locator('#Submit').click();
    await expect(page.locator('#username_span')).toBeVisible();
    await expect(page.locator('#username_span')).toContainText('Username must contain minimum 8 characters');
    await expect(page.locator('#captcha_span')).toBeVisible();
    await expect(page.locator('#captcha_span')).toContainText('Captcha is Empty');
}

console.log('Test execution completed for TC_NUR_003');
});

test('TC_NUR_004', async ({ page }) => {
const testData = readExcelData('C:\\Users\\rsato\\OneDrive\\Desktop\\Project_Playwright\\tests\\Test Data.xlsx', 'New User Registration', 'TC_NUR_004');       
for (const data of testData) {
    console.log(data);
    console.log(`Processing Test Case ID: ${data.TestCaseId}`);
    await page.goto('https://www.adactinhotelapp.com/Register.php');   
    await page.locator('#username').click();
    await page.locator('#username').pressSequentially(data.Username, { delay: 50 }); 
    await page.locator('#password').click();
    await page.locator('#password').pressSequentially(data.Password, { delay: 50 });
    await page.locator('#re_password').click();
    await page.locator('#re_password').pressSequentially(data.ConfirmPassword, { delay: 50 });
    await page.locator('#full_name').click();
    await page.locator('#full_name').pressSequentially(data.FullName, { delay: 50 });
    await page.locator('#email_add').click();
    await page.locator('#email_add').pressSequentially(data.Email, { delay: 50 });
    await page.locator('#tnc_box').check();
    await page.locator('#Submit').click();
    try {
    
    await expect(page.locator('#username_span')).toContainText('Username must not contain special characters or spaces');
    } catch (error) {
            const errorMessage = error instanceof Error ? error.message : String(error);
            expect.soft(false, `Step failed: ${errorMessage}`).toBeTruthy(); // will fail softly
        console.error('Caught error:', errorMessage);
    console.error(`Expected error message not found for usernames with special characters or spaces for Test Case ID ${data.TestCaseId}`);
    }
    await expect(page.locator('#captcha_span')).toContainText('Captcha is Empty');
}

console.log('Test execution completed for TC_NUR_004');
});

test('TC_NUR_005', async ({ page }) => {
const testData = readExcelData('C:\\Users\\rsato\\OneDrive\\Desktop\\Project_Playwright\\tests\\Test Data.xlsx', 'New User Registration', 'TC_NUR_005');       
for (const data of testData) {
    console.log(data);
    console.log(`Processing Test Case ID: ${data.TestCaseId}`);
    await page.goto('https://www.adactinhotelapp.com/Register.php');   
    await page.locator('#username').click();
    await page.locator('#username').pressSequentially(data.Username, { delay: 50 }); 
    await page.locator('#password').click();
    await page.locator('#password').pressSequentially(data.Password, { delay: 50 });
    await page.locator('#re_password').click();
    await page.locator('#re_password').pressSequentially(data.ConfirmPassword, { delay: 50 });
    await page.locator('#full_name').click();
    await page.locator('#full_name').pressSequentially(data.FullName, { delay: 50 });
    await page.locator('#email_add').click();
    await page.locator('#email_add').pressSequentially(data.Email, { delay: 50 });
    await page.locator('#tnc_box').check();
    await page.locator('#Submit').click();
    try {
    
    await expect(page.locator('#username_span')).toContainText('Username must not contain special characters or spaces');
    } catch (error) {
            const errorMessage = error instanceof Error ? error.message : String(error);
            expect.soft(false, `Step failed: ${errorMessage}`).toBeTruthy(); // will fail softly
        console.error('Caught error:', errorMessage);
    console.error(`Expected error message not found for usernames with special characters or spaces for Test Case ID ${data.TestCaseId}`);
    }
    await expect(page.locator('#captcha_span')).toBeVisible();
    await expect(page.locator('#captcha_span')).toContainText('Captcha is Empty');
}

console.log('Test execution completed for TC_NUR_005');
});

test('TC_NUR_006', async ({ page }) => {
const testData = readExcelData('C:\\Users\\rsato\\OneDrive\\Desktop\\Project_Playwright\\tests\\Test Data.xlsx', 'New User Registration', 'TC_NUR_006');       
for (const data of testData) {
    console.log(data);
    console.log(`Processing Test Case ID: ${data.TestCaseId}`);
    await page.goto('https://www.adactinhotelapp.com/Register.php');   
    await page.locator('#username').click();
    await page.locator('#username').pressSequentially(data.Username, { delay: 50 }); 
    await page.locator('#password').click();
    await page.locator('#password').pressSequentially(data.Password, { delay: 50 });
    await page.locator('#re_password').click();
    await page.locator('#re_password').pressSequentially(data.ConfirmPassword, { delay: 50 });
    await page.locator('#full_name').click();
    await page.locator('#full_name').pressSequentially(data.FullName, { delay: 50 });
    await page.locator('#email_add').click();
    await page.locator('#email_add').pressSequentially(data.Email, { delay: 50 });
    await page.locator('#tnc_box').check();
    await page.locator('#Submit').click();
    try {
    
    await expect(page.locator('#username_span')).toContainText('Username must not contain special characters or spaces');
    } catch (error) {
            const errorMessage = error instanceof Error ? error.message : String(error);
            expect.soft(false, `Step failed: ${errorMessage}`).toBeTruthy(); // will fail softly
        console.error('Caught error:', errorMessage);
    console.error(`Expected error message not found for usernames with special characters or spaces for Test Case ID ${data.TestCaseId}`);
    }
    await expect(page.locator('#captcha_span')).toBeVisible();
    await expect(page.locator('#captcha_span')).toContainText('Captcha is Empty');
}

console.log('Test execution completed for TC_NUR_006');
});

test('TC_NUR_007', async ({ page }) => {
const testData = readExcelData('C:\\Users\\rsato\\OneDrive\\Desktop\\Project_Playwright\\tests\\Test Data.xlsx', 'New User Registration', 'TC_NUR_007');       
for (const data of testData) {
    console.log(data);
    console.log(`Processing Test Case ID: ${data.TestCaseId}`);
    await page.goto('https://www.adactinhotelapp.com/Register.php');   
    await page.locator('#username').click();
    await page.locator('#username').pressSequentially(data.Username, { delay: 50 }); 
    await page.locator('#password').click();
    await page.locator('#password').pressSequentially(data.Password, { delay: 50 });
    await page.locator('#re_password').click();
    await page.locator('#re_password').pressSequentially(data.ConfirmPassword, { delay: 50 });
    await page.locator('#full_name').click();
    await page.locator('#full_name').pressSequentially(data.FullName, { delay: 50 });
    await page.locator('#email_add').click();
    await page.locator('#email_add').pressSequentially(data.Email, { delay: 50 });
    await page.locator('#tnc_box').check();
    await page.locator('#Submit').click();
    try {
    
    await expect(page.locator('#username_span')).toContainText('Username must not contain special characters or spaces');
    } catch (error) {
            const errorMessage = error instanceof Error ? error.message : String(error);
            expect.soft(false, `Step failed: ${errorMessage}`).toBeTruthy(); // will fail softly
        console.error('Caught error:', errorMessage);
    console.error(`Expected error message not found for usernames with special characters or spaces for Test Case ID ${data.TestCaseId}`);
    }
    await expect(page.locator('#captcha_span')).toBeVisible();
    await expect(page.locator('#captcha_span')).toContainText('Captcha is Empty');
}

console.log('Test execution completed for TC_NUR_007');
});

test('TC_NUR_008', async ({ page }) => {
const testData = readExcelData('C:\\Users\\rsato\\OneDrive\\Desktop\\Project_Playwright\\tests\\Test Data.xlsx', 'New User Registration', 'TC_NUR_008');       
for (const data of testData) {
    console.log(data);
    console.log(`Processing Test Case ID: ${data.TestCaseId}`);
    await page.goto('https://www.adactinhotelapp.com/Register.php');   
    await page.locator('#username').click();
    await page.locator('#username').pressSequentially(data.Username, { delay: 50 }); 
    await page.locator('#password').click();
    await page.locator('#password').pressSequentially(data.Password, { delay: 50 });
    await page.locator('#re_password').click();
    await page.locator('#re_password').pressSequentially(data.ConfirmPassword, { delay: 50 });
    await page.locator('#full_name').click();
    await page.locator('#full_name').pressSequentially(data.FullName, { delay: 50 });
    await page.locator('#email_add').click();
    await page.locator('#email_add').pressSequentially(data.Email, { delay: 50 });
    await page.locator('#tnc_box').check();
    await page.locator('#Submit').click();
    //try {
    
    await expect(page.locator('#username_span')).toContainText('This username is alredy available');
    await expect(page.locator('#email_add_span')).toContainText('Email address is already in use');
    }/* catch (error) {
            const errorMessage = error instanceof Error ? error.message : String(error);
            expect.soft(false, `Step failed: ${errorMessage}`).toBeTruthy(); // will fail softly
        console.error('Caught error:', errorMessage);
    console.error(`Expected error message not found for usernames with special characters or spaces for Test Case ID ${data.TestCaseId}`);
    }*/
    await expect(page.locator('#captcha_span')).toBeVisible();
    await expect(page.locator('#captcha_span')).toContainText('Captcha is Empty');
//}

console.log('Test execution completed for TC_NUR_008');
});

