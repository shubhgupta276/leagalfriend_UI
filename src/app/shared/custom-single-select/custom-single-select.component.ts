import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-custom-single-select',
  templateUrl: './custom-single-select.component.html',
  styleUrls: ['./custom-single-select.component.css']
})
export class CustomSingleSelectComponent implements OnInit {
  @Input() data: any[];
  @Input() config: any;
  @Output() valueChanged: EventEmitter<any> = new EventEmitter();
  showDropdown: boolean = false;
  displayField: any;
  selectedItem: any;
  constructor() { }

  ngOnInit() {
    this.selectedItem = (this.config.defaultText) ? this.config.defaultText : "";
  }

  selectClick() {
    this.showDropdown = !this.showDropdown;
  }

  selectItem(data) {
    this.showDropdown = !this.showDropdown;
    this.selectedItem = data[this.config['displayKey']];
    this.valueChanged.emit(data);
  }

  defaultSelect(data){
    this.selectedItem=data;
    this.valueChanged.emit(undefined);
  }
  onClickedOutside(e: Event) {
    this.showDropdown = false;
  }
}
