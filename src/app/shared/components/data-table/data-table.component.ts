import { Component, OnInit, ViewChild, Input, EventEmitter, Output } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { FilterModel } from '../../models/data-table/filter.model';
import { ActionColumnModel } from '../../models/data-table/action-column.model';
import { SharedService } from '../../services/shared.service';
declare var $;

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css']
})
export class DataTableComponent implements OnInit {
  variable = "";
  filterArray: FilterModel[];
  dropdownData = {};
  // dropdownData = {
  //   'stageName' : {
  //     selected: 'yes'
  //   }
  // };
  columnFilter = [];
  columnSorting = [];
  columnNames = [];
  searchFilterValue = '';
  displayedColumns = [];
  dataSource: any = [];
  initialData: any = [];
  rowData: any;
  sortDate = false;
  sortDateReverse = false;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @Input() tableData: Array<any>;
  @Input() tableColumns: Array<any>;
  @Input() showRowSelect = false;
  @Input() hoverTableRow = false;
  @Input() actionColumnConfig: ActionColumnModel;
  @Input() showSearchFilter = true;
  @Input() moduleName = '';
  @Output() rowClick = new EventEmitter<any>();
  @Output() rowDoubleClick = new EventEmitter<any>();
  @Output() actionBtnClick = new EventEmitter<any>();
  @Output() selectedRows = new EventEmitter<any>();
  @Output() rowClickShowCalendar = new EventEmitter<any>();
  @Output() actionBtnChangePassword = new EventEmitter<any>();
  selection = new SelectionModel<Element>(true, []);
  showCalender = true;
  hoveredIndex: number;
  constructor(private _sharedService: SharedService) { }

  ngOnInit() {
    this.selection.clear();
    this.tableData = this.cleanIncomingData(this.tableData);
    this.renderDataTable(this.tableData, false);
    this.createDropdowns();
    this.displayColumn();
  }

  displayColumn() {
    this.displayedColumns = [];
    if (this.showRowSelect) {
      this.displayedColumns.push('select');
    }
    this.tableColumns.forEach(
      column => {
        if (column.display) {
          this.displayedColumns.push(column.uniqueId);
        }
      }
    );
    if (this.actionColumnConfig) {
      this.displayedColumns.push('action');
    }
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
    this.selectedRows.emit(this.selection.selected);
  }

  onRowSelect(row) {
    this.selection.toggle(row);
    this.selectedRows.emit(this.selection.selected);
  }

  uniqueValues(arr) {
    const unique = arr.filter(function (item, i, ar) { return ar.indexOf(item) === i; });
    return unique;
  }

  onRowClick(event, row) {
    this.rowClick.emit(row);
  }


  onCaseFilterClick(event, row) {
    $('#filterCaseModal').modal("show");
    this.rowClick.emit(row);
  }


  onRowDoubleClick(event, row) {
    this.rowDoubleClick.emit(row);
  }


  onActionBtnClick(event, row, type) {
    const data = { eventType: type, data: row };
    this.actionBtnClick.emit(data);
  }
  onShowCalendar(event, row) {
    this.rowClickShowCalendar.emit(row);
  }
  onMouseHover(event, row) {
    if ($('.datepicker-dropdown').length == 0) {
      $('.newHiringDate').datepicker();
      this.hoveredIndex = row;
    }
  }
  hideCalendar() {
    if ($('.datepicker-dropdown').length == 0)
      this.hoveredIndex = null;

  }
  onActionBtnClickForChangePasswordPopup(event, row) {
    const data = { eventType: event, data: row };
    this.actionBtnChangePassword.emit(data);

  }
  addColumnHeader() {
    this.tableColumns.forEach(
      column => {
        this.columnNames.push(column.name);
        this.columnSorting.push(column.sortable);
        this.columnFilter.push(column.dropDownFilter);
      });
  }



  createDropdowns() {
    if (this.tableColumns) {
      this.tableColumns.forEach(
        column => {
          if (column.dropDownFilter) {
            const singlePropertyArray = [];
            this.tableData.forEach(ele => {
              singlePropertyArray.push(ele[column.uniqueId]);
            });
            this.dropdownData[column.uniqueId] = {
              values: this.uniqueValues(singlePropertyArray),
              selected: '',
              data: column
            };
          }
        }
      );
    }
  }

  renderDataTable(tableData, keepFilter) {
    this.dataSource = new MatTableDataSource(tableData);
    this.initializeFilterArray(keepFilter);
    this.setFilterPredicate();
    this.dataSource.filter = JSON.stringify(this.filterArray);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  cleanIncomingData(data) {
    data.forEach(element => {
      for (const key in data) {
        if (data[key] === undefined) {
          data[key] = null;
        }
      }
    });
    return data;
  }

  setFilterPredicate() {
    this.dataSource.filterPredicate = (data: any, filtersJson: string) => {
      const globalSearchValue = this.searchFilterValue;
      const filters = JSON.parse(filtersJson);
      const /** @type {?} */ accumulator = function (currentTerm, key) { return currentTerm + data[key]; };
      const /** @type {?} */ dataStr = Object.keys(data).reduce(accumulator, '').toLowerCase();
      const /** @type {?} */ transformedFilter = globalSearchValue.trim().toLowerCase();
      const hasGlobalSearch = dataStr.indexOf(transformedFilter) !== -1;

      if (hasGlobalSearch) {
        const matchFilter = [];
        filters.forEach(filter => {
          let val = data[filter.columnId] === null ? '' : data[filter.columnId];
          val = val.toString();
          matchFilter.push(val.toLowerCase().includes(filter.value.toLowerCase()));
        });
        return matchFilter.every(Boolean);
      } else {
        return hasGlobalSearch;
      }
    };
  }

  initializeFilterArray(keepFilter) {
    if (!keepFilter) {
      this.filterArray = [];
      this.tableColumns.forEach(column => {
        const columnFilter = new FilterModel();
        columnFilter.columnId = column.uniqueId;
        columnFilter.value = '';
        this.filterArray.push(columnFilter);
      });
    }
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.searchFilterValue = filterValue;
    this.dataSource.filter = JSON.stringify(this.filterArray);
  }

  sortTable(searchValue, uniqueId) {
    this.filterArray.forEach(filter => {
      if (filter.columnId === uniqueId) {
        // filter.value = this.dropdownData[uniqueId].selected;
        filter.value = searchValue;
        if (this.dropdownData[uniqueId]) {
          this.dropdownData[uniqueId].selected = filter.value;
        }
      }
    });
    this.dataSource.filter = JSON.stringify(this.filterArray);
  }

  sortDateColumn() {
    const uniqueId = 'fromDate';
    this.sortDate = true;
    let dateColumn = [];
    if (this.sortDate && this.sortDateReverse) {
      this.tableData.forEach(element => {
        dateColumn.push(element[uniqueId]);
      });
      dateColumn = dateColumn.sort(function (a, b) {
        const x: any = new Date(b);
        const y: any = new Date(a);
        return x - y;
      });
      this.sortDateReverse = false;
    } else if (this.sortDate && !this.sortDateReverse) {
      this.tableData.forEach(element => {
        dateColumn.push(element[uniqueId]);
      });
      dateColumn = dateColumn.sort(function (a, b) {
        const x: any = new Date(b);
        const y: any = new Date(a);
        return y - x;
      });
      this.sortDateReverse = true;
    } else {
      // something here
    }
    const newData = this.tableData;
    const sortedRows = [];
    dateColumn.forEach(date => {
      newData.forEach(row => {
        if (row[uniqueId] === date) {
          sortedRows.push(row);
        }
      });
    });
    this.renderDataTable(sortedRows, false);
  }

  dateRangeFilter(startDate: any, endDate: any, columnId) {
    const sd = new Date(startDate);
    const ed = new Date(endDate);
    const filteredRows = this.tableData.filter(row => {
      const dateValue = new Date(row[columnId]);
      return (sd <= dateValue && dateValue <= ed);
    });
    this.renderDataTable(filteredRows, true);
    this.dataSource.paginator = this.paginator;
    this.dataSource.filter = JSON.stringify(this.filterArray);
  }

  resetFilters() {
    this.searchFilterValue = '';
    this.renderDataTable(this.tableData, false);
  }

  resetDateFilter() {
    this.renderDataTable(this.tableData, true);
  }
}
