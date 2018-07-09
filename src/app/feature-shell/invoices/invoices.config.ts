export let InvoiceTemplate = 'invoice/template';
export let Invoice = 'invoice';
export let getInvoice = 'invoice/user';
export const invoiceTableConfig = [
    { uniqueId: 'id', displayName: 'Id', sortable: true, dropDownFilter: false, display: false },
    { uniqueId: 'billingIds', displayName: 'billingIds', sortable: true, dropDownFilter: false, display: false },
    { uniqueId: 'billTo', displayName: 'Bill To', sortable: false, dropDownFilter: false, display: true },
    { uniqueId: 'amount', displayName: 'Amount', sortable: false, dropDownFilter: false, display: true },
    { uniqueId: 'description', displayName: 'Description', sortable: false, dropDownFilter: false, display: true },
  ];
  