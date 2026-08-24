///<reference types="node" />
//Import xlsx
import * as fs from 'fs';
import * as path from 'path';
// Use require to avoid missing type declarations for 'xlsx' in some environments
// @ts-ignore
const EXCEL = require('xlsx');

//Defint test data structure
interface TestData {
    TestCaseId: string;
    Username: string;
    Password: string;
    ConfirmPassword: string;
    FullName: string;
    Email: string;
  
}

// Login-specific test data structure
interface TestDataLogin {
    TestCaseId: string;
    Username: string;
    Password: string;
}

interface TestDataForgotPassword {
    TestCaseId: string;
    EmailId: string;
}

interface TestDataSearchHotel {
    TestCaseId: string;
    Location: string;
    Hotels: string;
    RoomType: string;
    NumberOfRooms: string;
    CheckInDate: string;
    CheckOutDate: string;
    AdultsPerRoom: string;
    ChildrenPerRoom: string;
}



// Create a method to read data from excel file
export function readExcelData(filePath: string, sheetName: string, testCaseId: string): TestData[] {
    
    /*if (!fs.existsSync(filePath))  {
        console.error(`Excel file not found at path: ${filePath}`);
        return [];
    }*/
    
    const excelPath = fs.readFileSync(filePath);
    console.log(`Excel file found at path: ${filePath}`);
    // Read the excel file
    const workbook = EXCEL.read(excelPath);

    // Get the specified sheet
    const sheet = workbook.Sheets[sheetName];

    // Convert the sheet data to JSON format
    const jsonData: any[] = EXCEL.utils.sheet_to_json(sheet, {header:['SL No', 'TestCaseId','Test Scenario', 'Username', 'Password', 'ConfirmPassword', 'FullName', 'Email']});

    // Filter data based on the test case ID
   // const filteredData = jsonData.filter((row: TestData) => row.TestCaseId === testCaseId);

    // Convert the json data to Test Records
    const testData : TestData[] = jsonData.slice(1).map((column: any)=>({
        TestCaseId: column.TestCaseId,
        Username: column.Username,
        Password: column.Password,
        ConfirmPassword: column.ConfirmPassword,
        FullName: column.FullName,
        Email: column.Email
    }));
  
    const data = testData.filter((row: TestData) => row.TestCaseId === testCaseId);
    console.log(`Records matching TestCaseId ${testCaseId}: ${data.length}`);
    return data;
}

export function readExcelDataSheet2(filePath: string, sheetName: string, testCaseId: string): TestDataLogin[] {
    
    /*if (!fs.existsSync(filePath))  {
        console.error(`Excel file not found at path: ${filePath}`);
        return [];
    }*/
    
    const excelPath = fs.readFileSync(filePath);
    console.log(`Excel file found at path: ${filePath}`);
    // Read the excel file
    const workbook = EXCEL.read(excelPath);

    // Get the specified sheet
    const sheet = workbook.Sheets[sheetName];

    // Convert the sheet data to JSON format
    const jsonData: any[] = EXCEL.utils.sheet_to_json(sheet, {header:['SL No', 'TestCaseId','Test Scenario', 'Username', 'Password']});

    // Filter data based on the test case ID
   // const filteredData = jsonData.filter((row: TestData) => row.TestCaseId === testCaseId);

    // Convert the json data to Test Records
    const testData : TestDataLogin[] = jsonData.slice(1).map((column: any)=>({
        TestCaseId: column.TestCaseId,
        Username: column.Username,
        Password: column.Password,

    }));
  
    const data = testData.filter((row: TestDataLogin) => row.TestCaseId === testCaseId);
    console.log(`Records matching TestCaseId ${testCaseId}: ${data.length}`);
    return data;
}

export function readExcelDataSheet3(filePath: string, sheetName: string, testCaseId: string): TestDataForgotPassword[] {
    
    /*if (!fs.existsSync(filePath))  {
        console.error(`Excel file not found at path: ${filePath}`);
        return [];
    }*/
    
    const excelPath = fs.readFileSync(filePath);
    console.log(`Excel file found at path: ${filePath}`);
    // Read the excel file
    const workbook = EXCEL.read(excelPath);

    // Get the specified sheet
    const sheet = workbook.Sheets[sheetName];

    // Convert the sheet data to JSON format
    const jsonData: any[] = EXCEL.utils.sheet_to_json(sheet, {header:['SL No', 'TestCaseId','Test Scenario', 'EmailId']});

    // Filter data based on the test case ID
   // const filteredData = jsonData.filter((row: TestData) => row.TestCaseId === testCaseId);

    // Convert the json data to Test Records
    const testData : TestDataForgotPassword[] = jsonData.slice(1).map((column: any)=>({
        TestCaseId: column.TestCaseId,
        EmailId: column.EmailId
    }));
  
    const data = testData.filter((row: TestDataForgotPassword) => row.TestCaseId === testCaseId);
    console.log(`Records matching TestCaseId ${testCaseId}: ${data.length}`);
    return data;
}

export function readExcelDataSheet4(filePath: string, sheetName: string, testCaseId: string): TestDataSearchHotel[] {
    
    /*if (!fs.existsSync(filePath))  {
        console.error(`Excel file not found at path: ${filePath}`);
        return [];
    }*/
    
    const excelPath = fs.readFileSync(filePath);
    console.log(`Excel file found at path: ${filePath}`);
    // Read the excel file
    const workbook = EXCEL.read(excelPath);

    // Get the specified sheet
    const sheet = workbook.Sheets[sheetName];

    // Convert the sheet data to JSON format
    const jsonData: any[] = EXCEL.utils.sheet_to_json(sheet, {header:['TestCaseId','Test Scenario', 'Location', 'Hotels', 'RoomType', 'NumberOfRooms', 'CheckInDate', 'CheckOutDate', 'AdultsPerRoom', 'ChildrenPerRoom']});

    // Filter data based on the test case ID
   // const filteredData = jsonData.filter((row: TestData) => row.TestCaseId === testCaseId);

    // Convert the json data to Test Records
    const testData : TestDataSearchHotel[] = jsonData.slice(1).map((column: any)=>({
        TestCaseId: column.TestCaseId,
        Location: column.Location,
        Hotels: column.Hotels,
        RoomType: column.RoomType,
        NumberOfRooms: column.NumberOfRooms,
        CheckInDate: String(column.CheckInDate),
        CheckOutDate: String(column.CheckOutDate),
        AdultsPerRoom: column.AdultsPerRoom,
        ChildrenPerRoom: column.ChildrenPerRoom
    }));
  
    const data = testData.filter((row: TestDataSearchHotel) => row.TestCaseId === testCaseId);
    console.log(`Records matching TestCaseId ${testCaseId}: ${data.length}`);
    return data;
}

export function readExcelDataSheet6(filePath: string, sheetName: string, testCaseId: string): TestDataBookHotel[] {
    
    /*if (!fs.existsSync(filePath))  {
        console.error(`Excel file not found at path: ${filePath}`);
        return [];
    }*/
    
    const excelPath = fs.readFileSync(filePath);
    console.log(`Excel file found at path: ${filePath}`);
    // Read the excel file
    const workbook = EXCEL.read(excelPath);

    // Get the specified sheet
    const sheet = workbook.Sheets[sheetName];

    // Convert the sheet data to JSON format
    const jsonData: any[] = EXCEL.utils.sheet_to_json(sheet, {header:['TestCaseId','Test Scenario', 'FirstName', 'LastName', 'BillingAddress', 'CreditCardNo', 'CreditCardType', 'ExpiryMonth', 'ExpiryYear', 'CVV']});

    // Filter data based on the test case ID
   // const filteredData = jsonData.filter((row: TestData) => row.TestCaseId === testCaseId);

    // Convert the json data to Test Records
    const testData : TestDataBookHotel[] = jsonData.slice(1).map((column: any)=>({
        TestCaseId: column.TestCaseId,
        FirstName: column.FirstName,
        LastName: column.LastName,
        BillingAddress: column.BillingAddress,
        CreditCardNo: column.CreditCardNo,
        CreditCardType: column.CreditCardType,
        ExpiryMonth: column.ExpiryMonth,
        ExpiryYear: column.ExpiryYear,
        CVV: column.CVV
    }));
  
    const data = testData.filter((row: TestDataBookHotel) => row.TestCaseId === testCaseId);
    console.log(`Records matching TestCaseId ${testCaseId}: ${data.length}`);
    return data;
}


interface TestDataBookHotel {
    TestCaseId: string;
    FirstName: string;
    LastName: string;
    BillingAddress: string;
    CreditCardNo: string;
    CreditCardType: string;
    ExpiryMonth: string | number;
    ExpiryYear: string | number;
    CVV: string | number;
}