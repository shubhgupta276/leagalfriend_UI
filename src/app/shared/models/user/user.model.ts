export class UserModel {
    id: number;
    firstName: string;
    lastName: string;
    name: string;
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
    address: any = [];
    login = {};
    userType = {};
    subscriptionEnded: boolean;
    subscriptionEndDate: string;
    daysLeftForRenew: number;
    showSubscriptionFlash: boolean;
    subscriptionId: number;
    verified: boolean;
    branch: any = [];
    institution:  any= [];
}
