export const masterTemplateConfig = [
    { uniqueId: 'fileName', displayName: 'File Name', sortable: true, dropDownFilter: false, display: true },
    { uniqueId: 'lastUpdated', displayName: 'Last Updated', sortable: true, dropDownFilter: false, display: true },
    { uniqueId: 'lastUpdatedBy', displayName: 'Last Updated By', sortable: true, dropDownFilter: false, display: true },
    { uniqueId: 'id', displayName: 'Id', sortable: true, dropDownFilter: false, display: false },
    ];
export class MasterTemplateDataConfig {
filename: string;
lastUpdated: string;
updatedBy: string;
}
