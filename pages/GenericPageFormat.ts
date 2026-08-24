import { expect, Locator, Page } from '@playwright/test';

export class GenericPage {

    private page: Page;

       constructor(page: Page){
        this.page = page;
       
    }
    async validateFormHyperlinks() {
         
            await expect(this.page.getByRole('link', { name: 'Search Hotel'})).toBeVisible();
            await expect(this.page.getByRole('link', { name: 'Search Hotel'})).toHaveAttribute('href', 'SearchHotel.php');
            await expect(this.page.getByRole('link', { name: 'Search Hotel'})).toBeEnabled();
            await expect(this.page.getByRole('link', { name: 'Booked Itinerary'})).toBeVisible();
            await expect(this.page.getByRole('link', { name: 'Booked Itinerary'})).toHaveAttribute('href', 'BookedItinerary.php');
            await expect(this.page.getByRole('link', { name: 'Booked Itinerary'})).toBeEnabled();
            await expect(this.page.getByRole('link', { name: 'Change Password' })).toBeVisible();
            await expect(this.page.getByRole('link', { name: 'Change Password' })).toHaveAttribute('href', 'ChangePassword.php');
            await expect(this.page.getByRole('link', { name: 'Change Password' })).toBeEnabled();
            await expect(this.page.getByRole('link', { name: 'Logout' })).toBeVisible();
            await expect(this.page.getByRole('link', { name: 'Logout' })).toHaveAttribute('href', 'Logout.php');
            await expect(this.page.getByRole('link', { name: 'Logout' })).toBeEnabled();
        
            //TC_SRH_005
            await this.page.getByRole('link', { name: 'Search Hotel' }).click(); 
            await expect(this.page).toHaveURL('https://adactinhotelapp.com/SearchHotel.php');
            
            //TC_SRH_007
            await this.page.getByRole('link', { name: 'Booked Itinerary' }).click(); 
            await expect(this.page).toHaveURL('https://adactinhotelapp.com/BookedItinerary.php');
        
            //TC_SRH_009
            await this.page.getByRole('link', { name: 'Search Hotel' }).click(); 
            await expect(this.page).toHaveURL('https://adactinhotelapp.com/SearchHotel.php');
            await this.page.getByRole('link', { name: 'Change Password' }).click(); 
            await expect(this.page).toHaveURL('https://adactinhotelapp.com/ChangePassword.php');
            await this.page.getByRole('link', { name: 'Search Hotel' }).click(); 
            await expect(this.page).toHaveURL('https://adactinhotelapp.com/SearchHotel.php');

        
    }

    async validateframeElements() {
        const row4 = this.page.locator('table tr').nth(3);
        const row5 = this.page.locator('table tr').nth(4);
        const row6 = this.page.locator('table tr').nth(5);
        const row7 = this.page.locator('table tr').nth(6);
        const row8 = this.page.locator('table tr').nth(7);
        const row9 = this.page.locator('table tr').nth(8);
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
    }

}
