export const addUser = 'usermanagement/adduser';
export const editUser = 'usermanagement/edituser';
export const listUsers = 'usermanagement/listusers';
export const listRoles = 'usermanagement/listroles';
export const listStatus = 'usermanagement/liststatus';
export const getUser = 'usermanagement/user';

export const userTableConfig = [
    { uniqueId: 'id', displayName: 'ID', sortable: true, dropDownFilter: false, display: false },
    { uniqueId: 'name', displayName: 'Name', sortable: true, dropDownFilter: false, display: true },
    { uniqueId: 'firstName', displayName: 'firstName', sortable: true, dropDownFilter: false, display: false },
    { uniqueId: 'lastName', displayName: 'lastName', sortable: true, dropDownFilter: false, display: false },
    { uniqueId: 'organization', displayName: 'Recourse Code', sortable: false, dropDownFilter: true, display: false },
    { uniqueId: 'address', displayName: 'address', sortable: true, dropDownFilter: false, display: false },
    { uniqueId: 'clientId', displayName: 'clientId', sortable: false, dropDownFilter: true, display: false },
    { uniqueId: 'daysLeftForRenew', displayName: 'daysLeftForRenew', sortable: true, dropDownFilter: false, display: false },
    { uniqueId: 'email', displayName: 'Email', sortable: false, dropDownFilter: false, display: true },
    { uniqueId: 'isClient', displayName: 'isClient', sortable: false, dropDownFilter: false, display: false },
    { uniqueId: 'login', displayName: 'login', sortable: false, dropDownFilter: false, display: false },
    { uniqueId: 'mobileNumber', displayName: 'Phone', sortable: false, dropDownFilter: false, display: true },
    { uniqueId: 'password', displayName: 'password', sortable: false, dropDownFilter: false, display: false },
    { uniqueId: 'roles', displayName: 'Role', sortable: false, dropDownFilter: true, display: true },
    { uniqueId: 'showSubscriptionFlash', displayName: 'showSubscriptionFlash', sortable: false, dropDownFilter: false, display: false },
    { uniqueId: 'status', displayName: 'Status', sortable: false, dropDownFilter: false, display: true },
    { uniqueId: 'subscriptionEndDate', displayName: 'subscriptionEndDate', sortable: false, dropDownFilter: false, display: false },
    { uniqueId: 'subscriptionEnded', displayName: 'subscriptionEnded', sortable: false, dropDownFilter: false, display: false },
    { uniqueId: 'subscriptionId', displayName: 'subscriptionId', sortable: false, dropDownFilter: false, display: false },
    // { uniqueId: 'userType', displayName: 'userType', sortable: false, dropDownFilter: false, display: false },
    { uniqueId: 'verified', displayName: 'verified', sortable: false, dropDownFilter: false, display: false },
    { uniqueId: 'customerType', displayName: 'Customer Type', sortable: false, dropDownFilter: false, display: true },
  ];
