export let addBillingUrl = '/add/billing';
export let getBillingUrl = '/billing';
export let deleteBillingUrl = '/billing';
export let updateBillingUrl = '/billing';


export const billingTableConfig = [
  { uniqueId: 'id', displayName: 'Id', sortable: true, dropDownFilter: false, display: false },
  { uniqueId: 'institutionId', displayName: 'institutionId', sortable: false, dropDownFilter: false, display: false },
  {
    uniqueId: 'institutionName', displayName: 'Institution', sortable: false, dropDownFilter: true, display: true,
    hideSelectFitlerText: true
  },
  { uniqueId: 'caeId', displayName: 'Case ID', sortable: false, dropDownFilter: false, display: true },
  { uniqueId: 'recourseName', displayName: 'Recourse', sortable: false, dropDownFilter: true, display: true },
  { uniqueId: 'recourseId', displayName: 'recourseId', sortable: false, dropDownFilter: false, display: false },
  { uniqueId: 'stageId', displayName: 'stageId', sortable: true, dropDownFilter: false, display: false },
  { uniqueId: 'stageName', displayName: 'Stage', sortable: false, dropDownFilter: true, display: true },
  { uniqueId: 'billingDate', displayName: 'Billing Date', sortable: false, dropDownFilter: false, display: true },
  { uniqueId: 'amount', displayName: 'Amount', sortable: false, dropDownFilter: false, display: true },
  { uniqueId: 'userId', displayName: 'User Id', sortable: false, dropDownFilter: false, display: false },
];
