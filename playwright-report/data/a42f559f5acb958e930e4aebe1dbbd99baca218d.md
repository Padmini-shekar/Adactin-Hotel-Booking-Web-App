# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: EndtoEndTests.spec.ts >> End-to-End Test: Book a Hotel
- Location: tests\EndtoEndTests.spec.ts:29:5

# Error details

```
Error: locator.click: Test ended.
Call log:
  - waiting for getByRole('link', { name: 'Search Hotel' })

```

# Test source

```ts
  56  |         const expectedHotels = ['- Select Hotel -', 'Hotel Creek', 'Hotel Sunshine', 'Hotel Hervey', 'Hotel Cornice'];
  57  |         await expect(this.page.locator('#hotels').isChecked).toBeTruthy();
  58  | 
  59  |         //TC_SRH_016 Verify that the Room Type combo box is visible and enabled. Verify that the combo box contains the expected list of room types based on the selected hotel.
  60  |         await expect(this.page.getByLabel('Room Type').isVisible()).toBeTruthy();
  61  |         const roomTypeOptions = this.page.getByLabel('Room Type').locator('option');
  62  |         const expectedRoomTypes = ['- Select Room Type -', 'Standard', 'Double','Deluxe', 'Super Deluxe'];
  63  |         await expect(this.page.locator('#room_type').isChecked).toBeTruthy();
  64  | 
  65  |         //TC_SRH_017 Verify that the Number of Rooms combo box is visible and enabled. Verify that the combo box contains the expected list of options (1, 2, 3, 4, 5, 6, 7, 8, 9, 10).
  66  |         await expect(this.page.getByLabel('Number of Rooms').isVisible()).toBeTruthy();
  67  |         const numberOfRoomsOptions = this.page.getByLabel('Number of Rooms').locator('option');
  68  |         const expectedNumberOfRooms = ['- Select Number of Rooms -', '1 - One', '2 - Two', '3 - Three', '4 - Four', '5 - Five', '6 - Six', '7 - Seven', '8 - Eight', '9 - Nine', '10 - Ten'];
  69  |         await expect(this.page.locator('#room_nos').isChecked).toBeTruthy();
  70  | 
  71  |         //TC_SRH_018 Verify that the Check-In Date field is visible and enabled. Verify that the field accepts valid date input and displays the correct date format.
  72  |         await expect(this.page.getByLabel('Check-In Date').isVisible()).toBeTruthy();
  73  |         const today = new Date();
  74  | 
  75  |         const formattedCheckInDate = DateUtils.formatDate(today);
  76  |         const inValue = await this.page.locator('#datepick_in.date_pick').getAttribute('value');
  77  |         await expect(this.page.locator('#datepick_in.date_pick')).toHaveValue(formattedCheckInDate);
  78  | 
  79  |         //TC_SRH_019 Verify that the Check-Out Date field is visible and enabled. Verify that the field has default value.
  80  |         await expect(this.page.getByLabel('Check-Out Date').isVisible()).toBeTruthy();
  81  |         const tomorrow = new Date(today);
  82  |         tomorrow.setDate(today.getDate() + 1);
  83  |         const formattedCheckOutDate = DateUtils.formatDate(tomorrow);
  84  |         const outValue = await this.page.locator('#datepick_out.date_pick').getAttribute('value');
  85  |         await expect(this.page.locator('#datepick_out.date_pick')).toHaveValue(formattedCheckOutDate);
  86  | 
  87  |         //TC_SRH_020 Verify Adults per Room combo box is visible and enabled. Verify that the combo box contains the expected list of options (1, 2, 3, 4).
  88  |         await expect(this.page.getByLabel('Adults per Room').isVisible()).toBeTruthy();
  89  |         const adultsPerRoomsOptions = this.page.getByLabel('Adults per Room').locator('option');
  90  |         const expectedAdults = ['- Select Adults per Room -', '1 - One', '2 - Two', '3 - Three', '4 - Four'];
  91  |         await expect(this.page.locator('#adult_room.search_combobox option:checked')).toHaveText('1 - One');
  92  |         
  93  | 
  94  |         //TC_SRH_021 Verify Children per Room combo box is visible and enabled. Verify that the combo box contains the expected list of options (0, 1, 2, 3, 4).
  95  |         await expect(this.page.getByLabel('Children per Room').isVisible()).toBeTruthy();
  96  |         const childrenPerRoomsOptions = this.page.getByLabel('Children per Room').locator('option');
  97  |         const expectedChildren = ['0 - None', '1 - One', '2 - Two', '3 - Three', '4 - Four'];
  98  |         await expect(this.page.locator('#child_room.search_combobox option:checked')).toHaveText('0 - None');
  99  | 
  100 |         //TC_SRH_022 Verify Submit and Reset buttons are enabled
  101 |         await expect(this.page.locator('#Submit').isEnabled()).toBeTruthy();
  102 |         await expect(this.page.locator('#Reset').isEnabled()).toBeTruthy();
  103 | 
  104 |         await expect(this.page.locator('#Submit').isEnabled()).toBeTruthy();
  105 |         await expect(this.page.locator('#Reset').isEnabled()).toBeTruthy();
  106 | 
  107 |         }
  108 | 
  109 |         async searchHotel(loc?: string, hotl?: string, roomTyp?: string, room?: string, chckIn?: string, chckOut?: string, adult?: string, childrn?: string) {
  110 |             let param = (loc || 'Sydney');
  111 |             console.log (param);
  112 |             await this.page.locator('select#location.search_combobox').selectOption(param);
  113 |             
  114 |             if(hotl !== undefined) {
  115 |                 await this.hotel.selectOption(hotl);
  116 |             }
  117 |             if(roomTyp !== undefined) {
  118 |                 await this.roomType.selectOption(roomTyp);
  119 |             }
  120 |           
  121 |             if(room !== undefined) {
  122 |                 await this.rooms.selectOption(room);
  123 |             }
  124 |            
  125 |             if(chckIn !== undefined) {
  126 |                 await this.checkIn.fill(chckIn);
  127 |             }
  128 |             if(chckOut !== undefined) {
  129 |                 console.log(chckOut);
  130 |                 await this.checkOut.fill(chckOut);
  131 |             }
  132 |             
  133 |             if(adult !== undefined) {
  134 |                 await this.adults.selectOption(adult);
  135 |             }
  136 |            
  137 |             if(childrn !== undefined) {
  138 |                 await this.children.selectOption(childrn);
  139 |             }
  140 |             
  141 |             await this.searchBtn.click();
  142 | 
  143 |     }
  144 | 
  145 |     async validateSuccessfulSearch() {
  146 |             await expect(this.page).toHaveURL('https://adactinhotelapp.com/SelectHotel.php');
  147 |     }
  148 | 
  149 |     async verifyErrorMessage(expectedMessage: string) {
  150 | 
  151 |         await expect(this.errorMessage)
  152 |             .toHaveText(expectedMessage);
  153 |     }
  154 | 
  155 |     async goToSearchHotelPage() {
> 156 |         await this.page.getByRole('link', { name: 'Search Hotel' }).click();
      |                                                                     ^ Error: locator.click: Test ended.
  157 |         await expect(this.page).toHaveURL('https://adactinhotelapp.com/SearchHotel.php');
  158 |     }
  159 | 
  160 | }
```