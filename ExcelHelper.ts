///<reference types="node" />
//Import xlsx
import * as fs from 'fs';
import * as path from 'path';
import * as EXCEL from 'xlsx';

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