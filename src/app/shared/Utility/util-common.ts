export interface KeyValue {
    id: number;
    name: string;
}

export const UserRoles: KeyValue[] = [{ id: 1, name: 'Manager' }, { id: 2, name: 'Employee' }, { id: 3, name: 'Client' }];
export const UserStatus: KeyValue[] = [{ id: 1, name: 'Active' }, { id: 2, name: 'Suspended' }, { id: 3, name: 'Deactive' }]