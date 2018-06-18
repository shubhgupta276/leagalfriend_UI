export let addBillingUrl = "/add/billing";
export let getBillingUrl = "/billing";
export let deleteBillingUrl = "/billing";
export let updateBillingUrl = "/billing";


export const billingTableConfig = [
    { uniqueId: 'id', displayName: 'Id', sortable: true, dropDownFilter: false, display: false },
    { uniqueId: 'institutionId', displayName: 'institutionId', sortable: true, dropDownFilter: false, display: false },
    { uniqueId: 'institutionName', displayName: 'Institution', sortable: true, dropDownFilter: true, display: true },
    { uniqueId: 'amount', displayName: 'Amount', sortable: false, dropDownFilter: false, display: true },
    { uniqueId: 'recourseName', displayName: 'Recourse', sortable: true, dropDownFilter: false, display: true },
    { uniqueId: 'recourseId', displayName: 'recourseId', sortable: false, dropDownFilter: false, display: false },
    { uniqueId: 'stageId', displayName: 'stageId', sortable: true, dropDownFilter: false, display: false },
    { uniqueId: 'stageName', displayName: 'Stage', sortable: false, dropDownFilter: false, display: true },
    { uniqueId: 'userId', displayName: 'caseId', sortable: false, dropDownFilter: false, display: true },
    { uniqueId: 'caseId', displayName: 'login', sortable: false, dropDownFilter: false, display: false },
    { uniqueId: 'billingDate', displayName: 'billingDate', sortable: false, dropDownFilter: false, display: true },
  ];