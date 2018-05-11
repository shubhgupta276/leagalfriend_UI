export interface KeyValue {
    id: number;
    name: string;

}

export const UserRoles: KeyValue[] = [{ id: 1, name: 'Lawyer' }, { id: 2, name: 'Lawyer Firm' }];
export const UserStatus: KeyValue[] = [{ id: 1, name: 'Active' }, { id: 2, name: 'Suspended' }, { id: 3, name: 'Deactive' }];

export const CaseResource: KeyValue[] = [{ id: 1, name: 'Criminal Case' }, { id: 2, name: 'RODA' }, { id: 3, name: 'RRC' }];
//export const CaseManager: KeyValue[] = [{ id: 1, name: 'Neha Arora' }, { id: 2, name: 'Amrita Jaiswal' }, { id: 3, name: 'Test' }];
export const CaseCourt: KeyValue[] = [{ id: 1, name: '10th Joint' }, { id: 2, name: 'Gaur' }, { id: 3, name: 'Test' }];
export const CaseState: KeyValue[] = [{ id: 1, name: 'Goa' }, { id: 2, name: 'Gujrat' }, { id: 3, name: 'Haryana' },
{ id: 4, name: 'Delhi' }];
export const ParentCase: KeyValue[] = [{ id: 1, name: 'RODA1' }, { id: 2, name: 'RODA2' }, { id: 3, name: 'RODA3' }];
export const CaseCustomerName: KeyValue[] = [{ id: 1, name: 'Pam' }, { id: 2, name: 'Kelvin' }, { id: 3, name: 'Govind' }];
//export const CaseBranch: KeyValue[] = [{ id: 1, name: 'Delhi' }, { id: 2, name: 'Nagpur' }, { id: 3, name: 'Pune' }];
//export const CaseStage: KeyValue[] = [{ id: 1, name: 'Bail' }, { id: 2, name: 'Auction' }, { id: 3, name: 'Award' }];
//export const CaseEmployee: KeyValue[] = [{ id: 1, name: 'Manjul Sood' }, { id: 2, name: 'Kelly' }, { id: 3, name: 'Manoj' }];
export const CaseCourtPlace: KeyValue[] = [{ id: 1, name: 'Delhi' }, { id: 2, name: 'Jaipur' }, { id: 3, name: 'Chennai' }];
export const ListBillingBank: KeyValue[] = [{ id: 1, name: 'DCB BANK LTD.' }, { id: 2, name: 'HDFC BANK Ltd.' },
{ id: 3, name: 'RBS BANK' }];
export const ListBillingStage: KeyValue[] = [{ id: 1, name: 'ARGUMENTS' }, { id: 2, name: 'APPLIED FOR VEHICLE CUSTODY' },
{ id: 3, name: 'CASE FILED' }, { id: 4, name: '1ST NOTICE BY ARBITRATOR' }];
export const ListBillingRecourse: KeyValue[] = [{ id: 1, name: 'RODA' }, { id: 2, name: 'CRI_CASE' }, { id: 3, name: 'SEC_25C' },
{ id: 4, name: 'SEC9 RO' }, { id: 5, name: 'ARB' }];
export const ListBranch: KeyValue[] = [{ id: 1, name: 'Delhi' }, { id: 2, name: 'Mumbai' }];
