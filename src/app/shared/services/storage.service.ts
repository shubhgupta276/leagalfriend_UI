export class StorageService {
    getValue(key: string): string {
        return localStorage.getItem(key);
    }
    getUserId(): string {
        return this.getValue("client_id");
    }
    getUserEmail(): string {
        return this.getValue("user_id");
    }
    setValue(key: string, value: string) {
        localStorage.setItem(key, value);
    }
}