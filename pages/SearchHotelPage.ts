import { expect, Locator, Page } from '@playwright/test';
import { DateUtils } from '../utils/DateUtils';

export class SearchHotelPage {

    private page: Page;

    location: Locator;

    hotel: Locator;

    roomType: Locator;

    rooms: Locator;

    checkIn: Locator;

    checkOut: Locator;

    adults: Locator;

    children: Locator;

    searchBtn: Locator;

    readonly errorMessage: Locator;

    constructor(page: Page){
        this.page = page;
        this.location = this.page.locator('#location');
        this.hotel = this.page.locator('#hotels');
        this.roomType = this.page.locator('#room_type');
        this.rooms = this.page.locator('#room_nos');
        this.checkIn = this.page.locator('#datepick_in');
        this.checkOut = this.page.locator('#datepick_out');
        this.adults = this.page.locator('#adult_room');
        this.children = this.page.locator('#child_room');
        this.searchBtn = this.page.locator('#Submit');
        this.errorMessage = this.page.locator('#location_span');
    }

    

    async validateFormElements() {
        await expect(this.page.locator('td:has-text("Search Hotel")').isVisible).toBeTruthy();

        //TC_SRH_014 Verify that the Location combo box is visible and enabled. Verify that the combo box contains the expected list of locations.
        await expect(this.page.getByLabel('Location').isVisible()).toBeTruthy();
        const locationOptions = this.page.getByLabel('Location').locator('option');
        const expectedLocations = ['- Select Location -', 'Sydney', 'Melbourne', 'Brisbane', 'Adelaide', 'London', 'New York', 'Los Angeles', 'Paris'];
        await expect(this.page.locator('#location').isChecked).toBeTruthy();

        //TC_SRH_015 Verify that the Hotels combo box is visible and enabled. Verify that the combo box contains the expected list of hotels based on the selected location.
        await expect(this.page.getByLabel('Hotels').isVisible()).toBeTruthy();
        const hotelsOptions = this.page.getByLabel('Hotels').locator('option');
        const expectedHotels = ['- Select Hotel -', 'Hotel Creek', 'Hotel Sunshine', 'Hotel Hervey', 'Hotel Cornice'];
        await expect(this.page.locator('#hotels').isChecked).toBeTruthy();

        //TC_SRH_016 Verify that the Room Type combo box is visible and enabled. Verify that the combo box contains the expected list of room types based on the selected hotel.
        await expect(this.page.getByLabel('Room Type').isVisible()).toBeTruthy();
        const roomTypeOptions = this.page.getByLabel('Room Type').locator('option');
        const expectedRoomTypes = ['- Select Room Type -', 'Standard', 'Double','Deluxe', 'Super Deluxe'];
        await expect(this.page.locator('#room_type').isChecked).toBeTruthy();

        //TC_SRH_017 Verify that the Number of Rooms combo box is visible and enabled. Verify that the combo box contains the expected list of options (1, 2, 3, 4, 5, 6, 7, 8, 9, 10).
        await expect(this.page.getByLabel('Number of Rooms').isVisible()).toBeTruthy();
        const numberOfRoomsOptions = this.page.getByLabel('Number of Rooms').locator('option');
        const expectedNumberOfRooms = ['- Select Number of Rooms -', '1 - One', '2 - Two', '3 - Three', '4 - Four', '5 - Five', '6 - Six', '7 - Seven', '8 - Eight', '9 - Nine', '10 - Ten'];
        await expect(this.page.locator('#room_nos').isChecked).toBeTruthy();

        //TC_SRH_018 Verify that the Check-In Date field is visible and enabled. Verify that the field accepts valid date input and displays the correct date format.
        await expect(this.page.getByLabel('Check-In Date').isVisible()).toBeTruthy();
        const today = new Date();

        const formattedCheckInDate = DateUtils.formatDate(today);
        const inValue = await this.page.locator('#datepick_in.date_pick').getAttribute('value');
        await expect(this.page.locator('#datepick_in.date_pick')).toHaveValue(formattedCheckInDate);

        //TC_SRH_019 Verify that the Check-Out Date field is visible and enabled. Verify that the field has default value.
        await expect(this.page.getByLabel('Check-Out Date').isVisible()).toBeTruthy();
        const tomorrow = new Date(today);
        tomorrow.setDate(today.getDate() + 1);
        const formattedCheckOutDate = DateUtils.formatDate(tomorrow);
        const outValue = await this.page.locator('#datepick_out.date_pick').getAttribute('value');
        await expect(this.page.locator('#datepick_out.date_pick')).toHaveValue(formattedCheckOutDate);

        //TC_SRH_020 Verify Adults per Room combo box is visible and enabled. Verify that the combo box contains the expected list of options (1, 2, 3, 4).
        await expect(this.page.getByLabel('Adults per Room').isVisible()).toBeTruthy();
        const adultsPerRoomsOptions = this.page.getByLabel('Adults per Room').locator('option');
        const expectedAdults = ['- Select Adults per Room -', '1 - One', '2 - Two', '3 - Three', '4 - Four'];
        await expect(this.page.locator('#adult_room.search_combobox option:checked')).toHaveText('1 - One');
        

        //TC_SRH_021 Verify Children per Room combo box is visible and enabled. Verify that the combo box contains the expected list of options (0, 1, 2, 3, 4).
        await expect(this.page.getByLabel('Children per Room').isVisible()).toBeTruthy();
        const childrenPerRoomsOptions = this.page.getByLabel('Children per Room').locator('option');
        const expectedChildren = ['0 - None', '1 - One', '2 - Two', '3 - Three', '4 - Four'];
        await expect(this.page.locator('#child_room.search_combobox option:checked')).toHaveText('0 - None');

        //TC_SRH_022 Verify Submit and Reset buttons are enabled
        await expect(this.page.locator('#Submit').isEnabled()).toBeTruthy();
        await expect(this.page.locator('#Reset').isEnabled()).toBeTruthy();

        await expect(this.page.locator('#Submit').isEnabled()).toBeTruthy();
        await expect(this.page.locator('#Reset').isEnabled()).toBeTruthy();

        }

        async searchHotel(loc?: string, hotl?: string, roomTyp?: string, room?: string, chckIn?: string, chckOut?: string, adult?: string, childrn?: string) {
            let param = (loc || 'Sydney');
            console.log (param);
            await this.page.locator('select#location.search_combobox').selectOption(param);
            
            if(hotl !== undefined) {
                await this.hotel.selectOption(hotl);
            }
            if(roomTyp !== undefined) {
                await this.roomType.selectOption(roomTyp);
            }
          
            if(room !== undefined) {
                await this.rooms.selectOption(room);
            }
           
            if(chckIn !== undefined) {
                await this.checkIn.fill(chckIn);
            }
            if(chckOut !== undefined) {
                console.log(chckOut);
                await this.checkOut.fill(chckOut);
            }
            
            if(adult !== undefined) {
                await this.adults.selectOption(adult);
            }
           
            if(childrn !== undefined) {
                await this.children.selectOption(childrn);
            }
            
            await this.searchBtn.click();

    }

    async validateSuccessfulSearch() {
            await expect(this.page).toHaveURL('https://adactinhotelapp.com/SelectHotel.php');
    }

    async verifyErrorMessage(expectedMessage: string) {

        await expect(this.errorMessage)
            .toHaveText(expectedMessage);
    }

    async goToSearchHotelPage() {
        await this.page.getByRole('link', { name: 'Search Hotel' }).click();
        await expect(this.page).toHaveURL('https://adactinhotelapp.com/SearchHotel.php');
    }

}