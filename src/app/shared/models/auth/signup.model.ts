export class SignUpModel {
    email: string;
    organization: string;
    firstName: string;
    lastName: string;
    isClient: number;
    address1: string;
    address2: string;
    postcode: number;
    mobileNumber: number;
    password: string;
    customerType: CustomerType;
    roles: any[];
    status: Status;
    login: LoginCredential;
    subscriptionId:number;
    clientId:number;
    address:Address
}

export class LoginCredential {
    userLoginId: string;
    password: string;
}
export class Roles {
    id: number
}
export class Address {
    address1: string;
    address2:string;
    city:string;
    state:string;
    zipCode:string
}
export class Status{
    statusId: number;
}
export class CustomerType{
    id: number;
}

