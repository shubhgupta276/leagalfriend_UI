export let InvoiceTemplate = 'invoice/template';
export let addInstitutionalInvoice = 'invoice';
export let addIndividualInvoice = 'invoice/individual';
export let getInstitutionalInvoice = 'invoice/institutional';
export let getIndividualInvoice = 'invoice/individual';
export let invoiceCancel = 'invoice/cancel';
export const invoiceTableConfig = [
  { uniqueId: 'id', displayName: 'Id', sortable: true, dropDownFilter: false, display: false },
  { uniqueId: 'institutionName', displayName: 'Institution', sortable: false, dropDownFilter: true, display: true },
  { uniqueId: 'description', displayName: 'Description', sortable: false, dropDownFilter: false, display: true },
  { uniqueId: 'invoiceDate', displayName: 'Invoice Date', sortable: false, dropDownFilter: false, display: true },
  { uniqueId: 'amount', displayName: 'Amount', sortable: false, dropDownFilter: false, display: true },
  { uniqueId: 'status', displayName: 'Status', sortable: false, dropDownFilter: false, display: true },
  // { uniqueId: 'billingIds', displayName: 'billingIds', sortable: true, dropDownFilter: false, display: false },
];
