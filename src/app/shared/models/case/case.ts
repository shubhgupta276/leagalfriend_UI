import { KeyValue } from '../../Utility/util-common';

export class Case {
    IsChecked: boolean;
    Id: number;
    CaseId: string;
    Compliance: boolean;
    CourtCaseId: number;
    Resource: KeyValue;
    Manager: KeyValue;
    Court: KeyValue;
    State: KeyValue;
    ParentCase: KeyValue;
    NextHearingDate: string;
    CustomerName: KeyValue;
    Remark: string;
    Branch: KeyValue;
    FillingDate: string;
    CaseStage: KeyValue;
    Employee: KeyValue;
    CourtePlace: KeyValue;
    OppLawyer: string;
    ChaildCase: string;
    LastHearingDate: string;
    CompletionDate: string;
}

export const CasesRunning: Case[] = [
    // {
    //     Id: 1, CaseId: 'I/DRT/3', CourtCaseId: 234, Resource: { id: 1, name: 'Criminal Case' }, Manager: { id: null, name: null },
    //     Court: { id: null, name: null }, State: { id: null, name: null }, ParentCase: { id: null, name: null },
    //     NextHearingDate: '22-Dec-2017', CustomerName: { id: 1, name: 'Pam' }, Remark: '', Branch: { id: 1, name: 'Delhi' },
    //     FillingDate: '', CaseStage: { id: 1, name: 'Bail' }, Employee: { id: 1, name: 'Manjul Sood' },
    //     CourtePlace: { id: 1, name: 'Delhi' }, OppLawyer: '', ChaildCase: '', LastHearingDate: '', CompletionDate: '', Compliance: false

    // },

    // {
    //     Id: 2, CaseId: 'I/LKAD/4', CourtCaseId: null, Resource: { id: 1, name: 'Criminal Case' }, Manager: { id: null, name: null },
    //     Court: { id: null, name: null }, State: { id: null, name: null }, ParentCase: { id: null, name: null },
    //     NextHearingDate: '10-Feb-2018', CustomerName: { id: 1, name: 'Pam' }, Remark: '', Branch: { id: 1, name: 'Delhi' },
    //     FillingDate: '', CaseStage: { id: 1, name: 'Bail' }, Employee: { id: 1, name: 'Manjul Sood' },
    //     CourtePlace: { id: 1, name: 'Delhi' }, OppLawyer: '', ChaildCase: '', LastHearingDate: '', CompletionDate: '', Compliance: false
    // },
    // {
    //     Id: 3, CaseId: 'I/LKAD/5', CourtCaseId: null, Resource: { id: 2, name: 'RODA' }, Manager: { id: null, name: null },
    //     Court: { id: null, name: null }, State: { id: 4, name: 'Delhi' }, ParentCase: { id: null, name: null },
    //     NextHearingDate: '10-Feb-2018', CustomerName: { id: 2, name: 'Kelvin' }, Remark: 'test remark', Branch: { id: 1, name: 'Delhi' },
    //     FillingDate: '', CaseStage: { id: 2, name: 'Auction' }, Employee: { id: 2, name: 'Kelly' }, CourtePlace: { id: 1, name: 'Delhi' },
    //     OppLawyer: '', ChaildCase: '', LastHearingDate: '', CompletionDate: '', Compliance: true
    // },
    // {
    //     Id: 4, CaseId: 'I/LKAD/6', CourtCaseId: null, Resource: { id: 2, name: 'RODA' }, Manager: { id: null, name: null },
    //     Court: { id: null, name: null }, State: { id: 4, name: 'Delhi' }, ParentCase: { id: null, name: null },
    //     NextHearingDate: '10-Feb-2018', CustomerName: { id: 2, name: 'Kelvin' }, Remark: '', Branch: { id: 1, name: 'Delhi' },
    //     FillingDate: '', CaseStage: { id: 2, name: 'Auction' }, Employee: { id: 2, name: 'Kelly' }, CourtePlace: { id: 1, name: 'Delhi' },
    //     OppLawyer: '', ChaildCase: '', LastHearingDate: '', CompletionDate: '', Compliance: false
    // },
    // {
    //     Id: 5, CaseId: 'I/LKAD/7', CourtCaseId: null, Resource: { id: 3, name: 'RRC' }, Manager: { id: null, name: null },
    //     Court: { id: null, name: null }, State: { id: null, name: null }, ParentCase: { id: null, name: null },
    //     NextHearingDate: '10-Feb-2018', CustomerName: { id: 3, name: 'Govind' }, Remark: '', Branch: { id: 2, name: 'Gujrat' },
    //     FillingDate: '', CaseStage: { id: 3, name: 'Award' }, Employee: { id: 3, name: 'Manoj' }, CourtePlace: { id: 1, name: 'Delhi' },
    //     OppLawyer: '', ChaildCase: '', LastHearingDate: '', CompletionDate: '', Compliance: false
    // }

];
export const CasesCompleted: Case[] = [
    {
        IsChecked: false, Id: 6, CaseId: 'I/DRT/4', CourtCaseId: null, Resource: { id: 3, name: 'RRC' }, Manager: { id: null, name: null },
        Court: { id: null, name: null }, State: { id: null, name: null }, ParentCase: { id: null, name: null },
        NextHearingDate: '10-Feb-2018', CustomerName: { id: 3, name: 'Govind' }, Remark: '', Branch: { id: 1, name: 'Delhi' },
        FillingDate: '10-Feb-2018', CaseStage: { id: 3, name: 'Award' }, Employee: { id: 3, name: 'Manoj' }, CourtePlace: { id: 1, name: 'Delhi' },
        OppLawyer: '', ChaildCase: '', LastHearingDate: '', CompletionDate: '10-Feb-2018', Compliance: false
    },
    {
        IsChecked: false, Id: 7, CaseId: 'I/DRT/5', CourtCaseId: null, Resource: { id: 3, name: 'RRC' }, Manager: { id: null, name: null },
        Court: { id: null, name: null }, State: { id: null, name: null }, ParentCase: { id: null, name: null },
        NextHearingDate: '10-Feb-2018', CustomerName: { id: 3, name: 'Govind' }, Remark: '', Branch: { id: 2, name: 'Nagpur' },
        FillingDate: '10-Feb-2018', CaseStage: { id: 3, name: 'Award' }, Employee: { id: 3, name: 'Manoj' }, CourtePlace: { id: 2, name: 'Nagpur' },
        OppLawyer: '', ChaildCase: '', LastHearingDate: '', CompletionDate: '10-Feb-2018', Compliance: false
    },
    {
        IsChecked: false, Id: 8, CaseId: 'I/DRT/6', CourtCaseId: null, Resource: { id: 3, name: 'RRC' }, Manager: { id: null, name: null },
        Court: { id: null, name: null }, State: { id: null, name: null }, ParentCase: { id: null, name: null },
        NextHearingDate: '10-Feb-2018', CustomerName: { id: 3, name: 'Govind' }, Remark: '', Branch: { id: 2, name: 'Nagpur' },
        FillingDate: '', CaseStage: { id: 3, name: 'Award' }, Employee: { id: 3, name: 'Manoj' }, CourtePlace: { id: 2, name: 'Nagpur' },
        OppLawyer: '', ChaildCase: '', LastHearingDate: '', CompletionDate: '', Compliance: false
    },
    {
        IsChecked: false, Id: 9, CaseId: 'I/DRT/7', CourtCaseId: null, Resource: { id: 3, name: 'RRC' }, Manager: { id: null, name: null },
        Court: { id: null, name: null }, State: { id: null, name: null }, ParentCase: { id: null, name: null },
        NextHearingDate: '10-Feb-2018', CustomerName: { id: 3, name: 'Govind' }, Remark: '', Branch: { id: 3, name: 'Pune' },
        FillingDate: '', CaseStage: { id: 3, name: 'Award' }, Employee: { id: 3, name: 'Manoj' }, CourtePlace: { id: 3, name: 'Pune' },
        OppLawyer: '', ChaildCase: '', LastHearingDate: '', CompletionDate: '', Compliance: false
    },
    {
        IsChecked: false, Id: 10, CaseId: 'I/DRT/8', CourtCaseId: null, Resource: { id: 3, name: 'RRC' }, Manager: { id: null, name: null },
        Court: { id: null, name: null }, State: { id: null, name: null }, ParentCase: { id: null, name: null },
        NextHearingDate: '10-Feb-2018', CustomerName: { id: 3, name: 'Govind' }, Remark: 'test', Branch: { id: 3, name: 'Pune' },
        FillingDate: '', CaseStage: { id: 3, name: 'Award' }, Employee: { id: 3, name: 'Manoj' }, CourtePlace: { id: 3, name: 'Pune' },
        OppLawyer: '', ChaildCase: '', LastHearingDate: '', CompletionDate: '', Compliance: false
    }
];
