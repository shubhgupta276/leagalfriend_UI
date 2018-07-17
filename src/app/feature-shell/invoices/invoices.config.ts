export let InvoiceTemplate = 'invoice/template';
export let Invoice = 'invoice';
export let getInvoice = 'invoice/user';
export let invoiceCancel = 'invoice/cancel';
export const invoiceTableConfig = [
    { uniqueId: 'id', displayName: 'Id', sortable: true, dropDownFilter: false, display: false },
    { uniqueId: 'institutionName', displayName: 'Institution', sortable: false, dropDownFilter: true, display: true },
    { uniqueId: 'description', displayName: 'Description', sortable: false, dropDownFilter: false, display: true },
    { uniqueId: 'billingDate', displayName: 'Billing Date', sortable: false, dropDownFilter: false, display: true },
    { uniqueId: 'amount', displayName: 'Amount', sortable: false, dropDownFilter: false, display: true },    
    { uniqueId: 'status', displayName: 'Status', sortable: false, dropDownFilter: false, display: true },
    { uniqueId: 'billingIds', displayName: 'billingIds', sortable: true, dropDownFilter: false, display: false },
  ];
  