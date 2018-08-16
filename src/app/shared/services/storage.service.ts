export class StorageService {
    getValue(key: string): string {
        return localStorage.getItem(key);
    }
    getUserId(): string {
        return this.getValue('client_id');
    }
    getUserEmail(): string {
        return this.getValue('user_id');
    }
    setValue(key: string, value: string) {
        localStorage.setItem(key, value);
    }

    setBranchData(data) {
        localStorage.setItem('branchData', JSON.stringify(data));
    }

    getBranchData() {
        return JSON.parse(this.getValue('branchData'));
    }

    getUserDetails() {
        return JSON.parse(this.getValue('userDetails'));
    }

    getPermissionLevel() {
        return localStorage.getItem('permission_level');
    }

    clearInvoiceData() {
        this.setValue('invoiceOtherDetails', null);
        this.setValue('invoiceDetails', null);
        this.setValue('invoiceTemplateInfo', null);
    }
}
