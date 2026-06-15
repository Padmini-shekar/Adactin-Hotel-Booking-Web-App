import { test, expect, type Page } from '@playwright/test';
// removed unused imports

import { readExcelDataSheet4 } from 'C:\\Users\\rsato\\OneDrive\\Desktop\\Project_Playwright\\src\\utils\\ExcelHelper';
const testData = readExcelDataSheet4('C:\\Users\\rsato\\OneDrive\\Desktop\\Project_Playwright\\tests\\Test Data.xlsx', 'Search Hotel', 'TC_SRH_023');

import { readExcelDataSheet2 } from 'C:\\Users\\rsato\\OneDrive\\Desktop\\Project_Playwright\\src\\utils\\ExcelHelper';
const loginTestData = readExcelDataSheet2('C:\\Users\\rsato\\OneDrive\\Desktop\\Project_Playwright\\tests\\Test Data.xlsx', 'Existing User Login', 'TC_EUL_001');

async function loginUser(page: Page, username: string, password: string){
    await page.goto('http://www.adactinhotelapp.com/');
    await page.locator('#username').click();
    await page.locator('#username').pressSequentially(username, { delay: 50 });
    await page.locator('#password').click();
    await page.locator('#password').pressSequentially(password, { delay: 50 });
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page.url()).toBe('http://www.adactinhotelapp.com/SearchHotel.php');
    await expect(page.getByRole('cell', { name: 'Welcome to Adactin Group of Hotels' })).toBeVisible();
    return page
}

function getDaysBetweenDates(date1: Date, date2: Date): number {
    // 1 day = 24 hours * 60 minutes * 60 seconds * 1000 milliseconds
    const oneDayInMs = 24 * 60 * 60 * 1000; 
    
    // Get absolute difference in milliseconds to prevent negative values
    const differenceInMs = Math.abs(date2.getTime() - date1.getTime()); 
    
    // Round down to get full completed days
    return Math.floor(differenceInMs / oneDayInMs); 
}

function convertDateFormat(dateStr: string): string {
    // Split "25/12/2026" into ["25", "12", "2026"]
    const [day, month, year] = dateStr.split('/');
    
    // Reassemble into "2026-12-25"
    return `${year}-${month}-${day}`;
}

test.beforeEach(async ({ page }) => {
  await page.getByRole('cell', { name: 'Existing User Login - Build 1', exact: true}) ;
  const testData = readExcelDataSheet2('C:\\Users\\rsato\\OneDrive\\Desktop\\Project_Playwright\\tests\\Test Data.xlsx', 'Existing User Login', 'TC_EUL_001');
  page = await loginUser(page, testData[0].Username, testData[0].Password);
 
});
/*
test('TC_SRH_001 to TC_SRH_022', async ({ page }) => {
    test.setTimeout(100000);
    // Read test data from Excel file
    const testData = readExcelDataSheet2('C:\\Users\\rsato\\OneDrive\\Desktop\\Project_Playwright\\tests\\Test Data.xlsx', 'Existing User Login', 'TC_EUL_001');
    console.log(`Processing Test Case ID: TC_SRH_001 to TC_SRH_022`);
       
    //TC_SRH_001
    await expect(page.getByRole('cell', { name: 'Welcome to Adactin Group of Hotels' })).toBeVisible();
    //TC_SRH_002
    await expect(page.getByText(`Hello ${testData[0].Username}!`).isVisible);
    //TC_SRH_003
    await expect(page.getByRole('link', { name: 'Search Hotel'})).toBeVisible();
    await expect(page.getByRole('link', { name: 'Search Hotel'})).toHaveAttribute('href', 'SearchHotel.php');
    await expect(page.getByRole('link', { name: 'Search Hotel'})).toBeEnabled();
    await expect(page.getByRole('link', { name: 'Booked Itinerary'})).toBeVisible();
    await expect(page.getByRole('link', { name: 'Booked Itinerary'})).toHaveAttribute('href', 'BookedItinerary.php');
    await expect(page.getByRole('link', { name: 'Booked Itinerary'})).toBeEnabled();
    await expect(page.getByRole('link', { name: 'Change Password' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Change Password' })).toHaveAttribute('href', 'ChangePassword.php');
    await expect(page.getByRole('link', { name: 'Change Password' })).toBeEnabled();
    await expect(page.getByRole('link', { name: 'Logout' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Logout' })).toHaveAttribute('href', 'Logout.php');
    await expect(page.getByRole('link', { name: 'Logout' })).toBeEnabled();

    //TC_SRH_005
    await page.getByRole('link', { name: 'Search Hotel' }).click(); 
    await expect(page).toHaveURL('http://www.adactinhotelapp.com/SearchHotel.php');
    
    //TC_SRH_007
    await page.getByRole('link', { name: 'Booked Itinerary' }).click(); 
    await expect(page).toHaveURL('http://www.adactinhotelapp.com/BookedItinerary.php');

    //TC_SRH_009
    await page.getByRole('link', { name: 'Search Hotel' }).click(); 
    await expect(page).toHaveURL('http://www.adactinhotelapp.com/SearchHotel.php');
    await page.getByRole('link', { name: 'Change Password' }).click(); 
    await expect(page).toHaveURL('http://www.adactinhotelapp.com/ChangePassword.php');
    await page.getByRole('link', { name: 'Search Hotel' }).click(); 
    await expect(page).toHaveURL('http://www.adactinhotelapp.com/SearchHotel.php');

    //TC_SRH_013
    await expect(page.locator('td:has-text("Search Hotel")').isVisible).toBeTruthy();

    //TC_SRH_014 Verify that the Location combo box is visible and enabled. Verify that the combo box contains the expected list of locations.
    await expect(page.getByLabel('Location').isVisible()).toBeTruthy();
    const locationOptions = page.getByLabel('Location').locator('option');
    const expectedLocations = ['- Select Location -', 'Sydney', 'Melbourne', 'Brisbane', 'Adelaide', 'London', 'New York', 'Los Angeles', 'Paris'];
    await expect(page.locator('#location').isChecked).toBeTruthy();

    //TC_SRH_015 Verify that the Hotels combo box is visible and enabled. Verify that the combo box contains the expected list of hotels based on the selected location.
    await expect(page.getByLabel('Hotels').isVisible()).toBeTruthy();
    const hotelsOptions = page.getByLabel('Hotels').locator('option');
    const expectedHotels = ['- Select Hotel -', 'Hotel Creek', 'Hotel Sunshine', 'Hotel Hervey', 'Hotel Cornice'];
    await expect(page.locator('#hotels').isChecked).toBeTruthy();

    //TC_SRH_016 Verify that the Room Type combo box is visible and enabled. Verify that the combo box contains the expected list of room types based on the selected hotel.
    await expect(page.getByLabel('Room Type').isVisible()).toBeTruthy();
    const roomTypeOptions = page.getByLabel('Room Type').locator('option');
    const expectedRoomTypes = ['- Select Room Type -', 'Standard', 'Double','Deluxe', 'Super Deluxe'];
    await expect(page.locator('#room_type').isChecked).toBeTruthy();

    //TC_SRH_017 Verify that the Number of Rooms combo box is visible and enabled. Verify that the combo box contains the expected list of options (1, 2, 3, 4, 5, 6, 7, 8, 9, 10).
    await expect(page.getByLabel('Number of Rooms').isVisible()).toBeTruthy();
    const numberOfRoomsOptions = page.getByLabel('Number of Rooms').locator('option');
    const expectedNumberOfRooms = ['- Select Number of Rooms -', '1 - One', '2 - Two', '3 - Three', '4 - Four', '5 - Five', '6 - Six', '7 - Seven', '8 - Eight', '9 - Nine', '10 - Ten'];
    await expect(page.locator('#room_nos').isChecked).toBeTruthy();

    //TC_SRH_018 Verify that the Check-In Date field is visible and enabled. Verify that the field accepts valid date input and displays the correct date format.
    await expect(page.getByLabel('Check-In Date').isVisible()).toBeTruthy();
    const today = new Date();

    //Format to DD/MM/YYYY using Intl
    const formatter = new Intl.DateTimeFormat('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  
    const formattedCheckInDate = formatter.format(today);
    const inValue = await page.locator('#datepick_in.date_pick').getAttribute('value');
    await expect(page.locator('#datepick_in.date_pick')).toHaveValue(formattedCheckInDate);

     //TC_SRH_019 Verify that the Check-Out Date field is visible and enabled. Verify that the field has default value.
    await expect(page.getByLabel('Check-Out Date').isVisible()).toBeTruthy();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    const formattedCheckOutDate = formatter.format(tomorrow);
    const outValue = await page.locator('#datepick_out.date_pick').getAttribute('value');
    await expect(page.locator('#datepick_out.date_pick')).toHaveValue(formattedCheckOutDate);

   //TC_SRH_020 Verify Adults per Room combo box is visible and enabled. Verify that the combo box contains the expected list of options (1, 2, 3, 4).
   await expect(page.getByLabel('Adults per Room').isVisible()).toBeTruthy();
    const adultsPerRoomsOptions = page.getByLabel('Adults per Room').locator('option');
    const expectedAdults = ['- Select Adults per Room -', '1 - One', '2 - Two', '3 - Three', '4 - Four'];
    await expect(page.locator('#adult_room.search_combobox option:checked')).toHaveText('1 - One');
    

    //TC_SRH_021 Verify Children per Room combo box is visible and enabled. Verify that the combo box contains the expected list of options (0, 1, 2, 3, 4).
     await expect(page.getByLabel('Children per Room').isVisible()).toBeTruthy();
    const childrenPerRoomsOptions = page.getByLabel('Children per Room').locator('option');
    const expectedChildren = ['0 - None', '1 - One', '2 - Two', '3 - Three', '4 - Four'];
    await expect(page.locator('#child_room.search_combobox option:checked')).toHaveText('0 - None');

    //TC_SRH_022 Verify Submit and Reset buttons are enabled
    await expect(page.locator('#Submit').isEnabled()).toBeTruthy();
    await expect(page.locator('#Reset').isEnabled()).toBeTruthy();
    //TC_SRH_012

    const row4 = page.locator('table tr').nth(3);
    const row5 = page.locator('table tr').nth(4);
    const row6 = page.locator('table tr').nth(5);
    const row7 = page.locator('table tr').nth(6);
    const row8 = page.locator('table tr').nth(7);
    const row9 = page.locator('table tr').nth(8);
    const link4 = row4.locator('a');
    const link5 = row5.locator('a');
    const link6 = row6.locator('a');
    const link7 = row7.locator('a');
    const link8 = row8.locator('a');
    const link9 = row9.locator('a');
    
    
    await expect(row4.getByRole('heading', { name: 'Adactin Hotel Mobile App', level: 4 }).isVisible).toBeTruthy();
    await expect(link4.getByRole('link', { name: 'DOWNLOAD' }));
    await expect(link4.getByRole('caption', {name: 'DOWNLOAD the Hotel Mobile App and extend your experience. Click to know more about how to get the app on Android or IOS.'}));
    await expect(link4).toHaveAttribute('href', 'https://adactinhotelapp.com/resources/AdactinHotelApp_SetupGuide.pdf');
    

   
    await expect(row5.getByRole('heading', { name: 'HotelApp Web Services', level: 4 }).isVisible()).toBeTruthy();
    await expect(link5.getByRole('caption', {name: 'Access Hotel App SOAP and Rest Services to learn web services testing. Click to know more.'}));
    await expect(link5.getByRole('link', { name: 'Click' }));
    await expect(link5).toHaveAttribute('href', 'https://adactinhotelapp.com/HotelAdactinWebServices/');

    await expect(row6.getByRole('heading', { name: 'Sample TestCases', level: 4 }).isVisible()).toBeTruthy();
    await expect(link6.getByRole('caption', {name: 'DOWNLOAD a complete set of readymade sample TEST CASES for this application. Enjoy automation!'}));
    await expect(link6.getByRole('link', { name: 'TEST CASES' }));
    await expect(link6).toHaveAttribute('href', 'http://adactinhotelapp.com/resources/Sample-TestCases_HotelApplication.pdf');

    
    await expect(row7.getByRole('heading', { name: 'Known Defects', level: 4 }).isVisible()).toBeTruthy();
    await expect(link7.getByRole('caption', {name: 'DOWNLOAD list of known defects for this application.'}));
    await expect(link7.getByRole('link', { name: 'DOWNLOAD' }).isVisible());
    await expect(link7).toHaveAttribute('href', 'http://adactinhotelapp.com/resources/KnownDefects_HotelApp.pdf');

    await expect(row8.getByRole('heading', { name: 'Book on Automation', level: 4 }).isVisible()).toBeTruthy();


    await expect(row9.getByRole('heading', { name: 'About Adactin', level: 4 }).isVisible()).toBeTruthy();
    await expect(link9.getByRole('caption', {name: 'Get solutions for all your testing needs. Visit www.adactin.com today!'}));
    await expect(link9.getByRole('link', { name: 'www.adactin.com' }).isVisible);
    await expect(link9).toHaveAttribute('href', 'http://www.adactin.com');
    

    //TC_SRH_011
    await page.getByRole('link', { name: 'Search Hotel' }).click(); 
    await expect(page).toHaveURL('http://www.adactinhotelapp.com/SearchHotel.php');
    await page.getByRole('link', { name: 'Logout' }).click(); 
    await expect(page.url()).toBe('http://www.adactinhotelapp.com/Logout.php');
      
    console.log('Test execution completed ');
});

test('TC_SRH_023', async ({ page }) => {
    test.setTimeout(100000);

    await page.getByRole('button', { name: 'Search' }).click();
    await expect(page.locator('#location_span')).toContainText('Please Select a Location');

    console.log('Completed TS_SRH_023')
});

test('TC_SRH_024', async ({ page }) => {
    test.setTimeout(100000);
    // Read test data from Excel file
    
    const testData_SRH = readExcelDataSheet4('C:\\Users\\rsato\\OneDrive\\Desktop\\Project_Playwright\\tests\\Test Data.xlsx', 'Search Hotel', 'TC_SRH_024');
    console.log(`Processing Test Case ID: TC_SRH_024`);
    for(const dataSRH of testData_SRH) {
            //Select Location
            const dropdown = page.locator('select#location.search_combobox')
            await dropdown.selectOption({label: dataSRH.Location});
            //Click Search button
            await page.getByRole('button', { name: 'Search' }).click();
            await expect(page).toHaveURL('http://www.adactinhotelapp.com/SelectHotel.php');
  
    }
    console.log('Completed TS_SRH_024')
});

test('TC_SRH_025', async ({ page }) => {
    test.setTimeout(100000);
    // Read test data from Excel file
    const testData_SRH = readExcelDataSheet4('C:\\Users\\rsato\\OneDrive\\Desktop\\Project_Playwright\\tests\\Test Data.xlsx', 'Search Hotel', 'TC_SRH_025');
   
    console.log(`Processing Test Case ID: TC_SRH_025`);
    for(const dataSRH of testData_SRH) {
        //Select Location
        const dropdown = page.locator('select#location.search_combobox')
        await dropdown.selectOption({label: dataSRH.Location});
        const textbox = page.getByRole('textbox', {name: 'datepick_in'});
        textbox.clear();
        //Click Search button
        await page.getByRole('button', { name: 'Search' }).click();
        await expect(page.locator('#checkin_span')).toContainText('Please Select Check-In Date');       
    }
    console.log('Completed TS_SRH_025')
});


test('TC_SRH_026', async ({ page }) => {
    test.setTimeout(200000);
    // Read test data from Excel file
    const testData_SRH = readExcelDataSheet4('C:\\Users\\rsato\\OneDrive\\Desktop\\Project_Playwright\\tests\\Test Data.xlsx', 'Search Hotel', 'TC_SRH_026');

    console.log(`Processing Test Case ID: TC_SRH_026`);
    
    for(const dataSRH of testData_SRH) {
        //Select Location
        const dropdown = page.locator('select#location.search_combobox')
        await dropdown.selectOption({label: dataSRH.Location});
        await page.locator('input#datepick_in.date_pick').fill(dataSRH.CheckInDate);
        await page.locator('input#datepick_out.date_pick').fill('');
            
        //Click Search button
        await page.getByRole('button', { name: 'Search' }).click();
        await expect(page.locator('#checkout_span')).toContainText('Please Select Check-Out Date');
    }
    console.log('Completed TS_SRH_026')
}); 

test('TC_SRH_027', async ({ page }) => {
    test.setTimeout(200000);
    // Read test data from Excel file
    const testData_SRH = readExcelDataSheet4('C:\\Users\\rsato\\OneDrive\\Desktop\\Project_Playwright\\tests\\Test Data.xlsx', 'Search Hotel', 'TC_SRH_027');

        console.log(`Processing Test Case ID: TC_SRH_027`);
        
        for(const dataSRH of testData_SRH) {
            //Select Location
            console.log(dataSRH.Location);
            const dropdown = page.locator('select#location.search_combobox');
            await dropdown.selectOption(dataSRH.Location);

            await page.locator('select#adult_room.search_combobox').selectOption('- Select Adults per Room -')
           
                    
            //Click Search button
            await page.getByRole('button', { name: 'Search' }).click();
            await expect(page.locator('#adults_room_span')).toContainText('Please Select Adults per Room');
        }  

    
    console.log('Completed TS_SRH_027')
});   

test('TC_SRH_028', async ({ page }) => {
    test.setTimeout(200000);
    const testData_SRH = readExcelDataSheet4('C:\\Users\\rsato\\OneDrive\\Desktop\\Project_Playwright\\tests\\Test Data.xlsx', 'Search Hotel', 'TC_SRH_028');
        console.log(`Processing Test Case ID: TC_SRH_028`);
          for(const dataSRH of testData_SRH) {
            //Select Location
             const dropdown = page.locator('select#location.search_combobox');
            await dropdown.selectOption({value: dataSRH.Location});
            //Click Search button
            await page.getByRole('button', { name: 'Search' }).click();
            await expect(page).toHaveURL('http://www.adactinhotelapp.com/SelectHotel.php');

            //Test TC_SRH_028_1
            
            await expect(page.getByRole('table').nth(4).locator('td').nth(2)).toHaveText('Location');
                                 
            await expect(page.locator('input#location_1.select_text')).toHaveValue(dataSRH.Location);
            await expect(page.locator('input#location_2.select_text')).toHaveValue(dataSRH.Location);
            await expect(page.locator('input#location_3.select_text')).toHaveValue(dataSRH.Location);
            await expect(page.locator('input#location_4.select_text')).toHaveValue(dataSRH.Location);

            //Test TC_SRH_028_2

            await expect(page.getByRole('table').nth(4).locator('td').nth(3)).toHaveText('Rooms');
                                 
            await expect(page.locator('input#rooms_1.select_text')).toHaveValue('1 Rooms');
            await expect(page.locator('input#rooms_2.select_text')).toHaveValue('1 Rooms');
            await expect(page.locator('input#rooms_3.select_text')).toHaveValue('1 Rooms');
            await expect(page.locator('input#rooms_4.select_text')).toHaveValue('1 Rooms');

            //Test TC_SRH_028_3
            const today = new Date();

            //Format to DD/MM/YYYY using Intl
            const formatter = new Intl.DateTimeFormat('en-GB', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
            });
            
            const tomorrow = new Date(today);
            tomorrow.setDate(today.getDate() + 1);
            const formattedCheckInDate = formatter.format(today);
            const formattedCheckOutDate = formatter.format(tomorrow);

            await expect(page.getByRole('table').nth(4).locator('td').nth(4)).toHaveText('Arrival Date');
            await expect(page.locator('input#arr_date_1.select_text')).toHaveValue(formattedCheckInDate);
            await expect(page.locator('input#arr_date_2.select_text')).toHaveValue(formattedCheckInDate);
            await expect(page.locator('input#arr_date_3.select_text')).toHaveValue(formattedCheckInDate);
            await expect(page.locator('input#arr_date_4.select_text')).toHaveValue(formattedCheckInDate);

            await expect(page.getByRole('table').nth(4).locator('td').nth(5)).toHaveText('Departure Date');
            await expect(page.locator('input#dep_date_1.select_text')).toHaveValue(formattedCheckOutDate);
            await expect(page.locator('input#dep_date_2.select_text')).toHaveValue(formattedCheckOutDate);
            await expect(page.locator('input#dep_date_3.select_text')).toHaveValue(formattedCheckOutDate);
            await expect(page.locator('input#dep_date_4.select_text')).toHaveValue(formattedCheckOutDate);

            await expect(page.getByRole('table').nth(4).locator('td').nth(7)).toHaveText('Rooms Type');
            await expect(page.locator('input#room_type_1.select_text')).toHaveValue('Standard');
            await expect(page.locator('input#room_type_2.select_text')).toHaveValue('Standard');
            await expect(page.locator('input#room_type_3.select_text')).toHaveValue('Standard');
            await expect(page.locator('input#room_type_4.select_text')).toHaveValue('Standard');

            await expect(page.getByRole('table').nth(4).locator('td').nth(6)).toHaveText('No. of Days');
            await expect(page.locator('input#no_days_1.select_text')).toHaveValue('1 Days');
            await expect(page.locator('input#no_days_2.select_text')).toHaveValue('1 Days');
            await expect(page.locator('input#no_days_3.select_text')).toHaveValue('1 Days');
            await expect(page.locator('input#no_days_4.select_text')).toHaveValue('1 Days');
        
            await page.getByRole('link', { name: 'Search Hotel'}).click(); 
            await expect(page).toHaveURL('http://www.adactinhotelapp.com/SearchHotel.php'); 
        }    
    console.log('Completed TS_SRH_028')
}) ;

test('TC_SRH_029', async ({ page }) => {
    test.setTimeout(200000);
    const testData_SRH = readExcelDataSheet4('C:\\Users\\rsato\\OneDrive\\Desktop\\Project_Playwright\\tests\\Test Data.xlsx', 'Search Hotel', 'TC_SRH_029');
        console.log(`Processing Test Case ID: TC_SRH_029`);
          for(const dataSRH of testData_SRH) {
            //Select Location
            console.log(dataSRH);
             const dropdown = page.locator('select#location.search_combobox');
            await dropdown.selectOption({value: dataSRH.Location});

            
            await page.getByRole('button', { name: 'Search' }).click();
            await expect(page).toHaveURL('http://www.adactinhotelapp.com/SelectHotel.php');

            await expect(page.getByRole('table').nth(4).locator('td').nth(2)).toHaveText('Location');
                                 
             await expect(page.locator('input#location_1.select_text')).toHaveValue(dataSRH.Location);
            await expect(page.locator('input#location_2.select_text')).toHaveValue(dataSRH.Location);
            await expect(page.locator('input#location_3.select_text')).toHaveValue(dataSRH.Location);
            await expect(page.locator('input#location_4.select_text')).toHaveValue(dataSRH.Location);


            await page.getByRole('link', { name: 'Search Hotel'}).click(); 
            await expect(page).toHaveURL('http://www.adactinhotelapp.com/SearchHotel.php'); 

         }
           console.log('Completed TS_SRH_029');
});  

test('TC_SRH_036', async ({ page }) => {
    test.setTimeout(200000);
    const testData_SRH = readExcelDataSheet4('C:\\Users\\rsato\\OneDrive\\Desktop\\Project_Playwright\\tests\\Test Data.xlsx', 'Search Hotel', 'TC_SRH_036');
        console.log(`Processing Test Case ID: TC_SRH_036`);
          for(const dataSRH of testData_SRH) {
            //Select Location
            console.log(dataSRH);
             const dropdown = page.locator('select#location.search_combobox');
            await dropdown.selectOption({value: dataSRH.Location});
            //Select Hotel Name
            await page.locator('select#hotels.search_combobox').selectOption({value: dataSRH.Hotels});

            //Click search button
            await page.getByRole('button', { name: 'Search' }).click();
            await expect(page).toHaveURL('http://www.adactinhotelapp.com/SelectHotel.php');

            //Verify Location and Hotel Name on Select Hotel Page
            await expect(page.getByRole('table').nth(4).locator('td').nth(2)).toHaveText('Location');
            await expect(page.getByRole('table').nth(4).locator('td').nth(1)).toHaveText('Hotel Name');
                                 
             await expect(page.locator('input#location_1.select_text')).toHaveValue(dataSRH.Location);
            await expect(page.locator('input#location_2.select_text')).toHaveValue(dataSRH.Location);
            await expect(page.locator('input#location_3.select_text')).toHaveValue(dataSRH.Location);
            await expect(page.locator('input#location_4.select_text')).toHaveValue(dataSRH.Location);

            await expect(page.locator('input#hotel_name_1.select_text')).toHaveValue(dataSRH.Hotels);
            await expect(page.locator('input#hotel_name_2.select_text')).toHaveValue(dataSRH.Hotels);
            await expect(page.locator('input#hotel_name_3.select_text')).toHaveValue(dataSRH.Hotels);
            await expect(page.locator('input#hotel_name_4.select_text')).toHaveValue(dataSRH.Hotels);



            await page.getByRole('link', { name: 'Search Hotel'}).click(); 
            await expect(page).toHaveURL('http://www.adactinhotelapp.com/SearchHotel.php'); 

         }
           console.log('Completed TS_SRH_036');
}); 

test('TC_SRH_040', async ({ page }) => {
    test.setTimeout(200000);
    const testData_SRH = readExcelDataSheet4('C:\\Users\\rsato\\OneDrive\\Desktop\\Project_Playwright\\tests\\Test Data.xlsx', 'Search Hotel', 'TC_SRH_040');
        console.log(`Processing Test Case ID: TC_SRH_040 to TC_SRG_043`);
          for(const dataSRH of testData_SRH) {
            //Select Location
            console.log(dataSRH);
             const dropdown = page.locator('select#location.search_combobox');
            await dropdown.selectOption({value: dataSRH.Location});
            //Select Hotel Name
            await page.locator('select#hotels.search_combobox').selectOption({value: dataSRH.Hotels});

            //select Room Type
            await page.locator('select#room_type.search_combobox').selectOption({value: dataSRH.RoomType});
            //Click search button
            await page.getByRole('button', { name: 'Search' }).click();
            await expect(page).toHaveURL('http://www.adactinhotelapp.com/SelectHotel.php');

            //Verify Location and Hotel Name on Select Hotel Page
            await expect(page.getByRole('table').nth(4).locator('td').nth(2)).toHaveText('Location');
            await expect(page.getByRole('table').nth(4).locator('td').nth(1)).toHaveText('Hotel Name');
                                 
             await expect(page.locator('input#location_0.select_text')).toHaveValue(dataSRH.Location);
             await expect(page.locator('input#hotel_name_0.select_text')).toHaveValue(dataSRH.Hotels);
            await expect(page.locator('input#room_type_0.select_text')).toHaveValue(dataSRH.RoomType);

            await page.getByRole('link', { name: 'Search Hotel'}).click(); 
            await expect(page).toHaveURL('http://www.adactinhotelapp.com/SearchHotel.php'); 

         }
           console.log('Completed TS_SRH_040  to TC_SRG_043');
}); 

test('TC_SRH_044', async ({ page }) => {
    test.setTimeout(200000);
    const testData_SRH = readExcelDataSheet4('C:\\Users\\rsato\\OneDrive\\Desktop\\Project_Playwright\\tests\\Test Data.xlsx', 'Search Hotel', 'TC_SRH_044');
        console.log(`Processing Test Case ID: TC_SRH_044 to TC_SRG_052`);
          for(const dataSRH of testData_SRH) {
            //Select Location
            console.log(dataSRH);
             const dropdown = page.locator('select#location.search_combobox');
            await dropdown.selectOption({value: dataSRH.Location});
            //Select Hotel Name
            await page.locator('select#hotels.search_combobox').selectOption({value: dataSRH.Hotels});

            //select Room Type
            await page.locator('select#room_type.search_combobox').selectOption({value: dataSRH.RoomType});

            //Select Number of Rooms
            console.log(dataSRH.NumberOfRooms);
            await page.locator('select#room_nos.search_combobox').selectOption({value: dataSRH.NumberOfRooms});
            //Click search button
            await page.getByRole('button', { name: 'Search' }).click();
            await expect(page).toHaveURL('http://www.adactinhotelapp.com/SelectHotel.php');

            //Verify Location and Hotel Name on Select Hotel Page
            await expect(page.getByRole('table').nth(4).locator('td').nth(2)).toHaveText('Location');
            await expect(page.getByRole('table').nth(4).locator('td').nth(1)).toHaveText('Hotel Name');
            await expect(page.getByRole('table').nth(4).locator('td').nth(7)).toHaveText('Rooms Type');
            await expect(page.getByRole('table').nth(4).locator('td').nth(3)).toHaveText('Rooms');
                                 
             await expect(page.locator('input#location_0.select_text')).toHaveValue(dataSRH.Location);
             await expect(page.locator('input#hotel_name_0.select_text')).toHaveValue(dataSRH.Hotels);
            await expect(page.locator('input#room_type_0.select_text')).toHaveValue(dataSRH.RoomType);
            await expect(page.locator('input#rooms_0.select_text')).toHaveValue(dataSRH.NumberOfRooms + ' Rooms');

            await page.getByRole('link', { name: 'Search Hotel'}).click(); 
            await expect(page).toHaveURL('http://www.adactinhotelapp.com/SearchHotel.php'); 

         }
           console.log('Completed TS_SRH_044  to TC_SRH_052');
}); 

test('TC_SRH_053', async ({ page }) => {
    test.setTimeout(200000);
    const testData_SRH = readExcelDataSheet4('C:\\Users\\rsato\\OneDrive\\Desktop\\Project_Playwright\\tests\\Test Data.xlsx', 'Search Hotel', 'TC_SRH_053');
        console.log(`Processing Test Case ID: TC_SRH_053`);
        for(const dataSRH of testData_SRH) {
            //Select Location
            const dropdown = page.locator('select#location.search_combobox');
            await dropdown.selectOption({value: dataSRH.Location});

            await page.locator('select#hotels.search_combobox').selectOption({value: dataSRH.Hotels});
            await page.locator('select#room_type.search_combobox').selectOption({value: dataSRH.RoomType});
            await page.locator('select#room_nos.search_combobox').selectOption({value: dataSRH.NumberOfRooms});
            await page.locator('input#datepick_in').click();
            await page.locator('input#datepick_in').clear();
            await page.locator('input#datepick_in').pressSequentially(dataSRH.CheckInDate, { delay: 50 });
            await page.locator('input#datepick_out').click();
            await page.locator('input#datepick_out').clear();
            await page.locator('input#datepick_out').pressSequentially(dataSRH.CheckOutDate, { delay: 50 });

            //Click search button
            await page.getByRole('button', { name: 'Search' }).click();

            await expect(page.locator('#checkin_span')).toHaveText('Check-In Date shall be before than Check-Out Date');
            await expect(page.locator('#checkout_span')).toHaveText('Check-Out Date shall be after than Check-In Date');

        }
        console.log('Completed TC_SRH_053');
    });

    test('TC_SRH_054', async ({ page }) => {
    test.setTimeout(200000);
    const testData_SRH = readExcelDataSheet4('C:\\Users\\rsato\\OneDrive\\Desktop\\Project_Playwright\\tests\\Test Data.xlsx', 'Search Hotel', 'TC_SRH_054');
        console.log(`Processing Test Case ID: TC_SRH_054`);
        for(const dataSRH of testData_SRH) {
            //Select Location
            const dropdown = page.locator('select#location.search_combobox');
            await dropdown.selectOption({value: dataSRH.Location});

            await page.locator('select#hotels.search_combobox').selectOption({value: dataSRH.Hotels});
            await page.locator('select#room_type.search_combobox').selectOption({value: dataSRH.RoomType});
            await page.locator('select#room_nos.search_combobox').selectOption({value: dataSRH.NumberOfRooms});
            await page.locator('input#datepick_in').click();
            await page.locator('input#datepick_in').clear();
            await page.locator('input#datepick_in').pressSequentially(dataSRH.CheckInDate, { delay: 50 });
            await page.locator('input#datepick_out').click();
            await page.locator('input#datepick_out').clear();
            await page.locator('input#datepick_out').pressSequentially(dataSRH.CheckOutDate, { delay: 50 });

            //Click search button
            await page.getByRole('button', { name: 'Search' }).click();

            await expect(page.locator('#checkin_span')).toHaveText('Check-In Date shall be before than Check-Out Date');
            await expect(page.locator('#checkout_span')).toHaveText('Check-Out Date shall be after than Check-In Date');

        }
        console.log('Completed TC_SRH_054');
    });

  
    test('TC_SRH_055', async ({ page }) => {
    test.setTimeout(200000);
    const testData_SRH = readExcelDataSheet4('C:\\Users\\rsato\\OneDrive\\Desktop\\Project_Playwright\\tests\\Test Data.xlsx', 'Search Hotel', 'TC_SRH_055');
        console.log(`Processing Test Case ID: TC_SRH_055 to TC_SRH_057`);
        for(const dataSRH of testData_SRH) {
            //Select Location
            const dropdown = page.locator('select#location.search_combobox');
            await dropdown.selectOption({value: dataSRH.Location});

            await page.locator('select#hotels.search_combobox').selectOption({value: dataSRH.Hotels});
            await page.locator('select#room_type.search_combobox').selectOption({value: dataSRH.RoomType});
            await page.locator('select#room_nos.search_combobox').selectOption({value: dataSRH.NumberOfRooms});
            await page.locator('select#adult_room.search_combobox').selectOption({value: dataSRH.AdultsPerRoom});
            await page.locator('select#child_room.search_combobox').selectOption({value: dataSRH.ChildrenPerRoom});
            await page.locator('input#datepick_in').click();
            await page.locator('input#datepick_in').clear();
            await page.locator('input#datepick_in').pressSequentially(dataSRH.CheckInDate, { delay: 50 });
            await page.locator('input#datepick_out').click();
            await page.locator('input#datepick_out').clear();
            await page.locator('input#datepick_out').pressSequentially(dataSRH.CheckOutDate, { delay: 50 });

            //Click search button
            await page.getByRole('button', { name: 'Search' }).click();
            await expect(page).toHaveURL('http://www.adactinhotelapp.com/SelectHotel.php');

            const checkIn = new Date(convertDateFormat(dataSRH.CheckInDate));
            const checkOut = new Date(convertDateFormat(dataSRH.CheckOutDate));
            const days = getDaysBetweenDates(checkIn, checkOut);

            //Verify Location and Hotel Name on Select Hotel Page
            await expect(page.getByRole('table').nth(4).locator('td').nth(4)).toHaveText('Arrival Date');
            await expect(page.getByRole('table').nth(4).locator('td').nth(5)).toHaveText('Departure Date');
            await expect(page.getByRole('table').nth(4).locator('td').nth(6)).toHaveText('No. of Days');
            
                                 
            await expect(page.locator('input#arr_date_0.select_text')).toHaveValue(dataSRH.CheckInDate);
            await expect(page.locator('input#dep_date_0.select_text')).toHaveValue(dataSRH.CheckOutDate);
            console.log(days);
            await expect(page.locator('input#no_days_0.select_text')).toHaveValue(days + ' Days');
            

            await page.getByRole('link', { name: 'Search Hotel'}).click(); 
            await expect(page).toHaveURL('http://www.adactinhotelapp.com/SearchHotel.php'); 


        }
        console.log('Completed TC_SRH_055 to TC_SRH_057');
    });
*/
test('TC_SRH_058', async ({ page }) => {
    test.setTimeout(200000);
    const testData_SRH = readExcelDataSheet4('C:\\Users\\rsato\\OneDrive\\Desktop\\Project_Playwright\\tests\\Test Data.xlsx', 'Search Hotel', 'TC_SRH_058');
        console.log(`Processing Test Case ID: TC_SRH_058 to TC_SRH_064`);
        for(const dataSRH of testData_SRH) {
            //Select Location
            const dropdown = page.locator('select#location.search_combobox');
            await dropdown.selectOption({value: dataSRH.Location});

            await page.locator('select#hotels.search_combobox').selectOption({value: dataSRH.Hotels});
            await page.locator('select#room_type.search_combobox').selectOption({value: dataSRH.RoomType});
            await page.locator('select#room_nos.search_combobox').selectOption({value: dataSRH.NumberOfRooms});
            await page.locator('select#adult_room.search_combobox').selectOption({value: dataSRH.AdultsPerRoom});
            await page.locator('select#child_room.search_combobox').selectOption({value: dataSRH.ChildrenPerRoom});
            await page.locator('input#datepick_in').click();
            await page.locator('input#datepick_in').clear();
            await page.locator('input#datepick_in').pressSequentially(dataSRH.CheckInDate, { delay: 50 });
            await page.locator('input#datepick_out').click();
            await page.locator('input#datepick_out').clear();
            await page.locator('input#datepick_out').pressSequentially(dataSRH.CheckOutDate, { delay: 50 });

            //Click search button
            await page.getByRole('button', { name: 'Search' }).click();
            await expect(page).toHaveURL('http://www.adactinhotelapp.com/SelectHotel.php');

            await page.getByRole('link', { name: 'Search Hotel'}).click(); 
            await expect(page).toHaveURL('http://www.adactinhotelapp.com/SearchHotel.php'); 


        }
        console.log('Completed TC_SRH_058 to TC_SRH_064');
    });

    test('TC_SRH_065', async ({ page }) => {
    test.setTimeout(200000);
    const testData_SRH = readExcelDataSheet4('C:\\Users\\rsato\\OneDrive\\Desktop\\Project_Playwright\\tests\\Test Data.xlsx', 'Search Hotel', 'TC_SRH_065');
        console.log(`Processing Test Case ID:TC_SRH_065`);
        for(const dataSRH of testData_SRH) {
            //Select Location
            const dropdown = page.locator('select#location.search_combobox');
            await dropdown.selectOption({value: dataSRH.Location});

            await page.locator('select#room_type.search_combobox').selectOption({value: dataSRH.RoomType});
            await page.locator('select#room_nos.search_combobox').selectOption({value: dataSRH.NumberOfRooms});
            await page.locator('select#adult_room.search_combobox').selectOption({value: dataSRH.AdultsPerRoom});
            await page.locator('select#child_room.search_combobox').selectOption({value: dataSRH.ChildrenPerRoom});
            await page.locator('input#datepick_in').click();
            await page.locator('input#datepick_in').clear();
            await page.locator('input#datepick_in').pressSequentially(dataSRH.CheckInDate, { delay: 50 });
            await page.locator('input#datepick_out').click();
            await page.locator('input#datepick_out').clear();
            await page.locator('input#datepick_out').pressSequentially(dataSRH.CheckOutDate, { delay: 50 });

            //Click search button
            await page.getByRole('button', { name: 'Search' }).click();
            await expect(page).toHaveURL('http://www.adactinhotelapp.com/SelectHotel.php');

            const checkIn = new Date(convertDateFormat(dataSRH.CheckInDate));
            const checkOut = new Date(convertDateFormat(dataSRH.CheckOutDate));
            const days = getDaysBetweenDates(checkIn, checkOut);
            const totalPriceCornice = ((100 * days * Number(dataSRH.NumberOfRooms) ) + 10);
            const totalPriceCreek = ((125 * days * Number(dataSRH.NumberOfRooms) ) + 10);
            const totalPriceSunshine = ((175 * days * Number(dataSRH.NumberOfRooms) ) + 10);
            const totalPriceHervey = ((150 * days * Number(dataSRH.NumberOfRooms) ) + 10);
      

            await expect(page.locator('input#hotel_name_1.select_text')).toHaveValue('Hotel Cornice');
            await expect(page.locator('input#room_type_1.select_text')).toHaveValue('Standard');
            await expect(page.locator('input#no_days_1.select_text')).toHaveValue(days + ' Days');
            await expect(page.locator('input#price_night_1.select_text')).toHaveValue('AUD $ 100');
            await expect(page.locator('input#total_price_1.select_text')).toHaveValue('AUD $ ' + totalPriceCornice);

            await expect(page.locator('input#hotel_name_2.select_text')).toHaveValue('Hotel Creek');
            await expect(page.locator('input#room_type_2.select_text')).toHaveValue('Standard');
            await expect(page.locator('input#no_days_2.select_text')).toHaveValue(days + ' Days');
            await expect(page.locator('input#price_night_2.select_text')).toHaveValue('AUD $ 125');
            await expect(page.locator('input#total_price_2.select_text')).toHaveValue('AUD $ ' + totalPriceCreek);

            await expect(page.locator('input#hotel_name_3.select_text')).toHaveValue('Hotel Hervey');
            await expect(page.locator('input#room_type_3.select_text')).toHaveValue('Standard');
            await expect(page.locator('input#no_days_3.select_text')).toHaveValue(days + ' Days');
            await expect(page.locator('input#price_night_3.select_text')).toHaveValue('AUD $ 150');
            await expect(page.locator('input#total_price_3.select_text')).toHaveValue('AUD $ ' + totalPriceHervey);

            await expect(page.locator('input#hotel_name_4.select_text')).toHaveValue('Hotel Sunshine');
            await expect(page.locator('input#room_type_4.select_text')).toHaveValue('Standard');
            await expect(page.locator('input#no_days_4.select_text')).toHaveValue(days + ' Days');
            await expect(page.locator('input#price_night_4.select_text')).toHaveValue('AUD $ 175');
            await expect(page.locator('input#total_price_4.select_text')).toHaveValue('AUD $ ' + totalPriceSunshine);
        

            await page.getByRole('link', { name: 'Search Hotel'}).click(); 
            await expect(page).toHaveURL('http://www.adactinhotelapp.com/SearchHotel.php'); 


        }
        console.log('Completed TC_SRH_065');
    });

        test('TC_SRH_067', async ({ page }) => {
    test.setTimeout(200000);
    const testData_SRH = readExcelDataSheet4('C:\\Users\\rsato\\OneDrive\\Desktop\\Project_Playwright\\tests\\Test Data.xlsx', 'Search Hotel', 'TC_SRH_067');
        console.log(`Processing Test Case ID:TC_SRH_067`);
        for(const dataSRH of testData_SRH) {
            //Select Location
            const dropdown = page.locator('select#location.search_combobox');
            await dropdown.selectOption({value: dataSRH.Location});

            await page.locator('select#room_type.search_combobox').selectOption({value: dataSRH.RoomType});
            await page.locator('select#room_nos.search_combobox').selectOption({value: dataSRH.NumberOfRooms});
            await page.locator('select#adult_room.search_combobox').selectOption({value: dataSRH.AdultsPerRoom});
            await page.locator('select#child_room.search_combobox').selectOption({value: dataSRH.ChildrenPerRoom});
            await page.locator('input#datepick_in').click();
            await page.locator('input#datepick_in').clear();
            await page.locator('input#datepick_in').pressSequentially(dataSRH.CheckInDate, { delay: 50 });
            await page.locator('input#datepick_out').click();
            await page.locator('input#datepick_out').clear();
            await page.locator('input#datepick_out').pressSequentially(dataSRH.CheckOutDate, { delay: 50 });

            //Click search button
            await page.getByRole('button', { name: 'Search' }).click();
            await expect(page).toHaveURL('http://www.adactinhotelapp.com/SelectHotel.php');

            const checkIn = new Date(convertDateFormat(dataSRH.CheckInDate));
            const checkOut = new Date(convertDateFormat(dataSRH.CheckOutDate));
            const days = getDaysBetweenDates(checkIn, checkOut);
            const totalPriceCornice = ((200 * days  * Number(dataSRH.NumberOfRooms)) + 10);
            const totalPriceCreek = ((225 * days  * Number(dataSRH.NumberOfRooms) ) + 10);
            const totalPriceSunshine = ((275 * days  * Number(dataSRH.NumberOfRooms) ) + 10);
            const totalPriceHervey = ((250 * days  * Number(dataSRH.NumberOfRooms) ) + 10);
      

            await expect(page.locator('input#hotel_name_1.select_text')).toHaveValue('Hotel Cornice');
            await expect(page.locator('input#room_type_1.select_text')).toHaveValue('Double');
            await expect(page.locator('input#no_days_1.select_text')).toHaveValue(days + ' Days');
            await expect(page.locator('input#price_night_1.select_text')).toHaveValue('AUD $ 200');
            await expect(page.locator('input#total_price_1.select_text')).toHaveValue('AUD $ ' + totalPriceCornice);

            await expect(page.locator('input#hotel_name_2.select_text')).toHaveValue('Hotel Creek');
            await expect(page.locator('input#room_type_2.select_text')).toHaveValue('Double');
            await expect(page.locator('input#no_days_2.select_text')).toHaveValue(days + ' Days');
            await expect(page.locator('input#price_night_2.select_text')).toHaveValue('AUD $ 225');
            await expect(page.locator('input#total_price_2.select_text')).toHaveValue('AUD $ ' + totalPriceCreek);

            await expect(page.locator('input#hotel_name_3.select_text')).toHaveValue('Hotel Hervey');
            await expect(page.locator('input#room_type_3.select_text')).toHaveValue('Double');
            await expect(page.locator('input#no_days_3.select_text')).toHaveValue(days + ' Days');
            await expect(page.locator('input#price_night_3.select_text')).toHaveValue('AUD $ 250');
            await expect(page.locator('input#total_price_3.select_text')).toHaveValue('AUD $ ' + totalPriceHervey);

            await expect(page.locator('input#hotel_name_4.select_text')).toHaveValue('Hotel Sunshine');
            await expect(page.locator('input#room_type_4.select_text')).toHaveValue('Double');
            await expect(page.locator('input#no_days_4.select_text')).toHaveValue(days + ' Days');
            await expect(page.locator('input#price_night_4.select_text')).toHaveValue('AUD $ 275');
            await expect(page.locator('input#total_price_4.select_text')).toHaveValue('AUD $ ' + totalPriceSunshine);
        

            await page.getByRole('link', { name: 'Search Hotel'}).click(); 
            await expect(page).toHaveURL('http://www.adactinhotelapp.com/SearchHotel.php'); 


        }
        console.log('Completed TC_SRH_067');
    });

     test('TC_SRH_069', async ({ page }) => {
    test.setTimeout(200000);
    const testData_SRH = readExcelDataSheet4('C:\\Users\\rsato\\OneDrive\\Desktop\\Project_Playwright\\tests\\Test Data.xlsx', 'Search Hotel', 'TC_SRH_069');
        console.log(`Processing Test Case ID:TC_SRH_069`);
        for(const dataSRH of testData_SRH) {
            //Select Location
            const dropdown = page.locator('select#location.search_combobox');
            await dropdown.selectOption({value: dataSRH.Location});

            await page.locator('select#room_type.search_combobox').selectOption({value: dataSRH.RoomType});
            await page.locator('select#room_nos.search_combobox').selectOption({value: dataSRH.NumberOfRooms});
            await page.locator('select#adult_room.search_combobox').selectOption({value: dataSRH.AdultsPerRoom});
            await page.locator('select#child_room.search_combobox').selectOption({value: dataSRH.ChildrenPerRoom});
            await page.locator('input#datepick_in').click();
            await page.locator('input#datepick_in').clear();
            await page.locator('input#datepick_in').pressSequentially(dataSRH.CheckInDate, { delay: 50 });
            await page.locator('input#datepick_out').click();
            await page.locator('input#datepick_out').clear();
            await page.locator('input#datepick_out').pressSequentially(dataSRH.CheckOutDate, { delay: 50 });

            //Click search button
            await page.getByRole('button', { name: 'Search' }).click();
            await expect(page).toHaveURL('http://www.adactinhotelapp.com/SelectHotel.php');

            const checkIn = new Date(convertDateFormat(dataSRH.CheckInDate));
            const checkOut = new Date(convertDateFormat(dataSRH.CheckOutDate));
            const days = getDaysBetweenDates(checkIn, checkOut);
            const totalPriceCornice = ((300 * days  * Number(dataSRH.NumberOfRooms)) + 10);
            const totalPriceCreek = ((325 * days  * Number(dataSRH.NumberOfRooms) ) + 10);
            const totalPriceSunshine = ((375 * days  * Number(dataSRH.NumberOfRooms) ) + 10);
            const totalPriceHervey = ((350 * days  * Number(dataSRH.NumberOfRooms) ) + 10);
      

            await expect(page.locator('input#hotel_name_1.select_text')).toHaveValue('Hotel Cornice');
            await expect(page.locator('input#room_type_1.select_text')).toHaveValue('Deluxe');
            await expect(page.locator('input#no_days_1.select_text')).toHaveValue(days + ' Days');
            await expect(page.locator('input#price_night_1.select_text')).toHaveValue('AUD $ 300');
            await expect(page.locator('input#total_price_1.select_text')).toHaveValue('AUD $ ' + totalPriceCornice);

            await expect(page.locator('input#hotel_name_2.select_text')).toHaveValue('Hotel Creek');
            await expect(page.locator('input#room_type_2.select_text')).toHaveValue('Deluxe');
            await expect(page.locator('input#no_days_2.select_text')).toHaveValue(days + ' Days');
            await expect(page.locator('input#price_night_2.select_text')).toHaveValue('AUD $ 325');
            await expect(page.locator('input#total_price_2.select_text')).toHaveValue('AUD $ ' + totalPriceCreek);

            await expect(page.locator('input#hotel_name_3.select_text')).toHaveValue('Hotel Hervey');
            await expect(page.locator('input#room_type_3.select_text')).toHaveValue('Deluxe');
            await expect(page.locator('input#no_days_3.select_text')).toHaveValue(days + ' Days');
            await expect(page.locator('input#price_night_3.select_text')).toHaveValue('AUD $ 350');
            await expect(page.locator('input#total_price_3.select_text')).toHaveValue('AUD $ ' + totalPriceHervey);

            await expect(page.locator('input#hotel_name_4.select_text')).toHaveValue('Hotel Sunshine');
            await expect(page.locator('input#room_type_4.select_text')).toHaveValue('Deluxe');
            await expect(page.locator('input#no_days_4.select_text')).toHaveValue(days + ' Days');
            await expect(page.locator('input#price_night_4.select_text')).toHaveValue('AUD $ 375');
            await expect(page.locator('input#total_price_4.select_text')).toHaveValue('AUD $ ' + totalPriceSunshine);
        

            await page.getByRole('link', { name: 'Search Hotel'}).click(); 
            await expect(page).toHaveURL('http://www.adactinhotelapp.com/SearchHotel.php'); 


        }
        console.log('Completed TC_SRH_069');
    });

         test('TC_SRH_071', async ({ page }) => {
    test.setTimeout(200000);
    const testData_SRH = readExcelDataSheet4('C:\\Users\\rsato\\OneDrive\\Desktop\\Project_Playwright\\tests\\Test Data.xlsx', 'Search Hotel', 'TC_SRH_071');
        console.log(`Processing Test Case ID:TC_SRH_071`);
        for(const dataSRH of testData_SRH) {
            //Select Location
            const dropdown = page.locator('select#location.search_combobox');
            await dropdown.selectOption({value: dataSRH.Location});

            await page.locator('select#room_type.search_combobox').selectOption({value: dataSRH.RoomType});
            await page.locator('select#room_nos.search_combobox').selectOption({value: dataSRH.NumberOfRooms});
            await page.locator('select#adult_room.search_combobox').selectOption({value: dataSRH.AdultsPerRoom});
            await page.locator('select#child_room.search_combobox').selectOption({value: dataSRH.ChildrenPerRoom});
            await page.locator('input#datepick_in').click();
            await page.locator('input#datepick_in').clear();
            await page.locator('input#datepick_in').pressSequentially(dataSRH.CheckInDate, { delay: 50 });
            await page.locator('input#datepick_out').click();
            await page.locator('input#datepick_out').clear();
            await page.locator('input#datepick_out').pressSequentially(dataSRH.CheckOutDate, { delay: 50 });

            //Click search button
            await page.getByRole('button', { name: 'Search' }).click();
            await expect(page).toHaveURL('http://www.adactinhotelapp.com/SelectHotel.php');

            const checkIn = new Date(convertDateFormat(dataSRH.CheckInDate));
            const checkOut = new Date(convertDateFormat(dataSRH.CheckOutDate));
            const days = getDaysBetweenDates(checkIn, checkOut);
            const totalPriceCornice = ((400 * days  * Number(dataSRH.NumberOfRooms)) + 10);
            const totalPriceCreek = ((425 * days  * Number(dataSRH.NumberOfRooms) ) + 10);
            const totalPriceSunshine = ((475 * days  * Number(dataSRH.NumberOfRooms) ) + 10);
            const totalPriceHervey = ((450 * days  * Number(dataSRH.NumberOfRooms) ) + 10);
      

            await expect(page.locator('input#hotel_name_1.select_text')).toHaveValue('Hotel Cornice');
            await expect(page.locator('input#room_type_1.select_text')).toHaveValue('Super Deluxe');
            await expect(page.locator('input#no_days_1.select_text')).toHaveValue(days + ' Days');
            await expect(page.locator('input#price_night_1.select_text')).toHaveValue('AUD $ 400');
            await expect(page.locator('input#total_price_1.select_text')).toHaveValue('AUD $ ' + totalPriceCornice);

            await expect(page.locator('input#hotel_name_2.select_text')).toHaveValue('Hotel Creek');
            await expect(page.locator('input#room_type_2.select_text')).toHaveValue('Super Deluxe');
            await expect(page.locator('input#no_days_2.select_text')).toHaveValue(days + ' Days');
            await expect(page.locator('input#price_night_2.select_text')).toHaveValue('AUD $ 425');
            await expect(page.locator('input#total_price_2.select_text')).toHaveValue('AUD $ ' + totalPriceCreek);

            await expect(page.locator('input#hotel_name_3.select_text')).toHaveValue('Hotel Hervey');
            await expect(page.locator('input#room_type_3.select_text')).toHaveValue('Super Deluxe');
            await expect(page.locator('input#no_days_3.select_text')).toHaveValue(days + ' Days');
            await expect(page.locator('input#price_night_3.select_text')).toHaveValue('AUD $ 450');
            await expect(page.locator('input#total_price_3.select_text')).toHaveValue('AUD $ ' + totalPriceHervey);

            await expect(page.locator('input#hotel_name_4.select_text')).toHaveValue('Hotel Sunshine');
            await expect(page.locator('input#room_type_4.select_text')).toHaveValue('Super Deluxe');
            await expect(page.locator('input#no_days_4.select_text')).toHaveValue(days + ' Days');
            await expect(page.locator('input#price_night_4.select_text')).toHaveValue('AUD $ 475');
            await expect(page.locator('input#total_price_4.select_text')).toHaveValue('AUD $ ' + totalPriceSunshine);
        

            await page.getByRole('link', { name: 'Search Hotel'}).click(); 
            await expect(page).toHaveURL('http://www.adactinhotelapp.com/SearchHotel.php'); 


        }
        console.log('Completed TC_SRH_071');
    });

             test('TC_SRH_073', async ({ page }) => {
    test.setTimeout(200000);
    const testData_SRH = readExcelDataSheet4('C:\\Users\\rsato\\OneDrive\\Desktop\\Project_Playwright\\tests\\Test Data.xlsx', 'Search Hotel', 'TC_SRH_073');
        console.log(`Processing Test Case ID:TC_SRH_073`);
        for(const dataSRH of testData_SRH) {
            //Select Location
            const dropdown = page.locator('select#location.search_combobox');
            await dropdown.selectOption({value: dataSRH.Location});

            await page.locator('select#room_type.search_combobox').selectOption({value: dataSRH.RoomType});
            await page.locator('select#room_nos.search_combobox').selectOption({value: dataSRH.NumberOfRooms});
            await page.locator('select#adult_room.search_combobox').selectOption({value: dataSRH.AdultsPerRoom});
            await page.locator('select#child_room.search_combobox').selectOption({value: dataSRH.ChildrenPerRoom});
            await page.locator('input#datepick_in').click();
            await page.locator('input#datepick_in').clear();
            await page.locator('input#datepick_in').pressSequentially(dataSRH.CheckInDate, { delay: 50 });
            await page.locator('input#datepick_out').click();
            await page.locator('input#datepick_out').clear();
            await page.locator('input#datepick_out').pressSequentially(dataSRH.CheckOutDate, { delay: 50 });

            //Click search button
            await page.getByRole('button', { name: 'Search' }).click();
            await expect(page).toHaveURL('http://www.adactinhotelapp.com/SelectHotel.php');

            const checkIn = new Date(convertDateFormat(dataSRH.CheckInDate));
            const checkOut = new Date(convertDateFormat(dataSRH.CheckOutDate));
            const days = getDaysBetweenDates(checkIn, checkOut);
            const totalPriceCornice = ((100 * days  * Number(dataSRH.NumberOfRooms)) + 10);
            const totalPriceCreek = ((125 * days  * Number(dataSRH.NumberOfRooms) ) + 10);
            const totalPriceSunshine = ((175 * days  * Number(dataSRH.NumberOfRooms) ) + 10);
            const totalPriceHervey = ((150 * days  * Number(dataSRH.NumberOfRooms) ) + 10);
      

            await expect(page.locator('input#hotel_name_1.select_text')).toHaveValue('Hotel Cornice');
            await expect(page.locator('input#room_type_1.select_text')).toHaveValue('Standard');
            await expect(page.locator('input#no_days_1.select_text')).toHaveValue(days + ' Days');
            await expect(page.locator('input#price_night_1.select_text')).toHaveValue('AUD $ 100');
            await expect(page.locator('input#total_price_1.select_text')).toHaveValue('AUD $ ' + totalPriceCornice);

            await expect(page.locator('input#hotel_name_2.select_text')).toHaveValue('Hotel Creek');
            await expect(page.locator('input#room_type_2.select_text')).toHaveValue('Standard');
            await expect(page.locator('input#no_days_2.select_text')).toHaveValue(days + ' Days');
            await expect(page.locator('input#price_night_2.select_text')).toHaveValue('AUD $ 125');
            await expect(page.locator('input#total_price_2.select_text')).toHaveValue('AUD $ ' + totalPriceCreek);

            await expect(page.locator('input#hotel_name_3.select_text')).toHaveValue('Hotel Hervey');
            await expect(page.locator('input#room_type_3.select_text')).toHaveValue('Standard');
            await expect(page.locator('input#no_days_3.select_text')).toHaveValue(days + ' Days');
            await expect(page.locator('input#price_night_3.select_text')).toHaveValue('AUD $ 150');
            await expect(page.locator('input#total_price_3.select_text')).toHaveValue('AUD $ ' + totalPriceHervey);

            await expect(page.locator('input#hotel_name_4.select_text')).toHaveValue('Hotel Sunshine');
            await expect(page.locator('input#room_type_4.select_text')).toHaveValue('Standard');
            await expect(page.locator('input#no_days_4.select_text')).toHaveValue(days + ' Days');
            await expect(page.locator('input#price_night_4.select_text')).toHaveValue('AUD $ 175');
            await expect(page.locator('input#total_price_4.select_text')).toHaveValue('AUD $ ' + totalPriceSunshine);
        

            await page.getByRole('link', { name: 'Search Hotel'}).click(); 
            await expect(page).toHaveURL('http://www.adactinhotelapp.com/SearchHotel.php'); 


        }
        console.log('Completed TC_SRH_073');
    });

     test('TC_SRH_074', async ({ page }) => {
    test.setTimeout(200000);
    const testData_SRH = readExcelDataSheet4('C:\\Users\\rsato\\OneDrive\\Desktop\\Project_Playwright\\tests\\Test Data.xlsx', 'Search Hotel', 'TC_SRH_074');
        console.log(`Processing Test Case ID:TC_SRH_074`);
        for(const dataSRH of testData_SRH) {
            //Select Location
            const dropdown = page.locator('select#location.search_combobox');
            await dropdown.selectOption({value: dataSRH.Location});

            await page.locator('select#room_type.search_combobox').selectOption({value: dataSRH.RoomType});
            await page.locator('select#room_nos.search_combobox').selectOption({value: dataSRH.NumberOfRooms});
            await page.locator('select#adult_room.search_combobox').selectOption({value: dataSRH.AdultsPerRoom});
            await page.locator('select#child_room.search_combobox').selectOption({value: dataSRH.ChildrenPerRoom});
            await page.locator('input#datepick_in').click();
            await page.locator('input#datepick_in').clear();
            await page.locator('input#datepick_in').pressSequentially(dataSRH.CheckInDate, { delay: 50 });
            await page.locator('input#datepick_out').click();
            await page.locator('input#datepick_out').clear();
            await page.locator('input#datepick_out').pressSequentially(dataSRH.CheckOutDate, { delay: 50 });

            //Click search button
            await page.getByRole('button', { name: 'Search' }).click();
            await expect(page).toHaveURL('http://www.adactinhotelapp.com/SelectHotel.php');

            const checkIn = new Date(convertDateFormat(dataSRH.CheckInDate));
            const checkOut = new Date(convertDateFormat(dataSRH.CheckOutDate));
            const days = getDaysBetweenDates(checkIn, checkOut);
            const totalPriceCornice = ((200 * days  * Number(dataSRH.NumberOfRooms)) + 10);
            const totalPriceCreek = ((225 * days  * Number(dataSRH.NumberOfRooms) ) + 10);
            const totalPriceSunshine = ((275 * days  * Number(dataSRH.NumberOfRooms) ) + 10);
            const totalPriceHervey = ((250 * days  * Number(dataSRH.NumberOfRooms) ) + 10);
      

            await expect(page.locator('input#hotel_name_1.select_text')).toHaveValue('Hotel Cornice');
            await expect(page.locator('input#room_type_1.select_text')).toHaveValue('Double');
            await expect(page.locator('input#no_days_1.select_text')).toHaveValue(days + ' Days');
            await expect(page.locator('input#price_night_1.select_text')).toHaveValue('AUD $ 200');
            await expect(page.locator('input#total_price_1.select_text')).toHaveValue('AUD $ ' + totalPriceCornice);

            await expect(page.locator('input#hotel_name_2.select_text')).toHaveValue('Hotel Creek');
            await expect(page.locator('input#room_type_2.select_text')).toHaveValue('Double');
            await expect(page.locator('input#no_days_2.select_text')).toHaveValue(days + ' Days');
            await expect(page.locator('input#price_night_2.select_text')).toHaveValue('AUD $ 225');
            await expect(page.locator('input#total_price_2.select_text')).toHaveValue('AUD $ ' + totalPriceCreek);

            await expect(page.locator('input#hotel_name_3.select_text')).toHaveValue('Hotel Hervey');
            await expect(page.locator('input#room_type_3.select_text')).toHaveValue('Double');
            await expect(page.locator('input#no_days_3.select_text')).toHaveValue(days + ' Days');
            await expect(page.locator('input#price_night_3.select_text')).toHaveValue('AUD $ 250');
            await expect(page.locator('input#total_price_3.select_text')).toHaveValue('AUD $ ' + totalPriceHervey);

            await expect(page.locator('input#hotel_name_4.select_text')).toHaveValue('Hotel Sunshine');
            await expect(page.locator('input#room_type_4.select_text')).toHaveValue('Double');
            await expect(page.locator('input#no_days_4.select_text')).toHaveValue(days + ' Days');
            await expect(page.locator('input#price_night_4.select_text')).toHaveValue('AUD $ 275');
            await expect(page.locator('input#total_price_4.select_text')).toHaveValue('AUD $ ' + totalPriceSunshine);
        

            await page.getByRole('link', { name: 'Search Hotel'}).click(); 
            await expect(page).toHaveURL('http://www.adactinhotelapp.com/SearchHotel.php'); 


        }
        console.log('Completed TC_SRH_074');
    });

     test('TC_SRH_075', async ({ page }) => {
    test.setTimeout(200000);
    const testData_SRH = readExcelDataSheet4('C:\\Users\\rsato\\OneDrive\\Desktop\\Project_Playwright\\tests\\Test Data.xlsx', 'Search Hotel', 'TC_SRH_075');
        console.log(`Processing Test Case ID:TC_SRH_075`);
        for(const dataSRH of testData_SRH) {
            //Select Location
            const dropdown = page.locator('select#location.search_combobox');
            await dropdown.selectOption({value: dataSRH.Location});

            await page.locator('select#room_type.search_combobox').selectOption({value: dataSRH.RoomType});
            await page.locator('select#room_nos.search_combobox').selectOption({value: dataSRH.NumberOfRooms});
            await page.locator('select#adult_room.search_combobox').selectOption({value: dataSRH.AdultsPerRoom});
            await page.locator('select#child_room.search_combobox').selectOption({value: dataSRH.ChildrenPerRoom});
            await page.locator('input#datepick_in').click();
            await page.locator('input#datepick_in').clear();
            await page.locator('input#datepick_in').pressSequentially(dataSRH.CheckInDate, { delay: 50 });
            await page.locator('input#datepick_out').click();
            await page.locator('input#datepick_out').clear();
            await page.locator('input#datepick_out').pressSequentially(dataSRH.CheckOutDate, { delay: 50 });

            //Click search button
            await page.getByRole('button', { name: 'Search' }).click();
            await expect(page).toHaveURL('http://www.adactinhotelapp.com/SelectHotel.php');

            const checkIn = new Date(convertDateFormat(dataSRH.CheckInDate));
            const checkOut = new Date(convertDateFormat(dataSRH.CheckOutDate));
            const days = getDaysBetweenDates(checkIn, checkOut);
            const totalPriceCornice = ((300 * days  * Number(dataSRH.NumberOfRooms)) + 10);
            const totalPriceCreek = ((325 * days  * Number(dataSRH.NumberOfRooms) ) + 10);
            const totalPriceSunshine = ((375 * days  * Number(dataSRH.NumberOfRooms) ) + 10);
            const totalPriceHervey = ((350 * days  * Number(dataSRH.NumberOfRooms) ) + 10);
      

            await expect(page.locator('input#hotel_name_1.select_text')).toHaveValue('Hotel Cornice');
            await expect(page.locator('input#room_type_1.select_text')).toHaveValue('Deluxe');
            await expect(page.locator('input#no_days_1.select_text')).toHaveValue(days + ' Days');
            await expect(page.locator('input#price_night_1.select_text')).toHaveValue('AUD $ 300');
            await expect(page.locator('input#total_price_1.select_text')).toHaveValue('AUD $ ' + totalPriceCornice);

            await expect(page.locator('input#hotel_name_2.select_text')).toHaveValue('Hotel Creek');
            await expect(page.locator('input#room_type_2.select_text')).toHaveValue('Deluxe');
            await expect(page.locator('input#no_days_2.select_text')).toHaveValue(days + ' Days');
            await expect(page.locator('input#price_night_2.select_text')).toHaveValue('AUD $ 325');
            await expect(page.locator('input#total_price_2.select_text')).toHaveValue('AUD $ ' + totalPriceCreek);

            await expect(page.locator('input#hotel_name_3.select_text')).toHaveValue('Hotel Hervey');
            await expect(page.locator('input#room_type_3.select_text')).toHaveValue('Deluxe');
            await expect(page.locator('input#no_days_3.select_text')).toHaveValue(days + ' Days');
            await expect(page.locator('input#price_night_3.select_text')).toHaveValue('AUD $ 350');
            await expect(page.locator('input#total_price_3.select_text')).toHaveValue('AUD $ ' + totalPriceHervey);

            await expect(page.locator('input#hotel_name_4.select_text')).toHaveValue('Hotel Sunshine');
            await expect(page.locator('input#room_type_4.select_text')).toHaveValue('Deluxe');
            await expect(page.locator('input#no_days_4.select_text')).toHaveValue(days + ' Days');
            await expect(page.locator('input#price_night_4.select_text')).toHaveValue('AUD $ 375');
            await expect(page.locator('input#total_price_4.select_text')).toHaveValue('AUD $ ' + totalPriceSunshine);
        

            await page.getByRole('link', { name: 'Search Hotel'}).click(); 
            await expect(page).toHaveURL('http://www.adactinhotelapp.com/SearchHotel.php'); 


        }
        console.log('Completed TC_SRH_075');
    });

         test('TC_SRH_076', async ({ page }) => {
    test.setTimeout(200000);
    const testData_SRH = readExcelDataSheet4('C:\\Users\\rsato\\OneDrive\\Desktop\\Project_Playwright\\tests\\Test Data.xlsx', 'Search Hotel', 'TC_SRH_076');
        console.log(`Processing Test Case ID:TC_SRH_076`);
        for(const dataSRH of testData_SRH) {
            //Select Location
            const dropdown = page.locator('select#location.search_combobox');
            await dropdown.selectOption({value: dataSRH.Location});

            await page.locator('select#room_type.search_combobox').selectOption({value: dataSRH.RoomType});
            await page.locator('select#room_nos.search_combobox').selectOption({value: dataSRH.NumberOfRooms});
            await page.locator('select#adult_room.search_combobox').selectOption({value: dataSRH.AdultsPerRoom});
            await page.locator('select#child_room.search_combobox').selectOption({value: dataSRH.ChildrenPerRoom});
            await page.locator('input#datepick_in').click();
            await page.locator('input#datepick_in').clear();
            await page.locator('input#datepick_in').pressSequentially(dataSRH.CheckInDate, { delay: 50 });
            await page.locator('input#datepick_out').click();
            await page.locator('input#datepick_out').clear();
            await page.locator('input#datepick_out').pressSequentially(dataSRH.CheckOutDate, { delay: 50 });

            //Click search button
            await page.getByRole('button', { name: 'Search' }).click();
            await expect(page).toHaveURL('http://www.adactinhotelapp.com/SelectHotel.php');

            const checkIn = new Date(convertDateFormat(dataSRH.CheckInDate));
            const checkOut = new Date(convertDateFormat(dataSRH.CheckOutDate));
            const days = getDaysBetweenDates(checkIn, checkOut);
            const totalPriceCornice = ((400 * days  * Number(dataSRH.NumberOfRooms)) + 10);
            const totalPriceCreek = ((425 * days  * Number(dataSRH.NumberOfRooms) ) + 10);
            const totalPriceSunshine = ((475 * days  * Number(dataSRH.NumberOfRooms) ) + 10);
            const totalPriceHervey = ((450 * days  * Number(dataSRH.NumberOfRooms) ) + 10);
      

            await expect(page.locator('input#hotel_name_1.select_text')).toHaveValue('Hotel Cornice');
            await expect(page.locator('input#room_type_1.select_text')).toHaveValue('Super Deluxe');
            await expect(page.locator('input#no_days_1.select_text')).toHaveValue(days + ' Days');
            await expect(page.locator('input#price_night_1.select_text')).toHaveValue('AUD $ 400');
            await expect(page.locator('input#total_price_1.select_text')).toHaveValue('AUD $ ' + totalPriceCornice);

            await expect(page.locator('input#hotel_name_2.select_text')).toHaveValue('Hotel Creek');
            await expect(page.locator('input#room_type_2.select_text')).toHaveValue('Super Deluxe');
            await expect(page.locator('input#no_days_2.select_text')).toHaveValue(days + ' Days');
            await expect(page.locator('input#price_night_2.select_text')).toHaveValue('AUD $ 425');
            await expect(page.locator('input#total_price_2.select_text')).toHaveValue('AUD $ ' + totalPriceCreek);

            await expect(page.locator('input#hotel_name_3.select_text')).toHaveValue('Hotel Hervey');
            await expect(page.locator('input#room_type_3.select_text')).toHaveValue('Super Deluxe');
            await expect(page.locator('input#no_days_3.select_text')).toHaveValue(days + ' Days');
            await expect(page.locator('input#price_night_3.select_text')).toHaveValue('AUD $ 450');
            await expect(page.locator('input#total_price_3.select_text')).toHaveValue('AUD $ ' + totalPriceHervey);

            await expect(page.locator('input#hotel_name_4.select_text')).toHaveValue('Hotel Sunshine');
            await expect(page.locator('input#room_type_4.select_text')).toHaveValue('Super Deluxe');
            await expect(page.locator('input#no_days_4.select_text')).toHaveValue(days + ' Days');
            await expect(page.locator('input#price_night_4.select_text')).toHaveValue('AUD $ 475');
            await expect(page.locator('input#total_price_4.select_text')).toHaveValue('AUD $ ' + totalPriceSunshine);
        

            await page.getByRole('link', { name: 'Search Hotel'}).click(); 
            await expect(page).toHaveURL('http://www.adactinhotelapp.com/SearchHotel.php'); 


        }
        console.log('Completed TC_SRH_076');
    });
