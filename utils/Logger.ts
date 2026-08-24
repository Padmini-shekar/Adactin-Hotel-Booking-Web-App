export class Logger {

    static info(message: string) {
        console.log(`[INFO] ${message}`);
    }

    static error(message: string) {
        console.error(`[ERROR] ${message}`);
    }

    static warning(message: string) {
        console.warn(`[WARNING] ${message}`);
    }

}