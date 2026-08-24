
import { test, expect } from '@playwright/test';
// removed unused imports

import { LoginPage } from '../pages/LoginPage';
import { LogoutPage } from '../pages/LogoutPage';
import { SearchHotelPage } from '../pages/SearchHotelPage';
import { GenericPage } from '../pages/GenericPageFormat';

import { readExcelDataSheet4 } from 'C:\\Users\\rsato\\OneDrive\\Desktop\\playwright-adactin-framework\\utils\\ExcelHelper';
const testData = readExcelDataSheet4('C:\\Users\\rsato\\OneDrive\\Desktop\\playwright-adactin-framework\\testdata\\Test Data.xlsx', 'Search Hotel', 'TC_SRH_023');

import { readExcelDataSheet2 } from 'C:\\Users\\rsato\\OneDrive\\Desktop\\playwright-adactin-framework\\utils\\ExcelHelper';
import { DateUtils } from '../utils/DateUtils';
const loginTestData = readExcelDataSheet2('C:\\Users\\rsato\\OneDrive\\Desktop\\playwright-adactin-framework\\testdata\\Test Data.xlsx', 'Existing User Login', 'TC_EUL_001');
 
test.beforeEach(async ({ page }) => {
    const login = new LoginPage(page);
    await login.navigate();
    await login.login(loginTestData[0].Username, loginTestData[0].Password);
});

test('TC_SRH_001 to TC_SRH_022', async ({ page }) => {
    test.setTimeout(100000);
    // Read test data from Excel file
    const login = new LoginPage(page);
    const genericPage = new GenericPage(page);
    const searchHotelPage = new SearchHotelPage(page);
    console.log(`Processing Test Case ID: TC_SRH_001 to TC_SRH_022`);
      
    //TC_SRH_001
    await login.verifyLogin();  
    
    //TC_SRH_002
    await expect(page.getByText(`Hello ${loginTestData[0].Username}!`).isVisible);

    //TC_SRH_003 - TC_SRH_009
    await genericPage.validateFormHyperlinks();
    
    //TC_SRH_013 - TCT_SRH_022
    await searchHotelPage.validateFormElements();
    
    //TC_SRH_012
    await genericPage.validateframeElements();
      
    console.log('Test execution completed ');
});

test('TC_SRH_023 - Blank Location', async ({ page }) => {
   
    const searchHotelPage = new SearchHotelPage(page);
    const login = new LoginPage(page);
    await page.getByRole('button', { name: 'Search' }).click();
    await searchHotelPage.verifyErrorMessage('Please Select a Location');

    console.log('Completed TS_SRH_023')
});

test('TC_SRH_028 - Successful search', async ({ page }) => {
   
    // Read test data from Excel file
  
    const login = new LoginPage(page);
     const searchHotelPage = new SearchHotelPage(page);
    const testData_SRH = readExcelDataSheet4('C:\\Users\\rsato\\OneDrive\\Desktop\\playwright-adactin-framework\\testdata\\Test Data.xlsx', 'Search Hotel', 'TC_SRH_028');
    console.log(`Processing Test Case ID: TC_SRH_028`);
    for(const dataSRH of testData_SRH) {
            //Select Location
            await searchHotelPage.goToSearchHotelPage();  
            await searchHotelPage.searchHotel(dataSRH.Location);
            await searchHotelPage.validateSuccessfulSearch();
              
            
    }
    console.log('Completed TS_SRH_028')
});

test('TC_SRH_025 - Blank Check-In date', async ({ page }) => {
    
    // Read test data from Excel file
     const login = new LoginPage(page);
    const testData_SRH = readExcelDataSheet4('C:\\Users\\rsato\\OneDrive\\Desktop\\playwright-adactin-framework\\testdata\\Test Data.xlsx', 'Search Hotel', 'TC_SRH_025');
    const searchHotelPage = new SearchHotelPage(page);

    console.log(`Processing Test Case ID: TC_SRH_025`);
    for(const dataSRH of testData_SRH) {
            //Select Location
            await searchHotelPage.goToSearchHotelPage();  
            await searchHotelPage.searchHotel(dataSRH.Location, undefined, undefined, undefined,  '', dataSRH.CheckOutDate);
            await expect(page.locator('#checkin_span')).toContainText('Please Select Check-In Date');      
            
    }
    console.log('Completed TS_SRH_025')
});

test('TC_SRH_026 - Blank Check-Out date', async ({ page }) => {
    
    // Read test data from Excel file
     const login = new LoginPage(page);
    const testData_SRH = readExcelDataSheet4('C:\\Users\\rsato\\OneDrive\\Desktop\\playwright-adactin-framework\\testdata\\Test Data.xlsx', 'Search Hotel', 'TC_SRH_026');
    const searchHotelPage = new SearchHotelPage(page);

    console.log(`Processing Test Case ID: TC_SRH_026`);
    for(const dataSRH of testData_SRH) {
            //Select Location
            await searchHotelPage.goToSearchHotelPage();  
            await searchHotelPage.searchHotel(dataSRH.Location, undefined, undefined, undefined, dataSRH.CheckInDate, '');
            await expect(page.locator('#checkout_span')).toContainText('Please Select Check-Out Date');      
            
    }
    console.log('Completed TS_SRH_026')
});

test('TC_SRH_027 - Blank Adults per Room', async ({ page }) => {
    
    // Read test data from Excel file
     const login = new LoginPage(page);
    const testData_SRH = readExcelDataSheet4('C:\\Users\\rsato\\OneDrive\\Desktop\\playwright-adactin-framework\\testdata\\Test Data.xlsx', 'Search Hotel', 'TC_SRH_027');
    const searchHotelPage = new SearchHotelPage(page);

    console.log(`Processing Test Case ID: TC_SRH_027`);
    for(const dataSRH of testData_SRH) {
            //Select Location
            await searchHotelPage.goToSearchHotelPage();  
            await searchHotelPage.searchHotel(dataSRH.Location, undefined, undefined, undefined, undefined, undefined, '- Select Adults per Room -', undefined);
            await expect(page.locator('#adults_room_span')).toContainText('Please Select Adults per Room');      

    }
    console.log('Completed TS_SRH_027')
});

test('TC_SRH_024 - Blank Number of Rooms', async ({ page }) => {
    
    // Read test data from Excel file
     const login = new LoginPage(page);
    const testData_SRH = readExcelDataSheet4('C:\\Users\\rsato\\OneDrive\\Desktop\\playwright-adactin-framework\\testdata\\Test Data.xlsx', 'Search Hotel', 'TC_SRH_024');
    const searchHotelPage = new SearchHotelPage(page);
    
    console.log(`Processing Test Case ID: TC_SRH_024`);
    for(const dataSRH of testData_SRH) {
            //Select Location
            
            await searchHotelPage.goToSearchHotelPage();  
            await searchHotelPage.searchHotel(dataSRH.Location, undefined, undefined, '- Select Number of Rooms -', undefined, undefined,undefined, undefined);
            await expect(page.locator('#num_room_span')).toContainText('Please Select Total Number of Rooms');      

    }
    console.log('Completed TS_SRH_024')
});

test('TC_SRH_028_1 to TC_SRH_028_6 - Successful search, location and default values validation', async ({ page }) => {
   
    // Read test data from Excel file
  
    const login = new LoginPage(page);
     const searchHotelPage = new SearchHotelPage(page);
    const testData_SRH = readExcelDataSheet4('C:\\Users\\rsato\\OneDrive\\Desktop\\playwright-adactin-framework\\testdata\\Test Data.xlsx', 'Search Hotel', 'TC_SRH_028');
    console.log(`Processing Test Case ID: TC_SRH_028_1 to TC_SRH_028_6`);
    for(const dataSRH of testData_SRH) {
            //Select Location
            await searchHotelPage.goToSearchHotelPage();  
            await searchHotelPage.searchHotel(dataSRH.Location);
            await searchHotelPage.validateSuccessfulSearch();
            
            // TC_SRH_028_1 Validate that the selected location is displayed on the next page
            await expect(page.getByRole('table').nth(4).locator('td').nth(2)).toHaveText('Location');
                                 
            await expect(page.locator('input#location_1.select_text')).toHaveValue(dataSRH.Location);
            await expect(page.locator('input#location_2.select_text')).toHaveValue(dataSRH.Location);
            await expect(page.locator('input#location_3.select_text')).toHaveValue(dataSRH.Location);
            await expect(page.locator('input#location_4.select_text')).toHaveValue(dataSRH.Location);

            // TC_SRH_028_2 Validate that the 1 room (default value) is displayed on the next page
            await expect(page.getByRole('table').nth(4).locator('td').nth(3)).toHaveText('Rooms');
                                 
            await expect(page.locator('input#rooms_1.select_text')).toHaveValue('1 Rooms');
            await expect(page.locator('input#rooms_2.select_text')).toHaveValue('1 Rooms');
            await expect(page.locator('input#rooms_3.select_text')).toHaveValue('1 Rooms');
            await expect(page.locator('input#rooms_4.select_text')).toHaveValue('1 Rooms');

            // TC_SRH_028_3 Validate that the default check-in date is displayed on the next page
            await expect(page.getByRole('table').nth(4).locator('td').nth(4)).toHaveText('Arrival Date');
            
            const formattedCheckInDate = DateUtils.getToday();
            await expect(page.locator('input#arr_date_1.select_text')).toHaveValue(formattedCheckInDate);
            await expect(page.locator('input#arr_date_2.select_text')).toHaveValue(formattedCheckInDate);
            await expect(page.locator('input#arr_date_3.select_text')).toHaveValue(formattedCheckInDate);
            await expect(page.locator('input#arr_date_4.select_text')).toHaveValue(formattedCheckInDate);    

            // TC_SRH_028_4 Validate that the default check-out date is displayed on the next page
            await expect(page.getByRole('table').nth(4).locator('td').nth(5)).toHaveText('Departure Date');
            const formattedCheckOutDate = DateUtils.getTomorrow();
            await expect(page.locator('input#dep_date_1.select_text')).toHaveValue(formattedCheckOutDate);
            await expect(page.locator('input#dep_date_2.select_text')).toHaveValue(formattedCheckOutDate);
            await expect(page.locator('input#dep_date_3.select_text')).toHaveValue(formattedCheckOutDate);
            await expect(page.locator('input#dep_date_4.select_text')).toHaveValue(formattedCheckOutDate);

            // TC_SRH_028_5 Validate that the default room type is displayed on the next page
            await expect(page.getByRole('table').nth(4).locator('td').nth(7)).toHaveText('Rooms Type');
            await expect(page.locator('input#room_type_1.select_text')).toHaveValue('Standard');
            await expect(page.locator('input#room_type_2.select_text')).toHaveValue('Standard');
            await expect(page.locator('input#room_type_3.select_text')).toHaveValue('Standard');
            await expect(page.locator('input#room_type_4.select_text')).toHaveValue('Standard');

            //TC_SRH_028_6 Validate that the default number of days is displayed on the next page
            await expect(page.getByRole('table').nth(4).locator('td').nth(6)).toHaveText('No. of Days');
            await expect(page.locator('input#no_days_1.select_text')).toHaveValue('1 Days');
            await expect(page.locator('input#no_days_2.select_text')).toHaveValue('1 Days');
            await expect(page.locator('input#no_days_3.select_text')).toHaveValue('1 Days');
            await expect(page.locator('input#no_days_4.select_text')).toHaveValue('1 Days');
        }
        console.log('Completed TS_SRH_028_1 to TS_SRH_028_6');
});

test('TC_SRH_036 to TC_SRH_040 - Validate Hotel selection', async ({ page }) => {
   
    // Read test data from Excel file
  
    const login = new LoginPage(page);
     const searchHotelPage = new SearchHotelPage(page);
    const testData_SRH = readExcelDataSheet4('C:\\Users\\rsato\\OneDrive\\Desktop\\playwright-adactin-framework\\testdata\\Test Data.xlsx', 'Search Hotel', 'TC_SRH_036');
    console.log(`Processing Test Case ID: TC_SRH_036`);
    for(const dataSRH of testData_SRH) {
            //Select Location
            await searchHotelPage.goToSearchHotelPage();  
            await searchHotelPage.searchHotel(dataSRH.Location, dataSRH.Hotels);
            await searchHotelPage.validateSuccessfulSearch();

            // TC_SRH_036 Validate that the selected hotel is displayed on the next page
            console.log(`${dataSRH.Hotels}`);
            await expect(page.getByRole('table').nth(4).locator('td').nth(2)).toHaveText('Location');
                                 
            await expect(page.locator('input#location_1.select_text')).toHaveValue(dataSRH.Location);
            await expect(page.locator('input#location_2.select_text')).toHaveValue(dataSRH.Location);
            await expect(page.locator('input#location_3.select_text')).toHaveValue(dataSRH.Location);
            await expect(page.locator('input#location_4.select_text')).toHaveValue(dataSRH.Location);

            await expect(page.getByRole('table').nth(4).locator('td').nth(1)).toHaveText('Hotel Name');
            await expect(page.locator('input#hotel_name_1.select_text')).toHaveValue(dataSRH.Hotels);
            await expect(page.locator('input#hotel_name_2.select_text')).toHaveValue(dataSRH.Hotels);
            await expect(page.locator('input#hotel_name_3.select_text')).toHaveValue(dataSRH.Hotels);
            await expect(page.locator('input#hotel_name_4.select_text')).toHaveValue(dataSRH.Hotels);
    }
    console.log('Completed TS_SRH_036')
});

test('TC_SRH_040 to TC_SRH_043 - Validate Room type selection', async ({ page }) => {
   
    // Read test data from Excel file
  
    const login = new LoginPage(page);
     const searchHotelPage = new SearchHotelPage(page);
    const testData_SRH = readExcelDataSheet4('C:\\Users\\rsato\\OneDrive\\Desktop\\playwright-adactin-framework\\testdata\\Test Data.xlsx', 'Search Hotel', 'TC_SRH_040');
    console.log(`Processing Test Case ID: TC_SRH_040`);
    for(const dataSRH of testData_SRH) {
            //Select Location
            await searchHotelPage.goToSearchHotelPage();  
            await searchHotelPage.searchHotel(dataSRH.Location, dataSRH.Hotels, dataSRH.RoomType);
            await searchHotelPage.validateSuccessfulSearch();

            // TC_SRH_040 Validate that the selected room type is displayed on the next page
            console.log(`${dataSRH.RoomType}`);
            await expect(page.getByRole('table').nth(4).locator('td').nth(7)).toHaveText('Rooms Type');
            await expect(page.getByRole('table').nth(4).locator('td').nth(2)).toHaveText('Location');
            await expect(page.getByRole('table').nth(4).locator('td').nth(1)).toHaveText('Hotel Name');
           
            await expect(page.locator('input#location_0.select_text')).toHaveValue(dataSRH.Location);
            await expect(page.locator('input#hotel_name_0.select_text')).toHaveValue(dataSRH.Hotels);
            await expect(page.locator('input#room_type_0.select_text')).toHaveValue(dataSRH.RoomType);

    }
    console.log('Completed TS_SRH_040')
});

test('TC_SRH_044 to TC_SRH_052 - Validate number of rooms selection', async ({ page }) => {
   
    // Read test data from Excel file
  
    const login = new LoginPage(page);
     const searchHotelPage = new SearchHotelPage(page);
    const testData_SRH = readExcelDataSheet4('C:\\Users\\rsato\\OneDrive\\Desktop\\playwright-adactin-framework\\testdata\\Test Data.xlsx', 'Search Hotel', 'TC_SRH_044');
    console.log(`Processing Test Case ID: TC_SRH_044`);
    for(const dataSRH of testData_SRH) {
            //Select Location
            await searchHotelPage.goToSearchHotelPage();  
            await searchHotelPage.searchHotel(dataSRH.Location, dataSRH.Hotels, dataSRH.RoomType, dataSRH.NumberOfRooms);
            await searchHotelPage.validateSuccessfulSearch();

            // TC_SRH_044 Validate that the selected number of rooms is displayed on the next page
            console.log(`${dataSRH.NumberOfRooms}`);
            await expect(page.getByRole('table').nth(4).locator('td').nth(7)).toHaveText('Rooms Type');
            await expect(page.getByRole('table').nth(4).locator('td').nth(2)).toHaveText('Location');
            await expect(page.getByRole('table').nth(4).locator('td').nth(1)).toHaveText('Hotel Name');
            await expect(page.getByRole('table').nth(4).locator('td').nth(3)).toHaveText('Rooms');

            await expect(page.locator('input#location_0.select_text')).toHaveValue(dataSRH.Location);
            await expect(page.locator('input#hotel_name_0.select_text')).toHaveValue(dataSRH.Hotels);
            await expect(page.locator('input#room_type_0.select_text')).toHaveValue(dataSRH.RoomType);
            await expect(page.locator('input#rooms_0.select_text')).toHaveValue(`${dataSRH.NumberOfRooms} Rooms`);
    }
    console.log('Completed TS_SRH_044')
});

test('TC_SRH_053 - check-in date greater than check-out date', async ({ page }) => {
   
    // Read test data from Excel file
  
    const login = new LoginPage(page);
     const searchHotelPage = new SearchHotelPage(page);
    const testData_SRH = readExcelDataSheet4('C:\\Users\\rsato\\OneDrive\\Desktop\\playwright-adactin-framework\\testdata\\Test Data.xlsx', 'Search Hotel', 'TC_SRH_053');
    console.log(`Processing Test Case ID: TC_SRH_053`);
    for(const dataSRH of testData_SRH) {
            //Select Location
            await searchHotelPage.goToSearchHotelPage();  
            await searchHotelPage.searchHotel(dataSRH.Location, dataSRH.Hotels, dataSRH.RoomType, dataSRH.NumberOfRooms, dataSRH.CheckInDate, dataSRH.CheckOutDate);
           

            // TC_SRH_053 Validate that the check-in date is less than the check-out date
            console.log(`${dataSRH.CheckInDate} to ${dataSRH.CheckOutDate}`);

            await expect(page.locator('#checkin_span')).toHaveText('Check-In Date shall be before than Check-Out Date');
            await expect(page.locator('#checkout_span')).toHaveText('Check-Out Date shall be after than Check-In Date');
    }
    console.log('Completed TS_SRH_053')
});

test('TC_SRH_055 - Valid dates', async ({ page }) => {
   
    // Read test data from Excel file
  
    const login = new LoginPage(page);
     const searchHotelPage = new SearchHotelPage(page);
    const testData_SRH = readExcelDataSheet4('C:\\Users\\rsato\\OneDrive\\Desktop\\playwright-adactin-framework\\testdata\\Test Data.xlsx', 'Search Hotel', 'TC_SRH_055');
    console.log(`Processing Test Case ID: TC_SRH_055`);
    for(const dataSRH of testData_SRH) {
            //Select Location
            await searchHotelPage.goToSearchHotelPage();  
            await searchHotelPage.searchHotel(dataSRH.Location, dataSRH.Hotels, dataSRH.RoomType, dataSRH.NumberOfRooms, dataSRH.CheckInDate, dataSRH.CheckOutDate, dataSRH.AdultsPerRoom, dataSRH.ChildrenPerRoom);
           

            // TC_SRH_055 Validate that the dates are valid
            console.log(`${dataSRH.CheckInDate} to ${dataSRH.CheckOutDate}`);

            await expect(page).toHaveURL(/SelectHotel/);

    }
    console.log('Completed TS_SRH_055')
});

test('TC_SRH_065 - Validate price per night and Total price for Standard rooms', async ({ page }) => {
   
    // Read test data from Excel file
  
    const login = new LoginPage(page);
     const searchHotelPage = new SearchHotelPage(page);
    const testData_SRH = readExcelDataSheet4('C:\\Users\\rsato\\OneDrive\\Desktop\\playwright-adactin-framework\\testdata\\Test Data.xlsx', 'Search Hotel', 'TC_SRH_065');
    console.log(`Processing Test Case ID: TC_SRH_065`);
    for(const dataSRH of testData_SRH) {
            //Select Location
            await searchHotelPage.goToSearchHotelPage();  
            await searchHotelPage.searchHotel(dataSRH.Location, dataSRH.Hotels, dataSRH.RoomType, dataSRH.NumberOfRooms, dataSRH.CheckInDate, dataSRH.CheckOutDate, dataSRH.AdultsPerRoom, dataSRH.ChildrenPerRoom);
           

            // TC_SRH_065 Validate that the dates are valid
            console.log(`${dataSRH.CheckInDate} to ${dataSRH.CheckOutDate}`);

            await expect(page).toHaveURL(/SelectHotel/);

            const noOfDays = DateUtils.getDaysBetweenDates(new Date(dataSRH.CheckInDate.split('/').reverse().join('-')), new Date(dataSRH.CheckOutDate.split('/').reverse().join('-')));
            await expect(page.locator('input#no_days_1.select_text')).toHaveValue(`${noOfDays} Days`);
            await expect(page.locator('input#no_days_2.select_text')).toHaveValue(`${noOfDays} Days`);
            await expect(page.locator('input#no_days_3.select_text')).toHaveValue(`${noOfDays} Days`);
            await expect(page.locator('input#no_days_4.select_text')).toHaveValue(`${noOfDays} Days`);

            const totalPriceCornice = (noOfDays * 100 ) + 10;
            const totalPriceCreek = (noOfDays * 125 ) + 10;
            const totalPriceSunshine = (noOfDays * 175 ) + 10;
            const totalPriceHervey = (noOfDays * 150 ) + 10;

            await expect(page.locator('input#price_night_1.select_text')).toHaveValue('AUD $ 100');
            await expect(page.locator('input#price_night_2.select_text')).toHaveValue('AUD $ 125');
            await expect(page.locator('input#price_night_3.select_text')).toHaveValue('AUD $ 150');
            await expect(page.locator('input#price_night_4.select_text')).toHaveValue('AUD $ 175');
            await expect(page.locator('input#total_price_1.select_text')).toHaveValue(`AUD $ ${totalPriceCornice}`);
            await expect(page.locator('input#room_type_1.select_text')).toHaveValue('Standard');
            await expect(page.locator('input#total_price_2.select_text')).toHaveValue(`AUD $ ${totalPriceCreek}`);
            await expect(page.locator('input#room_type_2.select_text')).toHaveValue('Standard');
            await expect(page.locator('input#total_price_3.select_text')).toHaveValue(`AUD $ ${totalPriceHervey}`);
            await expect(page.locator('input#room_type_3.select_text')).toHaveValue('Standard');
            await expect(page.locator('input#total_price_4.select_text')).toHaveValue(`AUD $ ${totalPriceSunshine}`);
            await expect(page.locator('input#room_type_4.select_text')).toHaveValue('Standard');



    }
    console.log('Completed TS_SRH_065')
});

test('TC_SRH_067 - Validate price per night and Total price for Double rooms', async ({ page }) => {
   
    // Read test data from Excel file
  
    const login = new LoginPage(page);
     const searchHotelPage = new SearchHotelPage(page);
    const testData_SRH = readExcelDataSheet4('C:\\Users\\rsato\\OneDrive\\Desktop\\playwright-adactin-framework\\testdata\\Test Data.xlsx', 'Search Hotel', 'TC_SRH_067');
    console.log(`Processing Test Case ID: TC_SRH_067`);
    for(const dataSRH of testData_SRH) {
            //Select Location
            await searchHotelPage.goToSearchHotelPage();  
            await searchHotelPage.searchHotel(dataSRH.Location, dataSRH.Hotels, dataSRH.RoomType, dataSRH.NumberOfRooms, dataSRH.CheckInDate, dataSRH.CheckOutDate, dataSRH.AdultsPerRoom, dataSRH.ChildrenPerRoom);
           

            // TC_SRH_066 Validate that the dates are valid
            console.log(`${dataSRH.CheckInDate} to ${dataSRH.CheckOutDate}`);

            await expect(page).toHaveURL(/SelectHotel/);

            const noOfDays = DateUtils.getDaysBetweenDates(new Date(dataSRH.CheckInDate.split('/').reverse().join('-')), new Date(dataSRH.CheckOutDate.split('/').reverse().join('-')));
            await expect(page.locator('input#no_days_1.select_text')).toHaveValue(`${noOfDays} Days`);
            await expect(page.locator('input#no_days_2.select_text')).toHaveValue(`${noOfDays} Days`);
            await expect(page.locator('input#no_days_3.select_text')).toHaveValue(`${noOfDays} Days`);
            await expect(page.locator('input#no_days_4.select_text')).toHaveValue(`${noOfDays} Days`);

            const totalPriceCornice = (noOfDays * 200 ) + 10;
            const totalPriceCreek = (noOfDays * 225 ) + 10;
            const totalPriceSunshine = (noOfDays * 275 ) + 10;
            const totalPriceHervey = (noOfDays * 250 ) + 10;

            await expect(page.locator('input#price_night_1.select_text')).toHaveValue('AUD $ 200');
            await expect(page.locator('input#price_night_2.select_text')).toHaveValue('AUD $ 225');
            await expect(page.locator('input#price_night_3.select_text')).toHaveValue('AUD $ 250');
            await expect(page.locator('input#price_night_4.select_text')).toHaveValue('AUD $ 275');
            await expect(page.locator('input#total_price_1.select_text')).toHaveValue(`AUD $ ${totalPriceCornice}`);
            await expect(page.locator('input#room_type_1.select_text')).toHaveValue('Double');
            await expect(page.locator('input#total_price_2.select_text')).toHaveValue(`AUD $ ${totalPriceCreek}`);
            await expect(page.locator('input#room_type_2.select_text')).toHaveValue('Double');
            await expect(page.locator('input#total_price_3.select_text')).toHaveValue(`AUD $ ${totalPriceHervey}`);
            await expect(page.locator('input#room_type_3.select_text')).toHaveValue('Double');
            await expect(page.locator('input#total_price_4.select_text')).toHaveValue(`AUD $ ${totalPriceSunshine}`);
            await expect(page.locator('input#room_type_4.select_text')).toHaveValue('Double');



    }
    console.log('Completed TS_SRH_067')
});

test('TC_SRH_069 - Validate price per night and Total price for Double rooms', async ({ page }) => {
   
    // Read test data from Excel file
  
    const login = new LoginPage(page);
     const searchHotelPage = new SearchHotelPage(page);
    const testData_SRH = readExcelDataSheet4('C:\\Users\\rsato\\OneDrive\\Desktop\\playwright-adactin-framework\\testdata\\Test Data.xlsx', 'Search Hotel', 'TC_SRH_069');
    console.log(`Processing Test Case ID: TC_SRH_069`);
    for(const dataSRH of testData_SRH) {
            //Select Location
            await searchHotelPage.goToSearchHotelPage();  
            await searchHotelPage.searchHotel(dataSRH.Location, dataSRH.Hotels, dataSRH.RoomType, dataSRH.NumberOfRooms, dataSRH.CheckInDate, dataSRH.CheckOutDate, dataSRH.AdultsPerRoom, dataSRH.ChildrenPerRoom);
           

            // TC_SRH_067 Validate that the dates are valid
            console.log(`${dataSRH.CheckInDate} to ${dataSRH.CheckOutDate}`);

            await expect(page).toHaveURL(/SelectHotel/);

            const noOfDays = DateUtils.getDaysBetweenDates(new Date(dataSRH.CheckInDate.split('/').reverse().join('-')), new Date(dataSRH.CheckOutDate.split('/').reverse().join('-')));
            await expect(page.locator('input#no_days_1.select_text')).toHaveValue(`${noOfDays} Days`);
            await expect(page.locator('input#no_days_2.select_text')).toHaveValue(`${noOfDays} Days`);
            await expect(page.locator('input#no_days_3.select_text')).toHaveValue(`${noOfDays} Days`);
            await expect(page.locator('input#no_days_4.select_text')).toHaveValue(`${noOfDays} Days`);

            const totalPriceCornice = (noOfDays * 300 ) + 10;
            const totalPriceCreek = (noOfDays * 325 ) + 10;
            const totalPriceSunshine = (noOfDays * 375 ) + 10;
            const totalPriceHervey = (noOfDays * 350 ) + 10;

            await expect(page.locator('input#price_night_1.select_text')).toHaveValue('AUD $ 300');
            await expect(page.locator('input#price_night_2.select_text')).toHaveValue('AUD $ 325');
            await expect(page.locator('input#price_night_3.select_text')).toHaveValue('AUD $ 350');
            await expect(page.locator('input#price_night_4.select_text')).toHaveValue('AUD $ 375');
            await expect(page.locator('input#total_price_1.select_text')).toHaveValue(`AUD $ ${totalPriceCornice}`);
            await expect(page.locator('input#room_type_1.select_text')).toHaveValue('Deluxe');
            await expect(page.locator('input#total_price_2.select_text')).toHaveValue(`AUD $ ${totalPriceCreek}`);
            await expect(page.locator('input#room_type_2.select_text')).toHaveValue('Deluxe');
            await expect(page.locator('input#total_price_3.select_text')).toHaveValue(`AUD $ ${totalPriceHervey}`);
            await expect(page.locator('input#room_type_3.select_text')).toHaveValue('Deluxe');
            await expect(page.locator('input#total_price_4.select_text')).toHaveValue(`AUD $ ${totalPriceSunshine}`);
            await expect(page.locator('input#room_type_4.select_text')).toHaveValue('Deluxe');



    }
    console.log('Completed TS_SRH_069')
});

test('TC_SRH_071 - Validate price per night and Total price for Double rooms', async ({ page }) => {
   
    // Read test data from Excel file
  
    const login = new LoginPage(page);
     const searchHotelPage = new SearchHotelPage(page);
    const testData_SRH = readExcelDataSheet4('C:\\Users\\rsato\\OneDrive\\Desktop\\playwright-adactin-framework\\testdata\\Test Data.xlsx', 'Search Hotel', 'TC_SRH_071');
    console.log(`Processing Test Case ID: TC_SRH_071`);
    for(const dataSRH of testData_SRH) {
            //Select Location
            await searchHotelPage.goToSearchHotelPage();  
            await searchHotelPage.searchHotel(dataSRH.Location, dataSRH.Hotels, dataSRH.RoomType, dataSRH.NumberOfRooms, dataSRH.CheckInDate, dataSRH.CheckOutDate, dataSRH.AdultsPerRoom, dataSRH.ChildrenPerRoom);
           

            // TC_SRH_071 Validate that the dates are valid
            console.log(`${dataSRH.CheckInDate} to ${dataSRH.CheckOutDate}`);

            await expect(page).toHaveURL(/SelectHotel/);

            const noOfDays = DateUtils.getDaysBetweenDates(new Date(dataSRH.CheckInDate.split('/').reverse().join('-')), new Date(dataSRH.CheckOutDate.split('/').reverse().join('-')));
            await expect(page.locator('input#no_days_1.select_text')).toHaveValue(`${noOfDays} Days`);
            await expect(page.locator('input#no_days_2.select_text')).toHaveValue(`${noOfDays} Days`);
            await expect(page.locator('input#no_days_3.select_text')).toHaveValue(`${noOfDays} Days`);
            await expect(page.locator('input#no_days_4.select_text')).toHaveValue(`${noOfDays} Days`);

            const totalPriceCornice = (noOfDays * 400 ) + 10;
            const totalPriceCreek = (noOfDays * 425 ) + 10;
            const totalPriceSunshine = (noOfDays * 475 ) + 10;
            const totalPriceHervey = (noOfDays * 450 ) + 10;

            await expect(page.locator('input#price_night_1.select_text')).toHaveValue('AUD $ 400');
            await expect(page.locator('input#price_night_2.select_text')).toHaveValue('AUD $ 425');
            await expect(page.locator('input#price_night_3.select_text')).toHaveValue('AUD $ 450');
            await expect(page.locator('input#price_night_4.select_text')).toHaveValue('AUD $ 475');
            await expect(page.locator('input#total_price_1.select_text')).toHaveValue(`AUD $ ${totalPriceCornice}`);
            await expect(page.locator('input#room_type_1.select_text')).toHaveValue('Super Deluxe');
            await expect(page.locator('input#total_price_2.select_text')).toHaveValue(`AUD $ ${totalPriceCreek}`);
            await expect(page.locator('input#room_type_2.select_text')).toHaveValue('Super Deluxe');
            await expect(page.locator('input#total_price_3.select_text')).toHaveValue(`AUD $ ${totalPriceHervey}`);
            await expect(page.locator('input#room_type_3.select_text')).toHaveValue('Super Deluxe');
            await expect(page.locator('input#total_price_4.select_text')).toHaveValue(`AUD $ ${totalPriceSunshine}`);
            await expect(page.locator('input#room_type_4.select_text')).toHaveValue('Super Deluxe');



    }
    console.log('Completed TS_SRH_071')
});