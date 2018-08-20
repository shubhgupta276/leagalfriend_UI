import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-custom-single-select',
  templateUrl: './custom-single-select.component.html',
  styleUrls: ['./custom-single-select.component.css']
})
export class CustomSingleSelectComponent implements OnInit {
  @Input() data: any[];
  @Input() config: any;
  @Input() selectedItem: any;
  @Output() valueChanged: EventEmitter<any> = new EventEmitter();
  showDropdown: boolean = false;
  displayField: any;
  constructor() { }

  ngOnInit() {

    if (this.config.showFirstSelected && this.data.length > 0) {

      if (this.config.showFirstSelectedKey) {

        if (this.config.showFirstSelectedValue) {
          this.selectedItem = this.data.filter(x => x[this.config.showFirstSelectedKey]
            === this.config.showFirstSelectedValue[this.config.showFirstSelectedKey])[0];

          this.selectItem(this.selectedItem);
        } else {
          this.selectItem(this.data[0]);
        }
      } else {
        this.selectItem(this.data[0]);
      }
      this.showDropdown = false;
    } else {
      this.selectedItem = (this.config.defaultText) ? this.config.defaultText : '';
    }
  }

  selectClick() {
    this.showDropdown = !this.showDropdown;
  }

  selectItem(data) {
    this.showDropdown = !this.showDropdown;
    this.selectedItem = data[this.config['displayKey']];
    this.valueChanged.emit(data);
  }

  defaultSelect(data) {
    this.selectedItem = data;
    this.valueChanged.emit(undefined);
  }

  onClickedOutside(e: Event) {
    this.showDropdown = false;
  }
}
