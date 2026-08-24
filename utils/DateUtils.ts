export class DateUtils {

    static getToday(): string {

        const today = new Date();

        return this.formatDate(today);

    }

    static getTomorrow(): string {

        const tomorrow = new Date();

        tomorrow.setDate(tomorrow.getDate() + 1);

        return this.formatDate(tomorrow);

    }

    static getNextWeek(): string {

        const nextWeek = new Date();

        nextWeek.setDate(nextWeek.getDate() + 7);

        return this.formatDate(nextWeek);

    }

    static getDaysBetweenDates(date1: Date, date2: Date): number {
        // 1 day = 24 hours * 60 minutes * 60 seconds * 1000 milliseconds
        const oneDayInMs = 24 * 60 * 60 * 1000;

        // Get absolute difference in milliseconds to prevent negative values
        const differenceInMs = Math.abs(date2.getTime() - date1.getTime());

        // Round down to get full completed days
        return Math.floor(differenceInMs / oneDayInMs);
    }

    static formatDate(date: Date): string {

        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();

        return `${day}/${month}/${year}`;

    }

}