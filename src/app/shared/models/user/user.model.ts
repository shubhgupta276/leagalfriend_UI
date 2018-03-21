export class UserModel {
    id: number;
    firstName: string;
    lastName: string;
    organization: string;
    email: string;
    isClient: boolean;
    // login : {
    //     userLoginId : string,
    //     paswword : string
    // }
    clientId: number;
    mobileNumber: number;
    password: string;
    postcode: number;
    addressLine1: string;
    addressLine2: string;
    role: string;
    status: any = [];
    roles: any = [];
    address:any=[];
}
