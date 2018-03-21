export class SignUpModel {
    email: string;
    organization: string;
    firstName: string;
    lastName: string;
    isClient: number;
    address1: string;
    address2: string;
    postcode: number;
    mobile: number;
    password: string;
    roles: any[];
    status: Status;
    login: LoginCredential;
}

export class LoginCredential {
    userLoginId: string;
    password: string;
}
export class Roles {
    id: number
}
export class Status{
    statusId: number;
}

